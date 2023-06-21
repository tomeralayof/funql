"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackQuery = void 0;
class PackQuery {
    packCreateSchema(tableName, schema) {
        const query = Object.entries(schema)
            .map(([columnName, dataType]) => `${columnName} ${dataType}`)
            .join(', ');
        return { tableName, query };
    }
    packInsertSchema() {
    }
    packUpdateSchema() {
    }
    packDeleteSchema() {
    }
}
exports.PackQuery = PackQuery;
