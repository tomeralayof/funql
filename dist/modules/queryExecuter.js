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
exports.QueryExecuter = void 0;
const executer_1 = require("../types/enums/executer");
const dbOperations_1 = require("./dbOperations");
class QueryExecuter {
    constructor(sqliteContainer) {
        this.dbOprations = new dbOperations_1.DbOperations(sqliteContainer);
    }
    execute(query, msg, command) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (command) {
                case executer_1.ExecuterMethodsEnum.CREATE || executer_1.ExecuterMethodsEnum.INSERT:
                    return this.dbOprations.runOperation(query, msg);
                case executer_1.ExecuterMethodsEnum.READ:
                default:
                    break;
            }
        });
    }
}
exports.QueryExecuter = QueryExecuter;
;
