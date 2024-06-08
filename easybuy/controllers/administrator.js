const dao=require('../controllers/dao')


/*根据id添加销售人员*/
function add_salesperson(id)
{
    const db =new dao.sqlite3DAO('./easybuy.db', 'sqlite3.OPEN_READWRITE' );
    db.run_query(`UPDATE Roles SET role = ? WHERE id = ?`,['salesperson',id]);
    db.close;
}

/*根据id删除销售人员*/
function delete_salesperson(id)
{
    const db =new dao.sqlite3DAO('./easybuy.db', 'sqlite3.OPEN_READWRITE' );
    db.run_query(`UPDATE Roles SET role = ? WHERE id = ?`,['consumer',id]);
    db.close;
}

module.exports = {add_salesperson,delete_salesperson};