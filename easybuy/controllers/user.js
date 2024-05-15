const sqlite3 = require('sqlite3').verbose();
const dao=require('../controllers/dao')
const ID = require('../controllers/id')


function register(unique,role='consumer'){return async function(req,res)
{
  const db =new dao.sqlite3DAO('./easybuy.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
  try{
      const result = await db.all_query(`SELECT ${unique} FROM Users WHERE ${unique} = ?`,[req.body[unique]]);
      if(!result.length)
      {
      const id=await ID.allocate_id('user');
      await db.run_query(`INSERT INTO Users (name, phone,password,email,id) VALUES (?, ?,?,?,?)`,[req.body.name, req.body.phone, req.body.password,req.body.email,id]);
      await db.run_query(`INSERT INTO Roles (role,id) VALUES(?,?)`,[role,id]);
      req.session.user_id=id;
      res.redirect('index.html');
    }
    else{
      res.send(`User already exists. Please try another ${unique}.`);
    }
  }
  catch(err){
       res.send( err);
  }
  finally
  {
    db.close();
  }
}
}






function authenticateUser(username, password, callback) {
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  db.get(query, [username, password], (err, row) => {
    if (err) {
      return callback(err);
    }
    if (row) {
      console.log("Login successful for user:", username);
      return callback(null, row);
    } else {
      console.log("Login failed for user:", username);
      return callback(null, false);
    }
  });
}

function login(unique){return async function(req,res)
{
  const db =new dao.sqlite3DAO('./easybuy.db',sqlite3.OPEN_READONLY  );
  try{
    const result = await db.all_query(`SELECT ${unique},id,password FROM Users WHERE ${unique} = ?`,[req.body[unique]]);
    if(result.length)
    {
    if(req.body.password==result[0].password)
    {
      req.session.user_id=result[0].id;
      res.redirect('index.html')
    }
  }
  else{
    return ('User no exists.');
  }
}
catch(err){
     throw err;
}
finally
{
  db.close();
}
}
}

function logout(){return async function (req,res){
await req.session.destroy();
res.redirect('index.html');
}

}



async function user_info(id){if(id)
{
  const db = new dao.sqlite3DAO('./easybuy.db');
  const result=await db.all_query( 'SELECT * FROM Users WHERE id = ?',[id]);
  db.close();
  return result;
}
else{return [];}
}



async function user_role(id){if(id)
{
  const db = new dao.sqlite3DAO('./easybuy.db');
  const result=await db.all_query( 'SELECT role FROM Roles WHERE id = ?',[id]);
  db.close();
  return result;
}
else{return [];}
}

function authorization(permit_roles=[]){return async function(req,res,next)
{
  if(permit_roles.length&&req.session.user_id){
    const roles=await user_role(req.session.user_id);
    if(permit_roles.includes(roles[0].role)){
      next()
    }
    else{res.send("权限不足")}
  }
  else{res.send("权限不足")}
}}


module.exports = {register,login,logout,user_info,user_role,authorization};