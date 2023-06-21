"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
class Query {
    create(packQueryResult) {
        return `CREATE TABLE ${packQueryResult.tableName} (${packQueryResult.query});`;
    }
    insert(tableName, rowData) {
        const columns = Object.keys(rowData).join(', ');
        const values = Object.values(rowData).map(value => `'${value}'`).join(', ');
        return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    }
    get(tableName, condition) {
        let query = `SELECT * FROM ${tableName}`;
        if (condition) {
            const conditionArr = Object.entries(condition).map(([key, value]) => `${key} = '${value}'`);
            const conditionString = conditionArr.join(" AND ");
            query += ` WHERE ${conditionString}`;
        }
        query += ";";
        return query;
    }
    remove(tableName, condition) {
        return `DELETE FROM ${tableName} WHERE ${condition};`;
    }
    update(tableName, values, condition) {
        const setValues = Object.entries(values)
            .map(([column, value]) => `${column} = '${value}'`)
            .join(', ');
        return `UPDATE ${tableName} SET ${setValues} WHERE ${condition};`;
    }
}
exports.Query = Query;
