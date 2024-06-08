const express = require('express')
const router =express.Router()
const authority =require('../controllers/authority')
const administrator =require('../controllers/administrator')

/*添加销售人员接口*/
router.post('/addsalesperson_api',authority.authorization(['administrator']),(req,res)=>{administrator.add_salesperson(req.body.id)});

/*删除销售人员接口*/
router.post('/deletesalesperson_api',authority.authorization(['administrator']),(req,res)=>{administrator.delete_salesperson(req.body.id)});

module.exports = router;