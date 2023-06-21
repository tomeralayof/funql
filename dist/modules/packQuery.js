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
    packInsertSchema(tableName, rowData) {
        const cols = Object.keys(rowData).join(', ');
        const values = Object.values(rowData).map(value => `'${value}'`).join(', ');
        return { tableName, cols, values };
    }
    packUpdateSchema() {
    }
    packDeleteSchema() {
    }
}
exports.PackQuery = PackQuery;
