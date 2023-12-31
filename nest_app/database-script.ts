import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: "./.env"});

interface ExtensionRow {
  id: number,
  code: string
}

interface MagicCardObject {
  name: string,
  manaCost: string,
  cmc: number,
  colors: string[],
  colorIdentity: string[],
  type: string,
  supertypes: string[],
  types: string[],
  rarity: string,
  set: string,
  setName: string,
  text: string,
  flavor: string,
  artist: string,
  number: string,
  power: string,
  toughness: string,
  layout: string,
  multiverseid: string,
  imageUrl: string,
  variations: string,
  rulings: any[],
  foreignNames: any[],
  printings: string[],
  originalText: string,
  originalType: string,
  legalities: any[],
  id: string,
}

async function createConnectionToDB(): Promise<mysql.Connection> {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    } as mysql.ConnectionOptions);

      console.log('Connected to the DB !');
      return connection;
} 

async function FillExtensionsTable(dbConnection: mysql.Connection): Promise<void> {
  try {
    const checkIfDataExistsQuery = `
      SELECT EXISTS (
        SELECT 1 FROM extensions
        WHERE code IN ('khm', 'afr', 'znr', 'eld')
      ) AS 'exists';
    `;

    const [rows] = await dbConnection.query<any>(checkIfDataExistsQuery);

    if (rows[0].exists === 1) {
      console.log('Data already exists in extensions table.');
      return;
    }

    const insertDataQuery = `
      INSERT INTO extensions (code, extensionName)
      VALUES ('khm', 'kaldheim'), ('afr', 'Adventures in the Forgotten Realms'), ('znr', 'Zendikar Rising'), ('eld', 'Throne of Eldraine')
    `;

    await dbConnection.query<mysql.ResultSetHeader>(insertDataQuery);
    console.log('Inserted into extensions table successfully !');

    } catch(err) {
      console.error(`Error during insertion or creation : ${err.message}`);
    }
} 

async function retrieveExtensionsCodesArray(dbConnection: mysql.Connection): Promise<string[]> {
  try {
    const selectAllExtensionsQuery = 'SELECT * FROM extensions';
    const results = await dbConnection.query(selectAllExtensionsQuery);

    console.log("Extensions retrieved successfully !");

    if(Array.isArray(results[0])) {
      return (results[0] as ExtensionRow[]).map(row => row.code);
    } else {
      throw new Error("Expected results[0] to be an array.");
    }
  } catch(err) {
    console.error(`Error during retireving extensions process : ${err}`);
    return []
  } 
}

async function fetchCards(pageCards: number, extensionCode: string, apiCardsCall: string, cardsList: MagicCardObject[]): Promise<MagicCardObject[]> {
  return new Promise(async (resolve, reject) => {
    const urlCards = apiCardsCall.replace("${extensionCode}", extensionCode);
    try {
      const response = await axios.get(urlCards + pageCards);
      const responseJson = response.data;
      const cardsData = responseJson["cards"];

      if(cardsData.length === 0) {
        console.log(`End of pagination and retrieving cards for ${extensionCode} extension`);
      } else {
        cardsList.push(...cardsData);
        await fetchCards(pageCards + 1, extensionCode, apiCardsCall, cardsList);
      }
      resolve(cardsList);
    } catch(err) {;
      console.error(`Error during filling the table : ${err}`)
      reject(err);
    }
  });
}

async function fillExtensionTable(dbConnection: mysql.Connection, extensionCardsList: MagicCardObject[]): Promise<void> {
  try {

    const insertSqlrequest = `
      INSERT INTO cards (name, manaCost, colorIdentity, type, rarity, extensionName, text, flavor, power, toughness, imageUrl)
      VALUES ?
    `;

    const cardsValuesForTable = extensionCardsList.map((card: MagicCardObject) => [
      card.name,
      card.manaCost,
      JSON.stringify(card.colorIdentity),
      card.type,
      card.rarity,
      card.setName,
      card.text,
      card.flavor,
      card.power,
      card.toughness,
      card.imageUrl,
    ]);

    await dbConnection.query<mysql.ResultSetHeader>(insertSqlrequest, [cardsValuesForTable]);
    console.log("Data inserted into table successfully !");
  } catch (err) {
    console.log(`Error during the insertion of the data : ${err}`);
  }
}

async function fetchCardsAndFillExtensionTable(dbConnection: mysql.Connection, extensionCode: string, apiCardsCall: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const cardsList: MagicCardObject[] = [];
      const extensionCardsList: MagicCardObject[] = await fetchCards(1, extensionCode, apiCardsCall, cardsList);
      if(extensionCardsList.length === 0) {
        console.log("Error during the fetching cards process !");
        reject();
        return;
      } 
      await fillExtensionTable(dbConnection, extensionCardsList);
      resolve()
    } catch(err) {
      console.error(`Error during the API call or the table creation : ${err}`);
      reject();
    }
  });
}

async function getCardsFromExtensionsAndFillNewTables(dbConnection: mysql.Connection, extensionsArray: string[]): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiSetCall: string = 'https://api.magicthegathering.io/v1/sets/'
      for(const extensionCode of extensionsArray) {
        const apiCardsCall = `https://api.magicthegathering.io/v1/cards?set=${extensionCode}&page=`
        await fetchCardsAndFillExtensionTable(dbConnection, extensionCode, apiCardsCall);
      }
      resolve()
    } catch(err) {
      console.error(`Error during the process of fetching cards and fill tables functions : ${err}`)
      reject(err)
    }
    
  });
}

async function createAndConnectToContainerDB(): Promise<void> {
    try {
      const dbConnection = await createConnectionToDB();
      console.log("Database connection established.");

      await dbConnection.query('TRUNCATE TABLE cards');
      console.log("Table cleared");
      
      await FillExtensionsTable(dbConnection);

      const extensionsArray: string[] = await retrieveExtensionsCodesArray(dbConnection);

      await getCardsFromExtensionsAndFillNewTables(dbConnection, extensionsArray);
      dbConnection.end();
  } catch(err) {
      console.error(`An error occurred: ${err.message}`);
  };
}

createAndConnectToContainerDB();