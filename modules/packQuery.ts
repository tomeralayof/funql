import { PackCreateResult } from "../types/interfaces/packQueryInterface";
import { PackInsertResult } from "../types/interfaces/packInsertResult";

class PackQuery {   
    packCreateSchema(tableName : string,schema: Record<string, string>) : PackCreateResult  {
       const query =  Object.entries(schema)
            .map(([columnName, dataType]) => `${columnName} ${dataType}`)
            .join(', ');

        return { tableName,query };
    }

    packInsertSchema(tableName : string,rowData: Record<string, any>) : PackInsertResult {
        const cols = Object.keys(rowData).join(', ');
        const values = Object.values(rowData).map(value => `'${value}'`).join(', ');
        return {tableName,cols, values};
    }

    packUpdateSchema() {

    }

    packDeleteSchema() {

    }

}

export { PackQuery };