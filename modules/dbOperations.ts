import sqlite3 from 'sqlite3';

class DbOperations {
    private sqliteContainer : sqlite3.Database;

    constructor(sqliteContainer : sqlite3.Database) {
        this.sqliteContainer = sqliteContainer;
    }

    async runOperation(query : any, msg : string) {
      try {
       const result = await this.runQuery(query,msg);
       this.sqliteContainer.close();
       return result;
     } catch (error) {
       this.sqliteContainer.close();
       throw error;
     }
  }


    selectOperation (query : string, msg : string) {
      try {
        const result =  this.select(query,msg);
        return result;
      } catch (error) {
        throw error;
      }
    }

    /* query : `SELECT * FROM tablename WHERE ${conditionString}` */
    private select (query : string,msg : string) {
      this.sqliteContainer.all(query, (error, rows) => {
        if (error) {
          console.error('Error executing query:', error);
          throw error;
        } else {
          console.log(msg, rows);
        }
      });
    };

    async runQuery (query: string, successMessage: string): Promise<any> {
        await new Promise<any>((resolve, reject) => {
          this.sqliteContainer.run(query, (error) => {
            if (error) {
              this.errorHandler(`error ${successMessage}`, successMessage, error);
              reject(error);
            } else {
              resolve(undefined);
            }
          });
        });
    };

    private errorHandler(errorMsg : string,successMsg : string,error : any) {
        if(error) {
            console.log(errorMsg,error);
        }
        
        else {
            console.log(successMsg);
        }
    }
};

export { DbOperations };