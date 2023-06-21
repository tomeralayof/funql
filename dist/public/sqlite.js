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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sqlite = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlTable_1 = require("../modules/sqlTable");
class Sqlite {
    constructor(path) {
        this.sqlTable = new sqlTable_1.SqlTable(this.initSqlite(path));
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
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sqlTable.createTable(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sqlTable.insertTable(data);
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    read(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sqlTable.readTable(data);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    /* change ... */
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sqlTable.readTable(data);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    delete(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sqlTable.readTable(data);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    ;
    initSqlite(filePath) {
        return new sqlite3_1.default.Database(filePath, (err) => {
            if (err) {
                console.error('Error connecting to database:', err.message);
                return;
            }
            console.log('Connected to the SQLite database.');
        });
    }
}
exports.Sqlite = Sqlite;
;
