import sqlite3 from 'sqlite3';

import { DbInterface } from '../types/interfaces/dbInterface';
import { CreateTableInterface } from '../types/interfaces/createTableInterface';
import { InsertTableInterface } from '../types/interfaces/insertTableInterface';
import { ReadTableInterface } from '../types/interfaces/readTableInterface';

import { SqlTable } from "../modules/sqlTable";

class Sqlite implements DbInterface {

    private sqlTable : SqlTable;
    
    constructor(path : string) {
        this.sqlTable = new SqlTable(this.initSqlite(path));
    }
    
    /**
    * Creates a new table in the database.
    * 
    * @param {CreateTableInterface} data - The data object containing table creation parameters.
    * @param {string} data.tableName - The name of the table.
    * @param {Record<string, string>} data.tableColumns - The columns of the table, represented as a record of column names and their respective data types.
    * @returns {Promise<void>} A Promise that resolves when the table is successfully created.
    * @throws { Error } If there is an error during table creation.
    */
    public async create(data : CreateTableInterface ) : Promise<void> {
        try {
            await this.sqlTable.createTable(data);
        } catch (error) {
            throw error;
        }
    }

    public async insert(data : InsertTableInterface){
        try {
            await this.sqlTable.insertTable(data);
        } catch (error) {
            throw error;
        }
    };
    
    public async read(data : ReadTableInterface) {
        try {
           const result = await this.sqlTable.readTable(data);
           return result;
        } catch (error) {
            throw error;
        }
    }

    /* change ... */
    public async update (data : ReadTableInterface) {
        try {
            const result = await this.sqlTable.readTable(data);
            return result;
         } catch (error) {
             throw error;
         }
    };

    public async delete (data : ReadTableInterface) {
        try {
            const result = await this.sqlTable.readTable(data);
            return result;
         } catch (error) {
             throw error;
         }
    };
    
    private initSqlite (filePath: string) : sqlite3.Database {
        return new sqlite3.Database(filePath, (err) => {
            if (err) {
                console.error('Error connecting to database:', err.message);
                return;
            }
        
            console.log('Connected to the SQLite database.');
        });
    }
};

export { Sqlite };