import { PackCreateResult } from "../types/interfaces/packQueryInterface";
import { PackInsertResult } from "../types/interfaces/packInsertResult";

class Query {
  
    create(packQueryResult : PackCreateResult): string {  
            return `CREATE TABLE ${packQueryResult.tableName} (${packQueryResult.query});`;
    }

    insert(packInsertResult : PackInsertResult): string {
        const {tableName,cols,values} = packInsertResult;
        return `INSERT INTO ${tableName} (${cols}) VALUES (${values});`;
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