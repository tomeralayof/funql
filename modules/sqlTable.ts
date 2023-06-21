import sqlite3 from 'sqlite3';

import { CreateTableInterface } from '../types/interfaces/createTableInterface';
import { InsertTableInterface } from '../types/interfaces/insertTableInterface';
import { ReadTableInterface } from '../types/interfaces/readTableInterface';

import { PackCreateResult } from '../types/interfaces/packQueryInterface';
import { PackInsertResult } from '../types/interfaces/packInsertResult';

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
      const { tableName, tableColumns } = data;
      const packData : PackCreateResult = this.packQueries.packCreateSchema(tableName,tableColumns);
      const query : string = this.query.create(packData);
      return this.queryExecuter.execute(query,ExecuterMethodsEnum.CREATE);
    };

    async insertTable(data : InsertTableInterface) {
      const { tableName, tableRows } = data;
      const packData : PackInsertResult = this.packQueries.packInsertSchema(tableName,tableRows);
      const query : string = this.query.insert(packData);
      return this.queryExecuter.execute(query,ExecuterMethodsEnum.INSERT);
    };

    async readTable(data : ReadTableInterface) {
      const readQuery : string = this.query.get(data.tableName,data.condition);
      const conditionValues = data.condition || undefined;

      const successMsg : string = "data read successfully";
      const executeType : ExecuterMethodsEnum = ExecuterMethodsEnum.READ;

      const executeObject = {readQuery,conditionValues};

     /*  const result = await this.queryExecuter.execute(executeObject,successMsg, executeType); */
      
      /* return result; */
    }

    async updateTable() {

    }

    async DeleteRowFromTable() {

    }

};

export { SqlTable };