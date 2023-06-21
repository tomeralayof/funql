import sqlite3 from 'sqlite3';

import { ExecuterMethodsEnum } from '../types/enums/executer';

import { DbOperations } from './dbOperations';

class QueryExecuter {

    private dbOprations : DbOperations;
    
    constructor(sqliteContainer : sqlite3.Database) {
        this.dbOprations = new DbOperations(sqliteContainer);
    }

    async execute(query : string , msg : string ,command : ExecuterMethodsEnum ) {
      switch (command) {
        case ExecuterMethodsEnum.CREATE || ExecuterMethodsEnum.INSERT:
          return this.dbOprations.runOperation(query,msg);
        case ExecuterMethodsEnum.READ:
        default:
          break;
      }
    }
};

export { QueryExecuter };