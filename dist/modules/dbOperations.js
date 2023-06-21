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
class DbOperations {
    constructor(sqliteContainer) {
        this.sqliteContainer = sqliteContainer;
    }
    runOperation(query, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.runQuery(query, msg);
                this.sqliteContainer.close();
                return result;
            }
            catch (error) {
                this.sqliteContainer.close();
                throw error;
            }
        });
    }
    selectOperation(query, msg) {
        try {
            const result = this.select(query, msg);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    /* query : `SELECT * FROM tablename WHERE ${conditionString}` */
    select(query, msg) {
        this.sqliteContainer.all(query, (error, rows) => {
            if (error) {
                console.error('Error executing query:', error);
                throw error;
            }
            else {
                console.log(msg, rows);
            }
        });
    }
    ;
    runQuery(query, successMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                this.sqliteContainer.run(query, (error) => {
                    if (error) {
                        this.errorHandler(`error ${successMessage}`, successMessage, error);
                        reject(error);
                    }
                    else {
                        resolve(undefined);
                    }
                });
            });
        });
    }
    ;
    errorHandler(errorMsg, successMsg, error) {
        if (error) {
            console.log(errorMsg, error);
        }
        else {
            console.log(successMsg);
        }
    }
}
exports.DbOperations = DbOperations;
;
