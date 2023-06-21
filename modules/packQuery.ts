
interface PackResult {
    tableName: string;
    query: string;
}

class PackQuery {
    
    packCreateSchema(tableName : string,schema: Record<string, string>) : PackResult  {
       const query =  Object.entries(schema)
            .map(([columnName, dataType]) => `${columnName} ${dataType}`)
            .join(', ');

        return { tableName,query };
    }

    packInsertSchema() {

    }

    packUpdateSchema() {

    }

    packDeleteSchema() {

    }

}

export { PackQuery };