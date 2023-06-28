const mysql = require("mysql2/promise");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_USER,
  user: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

const createTables = async () => {
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS domains (
        id CHAR(36) PRIMARY KEY,
        user_id INT,
        main_domain VARCHAR(255) NOT NULL,
        subdomains JSON,
        update_at DATETIME,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    console.log("Tables created successfully");
  } catch (error) {
    console.error("Error creating tables", error);
  }
};

const generateUUID = () => {
  return uuidv4().replace(/-/g, "");
};

createTables();

module.exports = {
  connection,
  generateUUID,
};
