const dao=require('../controllers/dao')
const ID = require('../controllers/id')
const multer = require('multer');
const path = require('path');
const fs = require('fs');




/*   上传商品图片   */
function upload_pic(form_name) {
    return function(req,res,next){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            const timestamp = new Date().toISOString().replace(/:/g, '-');
           const origin_picname=file.originalname;
           const origin_extname=path.extname(file.originalname);
            cb(null, path.basename(origin_picname,origin_extname) +timestamp+ origin_extname);
        }
    });
    const upload = multer({ storage: storage });
    const uploader=upload.single(form_name);
    uploader(req, res, function(err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        next();
    });
   
}
}






/*   上传商品信息   */
async function add_product(req,res)
{
    const id = await ID.allocate_id('product'); 
    const origin_picpath=req.file.path;
    const final_picpath=path.dirname(origin_picpath)+'/'+id+path.extname(origin_picpath);
    req.body.pic_name=id+path.extname(origin_picpath);
    fs.rename(origin_picpath,final_picpath,(err)=>{})
    const db = new dao.sqlite3DAO('./easybuy.db','sqlite3.OPEN_READWRITE');
    await db.run_query("INSERT INTO Products (name, quantity,description,price,picname,id) VALUES (?, ?, ?, ?,?,?)", [req.body.name, req.body.quantity,req.body.description,req.body.price,req.body.pic_name,id])
    await db.run_query("INSERT INTO Product_salesperson(salespersonid,productid)VALUES(?,?)",[req.session.user_id,id]);
    db.close();
}




async function getAllProducts() {
    let db = new dao.sqlite3DAO('./easybuy.db');
      const sql = 'SELECT * FROM Products';
      const rows = await db.query(sql);
    db.close();
    return rows;
}   






module.exports = { upload_pic,add_product, getAllProducts };
