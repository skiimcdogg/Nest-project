const mysql = require('mysql2/promise');
const axios = require('axios');

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
  return new Promise((resolve, reject) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS extensions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          code VARCHAR(255) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `;

      dbConnection.query(createTableQuery, (err) => {
        if(err) {
          console.error(`Error during table creation : ${err.message}`);
          reject(err)
          return;
        } else {
          console.log('Table created successfully !');

          // Insérer des données dans la table
          const insertDataQuery = `
            INSERT INTO extensions (code)
            VALUES ('khm'), ('afr'), ('znr'), ('eld')
          `;

          dbConnection.query(insertDataQuery, (err) => {
            if(err) {
              console.error(`Error during insertion : ${err.message}`);
              reject(err);
              return;
            } else {
              console.log('Inserted successfully !');
              resolve();
            }
          });
        }
      });
  });
} 

async function retrieveExtensionsCodesArray(dbConnection) {
  return new Promise((resolve, reject) => {

    const selectAllExtensionsQuery = 'SELECT * FROM extensions';

    dbConnection.query(selectAllExtensionsQuery, (err, results) => {
      if(err) {
        console.error(`Error during the select query : ${err.message}`);
        reject(err);
        return;
      }

    const extensionsArray = results.map((row) => row.code);
    
    resolve(extensionsArray);
    })
  });
}

async function createExtensionTables(dbConnection, extensionCode, apiSetCall) {
  return new Promise(async (resolve, reject) => {
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
        name VARCHAR(255) DEFAULT NULL,
        manaCost VARCHAR(255) DEFAULT NULL,
        colorIdentity JSON DEFAULT NULL,
        type VARCHAR(255) DEFAULT NULL,
        text VARCHAR(255) DEFAULT NULL,
        flavor VARCHAR(255) DEFAULT NULL,
        power VARCHAR(255) DEFAULT NULL,
        toughness VARCHAR(255) DEFAULT NULL,
        imageUrl VARCHAR(255) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `

      dbConnection.query(createExtensionTableQuery, (err) => {
        if(err) {
          console.error(`Error during extension table creation : ${err}`);
          reject();
          return;
        } else {
          resolve(tableName);
        }
      });
    } catch(err) {
      console.error(`Error during the API call or the table creation : ${err}`);
      reject();
    }
  });
}

async function fetchCards(pageCards, extensionCode, apiCardsCall, cardsList) {
  return new Promise(async (resolve, reject) => {
    urlCards = apiCardsCall.replace("${extensionCode}", extensionCode);
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
  return new Promise(async (resolve, reject) => {
    try {
      const insertSqlrequest = `
      INSERT INTO \`${tableName}\` (name, manaCost, colorIdentity, type, text, flavor, power, toughness, imageUrl) VALUES ?
      `
  
      const cardsValuesForTable = extensionCardsList.map((card) => [
        card["name"],
        card["manaCost"],
        card["colorIdentity"],
        card["type"],
        card["text"],
        card["flavor"],
        card["power"],
        card["toughness"],
        card["imageUrl"],
      ]);
      await dbConnection.execute(insertSqlrequest, [cardsValuesForTable]);
      console.log("Data inserted into table successfully !");
      resolve();
    } catch(err) {
      console.log(`Error during the insertion of the data : ${err}`);
      reject(err);
    }
  });
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
    const apiSetCall = 'https://api.magicthegathering.io/v1/sets/'
    for(const extensionCode of extensionsArray) {
      const apiCardsCall = `https://api.magicthegathering.io/v1/cards?set=${extensionCode}&page=`
      const tableName = await createExtensionTables(dbConnection, extensionCode, apiSetCall);
      console.log(`${tableName} table created !`);
      await fetchCardsAndFillExtensionTable(dbConnection, extensionCode, tableName, apiCardsCall);
    }
  });
}

async function createAndConnectToContainerDB() {

    try {
      const dbConnection = await createConnectionToDB();
      console.log("Database connection established.");
      await createAndFillExtensionsTable(dbConnection)
      const extensionsArray = await retrieveExtensionsCodesArray(dbConnection);
      console.log("=====>", extensionsArray);
      await getCardsFromExtensionsAndFillNewTables(dbConnection, extensionsArray);
      dbConnection.end()
  } catch(err) {
      console.error(`An error occurred: ${err.message}`);
  }
}
createAndConnectToContainerDB();