import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class DbOperations {
    private sqliteContainer : sqlite3.Database;

    constructor(sqliteContainer : sqlite3.Database) {
        this.sqliteContainer = sqliteContainer;
    }
    /* 
    access the data base in the terminal:
    - sqlite3 users.db
    - .tables
    - SELECT * FROM keys;
    -DROP TABLE IF EXISTS table_name;
    - exit
    */
    public async runOperation(query: any) {
      const runOperationAsync = promisify(this.sqliteContainer.run).bind(this.sqliteContainer);
      return this.run(query, runOperationAsync);
    }
    
    private async run(query: string, cb: any) {
      try {
        const result = await cb(query);
        this.sqliteContainer.close();
      } catch (error) {
        console.log("catch run ..");
        this.sqliteContainer.close();
        throw new Error((error as Error).toString());
      }
    }

    public async selectOperation (query: any) {
      const runOperation = this.sqliteContainer.all;
      return this.run(query,runOperation);
    }
};

export { DbOperations };