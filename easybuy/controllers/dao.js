
const sqlite3 = require('sqlite3').verbose();

class sqlite3DAO {
    constructor(dbPath,settings=sqlite3.OPEN_READONLY) {
        this.db = new sqlite3.Database(dbPath, eval(settings), (err) => {
            if (err) {
                console.error('Error opening database', err);
            }
        });
    }
    


    getAllUsers(callback) {
        this.db.all("SELECT * FROM users", (err, rows) => {
            callback(err, rows);
        });
    }

    getUserById(id, callback) {
        this.db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
            callback(err, row);
        });
    }

    addUser(user, callback) {
        this.db.run("INSERT INTO users (name, email) VALUES (?, ?)", [user.name, user.email], function(err) {
            callback(err, { id: this.lastID });
        });
    }


    async query(query,params=[]) {
        return new Promise((resolve, reject) => {
            this.db.all(query, params,(err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
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


   add_product(req,res)
   {
        this.db.run("INSERT INTO Products (name, quantity,description,price,picname) VALUES (?, ?, ?, ?,?)", [req.body.name, req.body.quantity,req.body.description,req.body.price,req.body.pic_name], (err) =>{
        });
    }
      
   


}

module.exports={sqlite3DAO}
