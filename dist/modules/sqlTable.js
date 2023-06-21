"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlTable = void 0;
const executer_1 = require("../types/enums/executer");
const query_1 = require("./query");
const packQuery_1 = require("./packQuery");
const queryExecuter_1 = require("./queryExecuter");
class SqlTable {
    constructor(sqliteContainer) {
        this.query = new query_1.Query();
        this.packQueries = new packQuery_1.PackQuery();
        this.queryExecuter = new queryExecuter_1.QueryExecuter(sqliteContainer);
    }
    ;
    createTable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tableName, tableColumns } = data;
            const packData = this.packQueries.packCreateSchema(tableName, tableColumns);
            const query = this.query.create(packData);
            return this.queryExecuter.execute(query, executer_1.ExecuterMethodsEnum.CREATE);
        });
    }
    ;
    insertTable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tableName, tableRows } = data;
            const packData = this.packQueries.packInsertSchema(tableName, tableRows);
            const query = this.query.insert(packData);
            return this.queryExecuter.execute(query, executer_1.ExecuterMethodsEnum.INSERT);
        });
    }
    ;
    readTable(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const readQuery = this.query.get(data.tableName, data.condition);
            const conditionValues = data.condition || undefined;
            const successMsg = "data read successfully";
            const executeType = executer_1.ExecuterMethodsEnum.READ;
            const executeObject = { readQuery, conditionValues };
            /*  const result = await this.queryExecuter.execute(executeObject,successMsg, executeType); */
            /* return result; */
        });
    }
    updateTable() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    DeleteRowFromTable() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.SqlTable = SqlTable;
;
