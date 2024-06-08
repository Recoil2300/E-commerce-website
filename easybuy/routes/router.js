const express = require('express')
const router =express.Router()
const user =require('../controllers/user')
const product=require('../controllers/product')

router.post('/hello',async(req,res)=>{
    console.log('hello');
});
router.get('/hello',async(req,res)=>{
    console.log('hello');
});

router.post('/register.js',user.register('email'))
router.post('/login_ctrl',user.login('email'));
router.get('/logout',user.logout());
router.post('/upload.js',user.authorization(['salesperson','administrator']),product.upload_pic('upload_pic'),product.add_product);


router.get('/products.js', (req, res) => {
    product.getAllProducts().then((productss)=>{
        res.json( productss);
    });
    // 确保返回 JSON 数据
});


router.get('/userinfo_api',(req,res)=>{
    user.user_info(req.session.user_id).then((info)=>{
        res.json(info);
    });
})

router.get('/userrole_api',(req,res)=>{
    user.user_role(req.session.user_id).then((role)=>{
        res.json(role);
    });
})

module.exports = router;