/*权限认证中间件*/
function authorization(permit_roles=[]){return async function(req,res,next)
    {
      if(permit_roles.length&&req.session.user_role){
        if(permit_roles.includes(req.session.user_role)){
          next()
        }
        else{res.send(
            `<p>权限不足</p>
            <a href="javascript:history.back()">返回上一个页面</a>`)}
      }
      else{res.send("权限不足")}
    }}

module.exports = {authorization};
    