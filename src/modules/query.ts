class Query {
      
    create(tableName: string, schema: Record<string, string>): string {
        const columns = Object.entries(schema)
            .map(([columnName, dataType]) => `${columnName} ${dataType}`)
            .join(', ');
        
            return `CREATE TABLE ${tableName} (${columns});`;
    }

    insert(tableName: string, rowData: Record<string, any>): string {
        const columns = Object.keys(rowData).join(', ');
        const values = Object.values(rowData).map(value => `'${value}'`).join(', ');
        return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
    }


    get(tableName: string, condition?: Record<string, any>): string {
      let query = `SELECT * FROM ${tableName}`;
    
      if (condition) {
        const conditionArr = Object.entries(condition).map(([key, value]) => `${key} = '${value}'`);
        const conditionString = conditionArr.join(" AND ");
        query += ` WHERE ${conditionString}`;
      }
      
      query += ";";

      return query;
    }

    remove(tableName: string, condition: string): string {
        return `DELETE FROM ${tableName} WHERE ${condition};`;
    }

    update(tableName: string, values: Record<string, any>, condition: string): string {
    const setValues = Object.entries(values)
      .map(([column, value]) => `${column} = '${value}'`)
      .join(', ');

    return `UPDATE ${tableName} SET ${setValues} WHERE ${condition};`;
  }
}

export { Query };