
const sqlite3 = require('sqlite3').verbose();

class sqlite3DAO {
    constructor(dbPath,settings=sqlite3.OPEN_READONLY) {
        this.db = new sqlite3.Database(dbPath, eval(settings), (err) => {
            if (err) {
                console.error('Error opening database', err);
            }
        });
    }
    
    
    all_query(query,params=[]) {
        return new Promise((resolve, reject) => {
        this.db.all(query, params,(err,rows) => {
            if (err) {
                reject (err);
            } else {
               resolve(rows);
            }
        });
    });     
    }
     run_query(query,params=[]) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params,(err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(`${query} successfully!`);
                }
            });
        });
       }

    close() {
        this.db.close();
    }

}

module.exports={sqlite3DAO}
