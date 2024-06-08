import {add_dynamicelements} from './js/page.js';
import {get_jsoninfo} from './js/info.js';



document.getElementById('myButton').addEventListener('click', function() {
    fetch('/products.js')
      .then(data => console.log(data.text))
      .catch(error => console.error('Error:', error));
  });
/*
  document.addEventListener('DOMContentLoaded', () => {
    get_jsoninfo('/userrole_api')
    .then(results=>{switch(results[0].role)
  {
     
      case 'salesperson': console.log(results[0].role);
          const innerhtml=`
      <a href="/upload.html">上传商品</a>
      `
          add_dynamicelements(innerhtml,'dynamic_field')
  }});
});
*/
get_jsoninfo('/userrole_api')
  .then(results=>{let innerhtml;
    switch(results[0].role)
{
    case 'salesperson':  innerhtml=`
        <p>您现在是销售人员</p>   
    <a href="/upload.html">上传商品</a>
    `;
    break;
    case 'administrator': innerhtml=`
        <p>您现在是管理人员</p>   
    <a href="/administrator.html">管理页面</a>
    `;
    break;
    case 'consumer': innerhtml=`
        <p>您现在是用户</p>   
    `;
    break;
    default:
        innerhtml=`
        <p>您现在是游客</p>   
    `
}
add_dynamicelements(innerhtml,'dynamic_field');
});








// 使用 Fetch API 获取商品列表
fetch('/products.js')
.then(response => response.json()) 
.then(products => {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        // 为每个商品创建一个新的 div 元素
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <img src="./images/${product.picname}" >
            <p>${product.description}</p>
            <p><b>Price:</b> $${product.price}</p>
        `;
        container.appendChild(productDiv); // 将商品 div 添加到容器中
    });
})
.catch(error => console.error('Error fetching products:', error));


fetch('/userinfo_api')
.then(response=>response.json())
.then(info=>{
    const container = document.getElementById('userinfo_container');
    const userinfo_div = document.createElement('div');
    if(info.length){
        userinfo_div.innerHTML=`
        <p>欢迎您，${info[0].name}</p>
        <p>您的id：${info[0].id}</p>
        <a href="/logout">注销</a>
        `;}
    else{
        userinfo_div.innerHTML=`
        <p>您好，请登录</p>
        <a href="/login.html">登录</a>
        `;}
        container.appendChild(userinfo_div);
})
.catch(error => console.error('Error fetching products:', error));