import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_NAME = process.env.DB_NAME || 'campus_erp';

// Auto-create database if not exists in MySQL
export const initializeDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`[MySQL]: Database '${DB_NAME}' ensured/verified in MySQL Server.`);
    await connection.end();
  } catch (err) {
    console.warn(`[MySQL Warning]: Could not auto-create database (check DB_PASSWORD in .env): ${err.message}`);
  }
};

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectMySQL = async () => {
  try {
    await initializeDatabase();
    await sequelize.authenticate();
    console.log(`🐬 [MySQL Connected]: Successfully connected to MySQL at ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    await sequelize.sync({ alter: true });
    console.log(`📋 [MySQL Synced]: Tables synchronized with Workbench schemas.`);
  } catch (error) {
    console.error(`[MySQL Connection Error]: ${error.message}`);
    console.warn(`[Notice]: Verify your MySQL credentials in backend/.env (DB_USER, DB_PASSWORD).`);
  }
};

export default sequelize;
