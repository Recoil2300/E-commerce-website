const express = require('express');
const app = express();
const path = require('path');
const Router=require('./routes/router');
const cors = require('cors');
const session = require('express-session');
const  SQLiteStore = require('connect-sqlite3')(session);



app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));

app.use(session({
    name:'sid',
    store: new SQLiteStore({ db: 'sessions.db', dir: './' }), // 指定数据库文件和位置
    secret: 'atguigu',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 } // 例如，设置cookie的有效期为一天
}));


app.use('/',Router);

app.use((req, res, next) => {
    if (req.path.indexOf('.') === -1) {  // 检查路径中是否有扩展名
        var file = path.join(__dirname, 'public', req.path + '.html');
        res.sendFile(file);
    } else {
        next();
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});