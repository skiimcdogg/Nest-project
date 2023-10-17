import mysql from 'mysql2/promise';
import axios from 'axios';

async function createConnectionToDB() {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'magic_extensions',
      port: 3306,
    });

      console.log('Connected to the DB !');
      return connection;
} 

async function createAndFillExtensionsTable(dbConnection) {
  try {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS extensions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          code VARCHAR(255) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `;

    await dbConnection.execute(createTableQuery);
    console.log('Table created successfully !');

    const insertDataQuery = `
      INSERT INTO extensions (code)
      VALUES ('khm'), ('afr'), ('znr'), ('eld')
    `;

    await dbConnection.execute(insertDataQuery);
    console.log('Inserted successfully !');

    } catch(err) {
      console.error(`Error during insertion or creation : ${err.message}`);
    }
} 

async function retrieveExtensionsCodesArray(dbConnection) {
  try {
    const selectAllExtensionsQuery = 'SELECT * FROM extensions';
    const results = await dbConnection.execute(selectAllExtensionsQuery);
    console.log("Extensions retrieved successfully !");
    const extensionsArray = await results[0].map((row) => row.code);
    return extensionsArray;
  } catch(err) {
    console.error(`Error during retireving extensions process : ${err}`);
  }
    
}

async function createExtensionTables(dbConnection, extensionCode, apiSetCall) {
    try {
      const response = await axios.get(apiSetCall + extensionCode)
      if(response.status === 200) {
        console.log("Api call done !");
      } else {
        console.error("Error during Api call");
        return;
      }
      const extensionJson = response.data;
      const tableName = extensionJson["set"]["name"] + " extension"

      const createExtensionTableQuery = `
        CREATE TABLE IF NOT EXISTS \`${tableName}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(1000) DEFAULT NULL,
        manaCost VARCHAR(255) DEFAULT NULL,
        colorIdentity JSON DEFAULT NULL,
        type VARCHAR(255) DEFAULT NULL,
        rarity VARCHAR(255) DEFAULT NULL,
        text VARCHAR(1000) DEFAULT NULL,
        flavor VARCHAR(1000) DEFAULT NULL,
        power VARCHAR(255) DEFAULT NULL,
        toughness VARCHAR(255) DEFAULT NULL,
        imageUrl VARCHAR(1000) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `

      await dbConnection.query(createExtensionTableQuery);
      console.log(`Table ${tableName} created successfully !`); 
      return tableName;
    } catch(err) {
      console.error(`Error during the API call or the table creation : ${err}`);
    }
}

async function fetchCards(pageCards, extensionCode, apiCardsCall, cardsList) {
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

async function fillExtensionTable(dbConnection, tableName, extensionCardsList) {
  try {
    const insertSqlrequest = `
      INSERT INTO \`${tableName}\` (name, manaCost, colorIdentity, type, rarity, text, flavor, power, toughness, imageUrl)
      VALUES ?
    `;

    const cardsValuesForTable = extensionCardsList.map((card) => [
      card.name,
      card.manaCost,
      JSON.stringify(card.colorIdentity),
      card.type,
      card.rarity,
      card.text,
      card.flavor,
      card.power,
      card.toughness,
      card.imageUrl,
    ]);

    await dbConnection.query(insertSqlrequest, [cardsValuesForTable]);
    console.log("Data inserted into table successfully !");
  } catch (err) {
    console.log(`Error during the insertion of the data : ${err}`);
  }
}

async function fetchCardsAndFillExtensionTable(dbConnection, extensionCode, tableName, apiCardsCall) {
  return new Promise(async (resolve, reject) => {
    try {
      const cardsList = [];
      const extensionCardsList = await fetchCards(1, extensionCode, apiCardsCall, cardsList);
      if(extensionCardsList.length === 0) {
        console.log("Error during the fetching cards process !");
        reject();
        return;
      } 
      await fillExtensionTable(dbConnection, tableName, extensionCardsList);
      resolve()
    } catch(err) {
      console.error(`Error during the API call or the table creation : ${err}`);
      reject();
    }
  });
}

async function getCardsFromExtensionsAndFillNewTables(dbConnection, extensionsArray) {
  return new Promise(async (resolve, reject) => {
    try {
      const apiSetCall = 'https://api.magicthegathering.io/v1/sets/'
      for(const extensionCode of extensionsArray) {
        const apiCardsCall = `https://api.magicthegathering.io/v1/cards?set=${extensionCode}&page=`
        const tableName = await createExtensionTables(dbConnection, extensionCode, apiSetCall);
        console.log("==========>", tableName);
        await fetchCardsAndFillExtensionTable(dbConnection, extensionCode, tableName, apiCardsCall);
      }
      resolve()
    } catch(err) {
      console.error(`Error during the process of fetching cards and fill tables functions : ${err}`)
      reject(err)
    }
    
  });
}

async function createAndConnectToContainerDB() {
    try {
      const dbConnection = await createConnectionToDB();
      console.log("Database connection established.");

      await createAndFillExtensionsTable(dbConnection);

      const extensionsArray = await retrieveExtensionsCodesArray(dbConnection);

      await getCardsFromExtensionsAndFillNewTables(dbConnection, extensionsArray);
      dbConnection.end();
  } catch(err) {
      console.error(`An error occurred: ${err.message}`);
  };
}

createAndConnectToContainerDB();