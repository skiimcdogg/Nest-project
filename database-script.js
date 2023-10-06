const mysql = require('mysql2');

async function createConnectionToDB() {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'magic_extensions',
      port: 3306,
    });

    connection.connect((err) => {
      if (err) {
        console.error(`Error during the connexion to the DB : ${err.message}`);
        console.log(err);
        reject(err);
        return;
      }

      console.log('Connected to the DB !');
      resolve(connection);
    });
  });
} 

async function createAndConnectToContainerDB() {

    try {
        const dbConnection = await createConnectionToDB(); // Attendre la création de la connexion
        console.log("Database connection established.");

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS extensions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          code VARCHAR(255) DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
      `;

      dbConnection.query(createTableQuery, (err) => {
        if(err) {
          console.error(`Error during table creation : ${err.message}`);
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
            } else {
              console.log('Inserted successfully !');
            }
            dbConnection.end();
          });
        }
      });
  } catch(err) {
      console.error(`An error occurred: ${err.message}`);
  }
}
createAndConnectToContainerDB();