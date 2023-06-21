import sqlite3 from 'sqlite3';

import { CreateTableInterface } from '../types/interfaces/createTableInterface';
import { InsertTableInterface } from '../types/interfaces/insertTableInterface';
import { ReadTableInterface } from '../types/interfaces/readTableInterface';

import { ExecuterMethodsEnum } from '../types/enums/executer';

import { Query } from "./query";
import { PackQuery } from './packQuery';
import { QueryExecuter } from "./queryExecuter";

class SqlTable {
    private query = new Query();
    private queryExecuter : QueryExecuter;
    private packQueries : PackQuery =  new PackQuery();
    

    constructor(sqliteContainer : sqlite3.Database) {
       this.queryExecuter = new QueryExecuter(sqliteContainer);
    };

    async createTable(data : CreateTableInterface ): Promise<void> {
      
      const packData = this.packQueries.packCreateSchema(data.tableName,data.tableColumns);
      


      const createQuery : string = this.query.create(data.tableName,data.tableColumns);
      await this.queryExecuter.execute(createQuery,"Table created successfully!",
                                        ExecuterMethodsEnum.CREATE);
    };

    async insertTable(data : InsertTableInterface) {

      const insertQuery : string = this.query.insert(data.tableName,data.tableRows);
      await this.queryExecuter.execute(insertQuery,"data inserted successfuly.",
                                        ExecuterMethodsEnum.INSERT);
    };

    async readTable(data : ReadTableInterface) {
      const readQuery : string = this.query.get(data.tableName,data.condition);
      const conditionValues = data.condition || undefined;

      const successMsg : string = "data read successfully";
      const executeType : ExecuterMethodsEnum = ExecuterMethodsEnum.READ;

      const executeObject = {readQuery,conditionValues};

      const result = await this.queryExecuter.execute(executeObject,successMsg, executeType);
      
      return result;
    }

    async updateTable() {

    }

    async DeleteRowFromTable() {

    }

};

export { SqlTable };