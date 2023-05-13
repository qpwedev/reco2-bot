// Importing sqlite3 module
import sqlite3 from 'sqlite3';

export class Database {
    private db: sqlite3.Database;

    constructor(private dbName: string) {
        this.db = new sqlite3.Database(`./db/${dbName}.db`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Connected to the SQLite database.');
            }
        });
    }

    // Method to create a basic table
    createTables(): void {
        // Create users table
        this.db.run(`CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    created_at TEXT
  )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Users table created successfully.');
            }
        });

        // Create transactions table
        this.db.run(`CREATE TABLE IF NOT EXISTS transactions (
    tx_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    amount REAL,
    co2_amount REAL,
    address_from TEXT,
    address_to TEXT,
    items TEXT,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
  )`, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Transactions table created successfully.');
            }
        });
    }

    addUser(userId: number, username: string): void {
        const createdAt = new Date().toISOString();
        this.db.run(`INSERT OR IGNORE INTO users (user_id, username, created_at) VALUES (?, ?, ?)`, [userId, username, createdAt], (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`User ${username} added successfully.`);
            }
        });
    }

    addTransaction(userId: number, amount: number, co2Amount: number, addressFrom: string, addressTo: string, items: string): void {
        this.db.run(`INSERT INTO transactions (user_id, amount, co2_amount, address_from, address_to, items) VALUES (?, ?, ?, ?, ?, ?)`, [userId, amount, co2Amount, addressFrom, addressTo, items], (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(`Transaction for user ${userId} added successfully.`);
            }
        });
    }


    // Method to close the database connection
    close(): void {
        this.db.close((err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('Closed the database connection.');
            }
        });
    }
}


const db = new Database('database');
db.createTables();