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
exports.DbOperations = void 0;
const util_1 = require("util");
class DbOperations {
    constructor(sqliteContainer) {
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
    runOperation(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const runOperationAsync = (0, util_1.promisify)(this.sqliteContainer.run).bind(this.sqliteContainer);
            return this.run(query, runOperationAsync);
        });
    }
    run(query, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cb(query);
                this.sqliteContainer.close();
            }
            catch (error) {
                console.log("catch run ..");
                this.sqliteContainer.close();
                throw new Error(error.toString());
            }
        });
    }
    selectOperation(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const runOperation = this.sqliteContainer.all;
            return this.run(query, runOperation);
        });
    }
}
exports.DbOperations = DbOperations;
;
