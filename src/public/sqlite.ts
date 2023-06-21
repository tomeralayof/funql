import sqlite3 from 'sqlite3';


import { DbInterface } from '../interfaces/dbInterface';
import { CreateTableInterface } from "../interfaces/createTableInterface";
import { InsertTableInterface } from '../interfaces/insertTableInterface';
import { ReadTableInterface } from '../interfaces/readTableInterface';

import { SqlTable } from "../modules/sqlTable";

class Sqlite implements DbInterface {

    private sqlTable : SqlTable;
    
    constructor(path : string) {
        this.sqlTable = new SqlTable(this.initSqlite(path));
    }
    
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