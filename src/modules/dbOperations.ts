import sqlite3 from 'sqlite3';

class DbOperations {
    private sqliteContainer : sqlite3.Database;

    constructor(sqliteContainer : sqlite3.Database) {
        this.sqliteContainer = sqliteContainer;
    }

    readQquery (query : string) {
        const allDbFunction = () => {
            this.sqliteContainer.all(query, condition ? conditionValues : [], (err, rows) => {
                if (err) {
                  console.error(err);
                  callback(err, null);
                } else {
                  callback(null, rows);
                }
                this.sqliteContainer.close();
              });
        };
    }


    async executeRunQuery(query : any, msg : string) {
        try {
         const result = await this.runQuery(query,msg);
         this.sqliteContainer.close();
         return result;
       } catch (error) {
         this.sqliteContainer.close();
         throw error;
       }
   }

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