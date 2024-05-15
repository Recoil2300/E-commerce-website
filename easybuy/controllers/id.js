const Sqlite3 = require('sqlite3').verbose();
const DAO=require('../controllers/dao')

async function allocate_id(category)
{
  const db = new DAO.sqlite3DAO('./easybuy.db', Sqlite3.OPEN_READWRITE);
  const result=await db.all_query('SELECT currentid FROM IdAllocation WHERE category=?',[category]);
  const currentid=result[0].currentid;
  const nextid=currentid+1;
  await db.run_query('UPDATE IdAllocation SET currentid = ? WHERE category=?',[nextid,category] );
  db.close();
  return currentid;
}

module.exports = {allocate_id};