const express = require('express');
const path = require('path');
const app = express();
const port = 3030;
const cors = require('cors')
const multer = require('multer');
const product=require('./controllers/product')
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.get('/',(req,res)=>{
    var file = path.join(__dirname, 'public', req.path + 'test.html');
        res.sendFile(file);
});

app.get('/data', (req, res) => {
    const data = [{
        message: "Hello from the server!",
        time: new Date()
    }];
    res.json(data); // 自动将 data 对象转换为 JSON 并发送
});

app.get('/date', (req, res) => {
    const date = new Date().toISOString().replace(/:/g, '').replace(/-/g, '').replace(/T/g, '').replace(/\..*/g, '');
    console.log(date)
    res.send(date); 
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './')
    },
    filename: function (req, file, cb) {
        console.log(req.body.name);
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        req.body.pic_tmpname=file.originalname+timestamp;
       
        cb(null, 'testaa'+ '-' + timestamp +path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
app.post('/upload.js', upload.single('upload_pic'),(req,res)=>
{
    console.log(req.body.pic_tmpname);
    console.log(req.file.filename); 
})


/*
function upload_pic(form_name) {
    return function(req,res,next){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/images')
        },
        filename: function (req, file, cb) {
            console.log(req.body.name);
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            cb(null, req.body.name +timestamp+ path.extname(file.originalname));
        }
    });
    const upload = multer({ storage: storage });
    const uploader=upload.single(form_name);
    uploader(req, res, function(err) {
        if (err) {
            return res.status(500).send({ error: err.message });
        }
        if (req.file.mimetype !== 'image/png') {
            return res.status(400).send({ error: 'Only PNG files are allowed!' });
        }
    });
    next();
}
}
*/
/*app.post('/upload.js', product.upload_pic('upload_pic'),(req,res)=>
{
    console.log(req.file.filename); 
       
})
*/
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
