import sqlite3 from 'sqlite3';
import { promisify } from 'util';

class DbOperations {
    private sqliteContainer : sqlite3.Database;

    constructor(sqliteContainer : sqlite3.Database) {
        this.sqliteContainer = sqliteContainer;
    }

    public async runOperation(query: any) {
      const runOperation = this.sqliteContainer.run;
      return this.run(query,runOperation);
    }

    public async selectOperation (query: any) {
      const runOperation = this.sqliteContainer.all;
      return this.run(query,runOperation);
    }

    private async run( query : string ,cb : any) {
      try {
        const runQueryAsync = promisify(cb).bind(this.sqliteContainer);
        const result = await runQueryAsync(query);
        this.sqliteContainer.close();
        return result;
      } catch (error) {
        this.sqliteContainer.close();
        throw new Error((error as Error).toString());
      }
    }
};

export { DbOperations };