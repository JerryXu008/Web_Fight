const Router = require(".");
const methods = require('methods');
const Layer = require('./layer');
function Route(){
    this.stack = [];
}

methods.forEach(method =>{
  
    Route.prototype[method] = function(path, handlers){

        if(Array.isArray(handlers)){
            handlers.forEach(handler =>{
                // 遍历到一个handler就需要创建一小层
                let layer = new Layer(path, method, handler);
                this.stack.push(layer);
            });
        }else{
            let layer = new Layer(path, method, handlers);
            this.stack.push(layer);
        }
    };
});

Route.prototype.dispatch = function(req, res, out){
    const requestPath = req.url;
    const requestMethod = req.method.toLowerCase();
    let idx = 0;
   
    let next = (err)=>{
        if(err){
            out(err);
            return;;
        }
        

        if(idx === this.stack.length){
            console.log("没有执行")
            out();
            return;
        }
        let layer = this.stack[idx++];
        if(layer.matchMethod(requestMethod)){
          
            // 如果匹配就执行实际的回调函数
          // console.log("匹配累。。。。",requestPath);
            layer.handler_request(req, res, next);
        }else{
            // 如果不匹配就再取出下面一小层
            next();
        }
    }
    next();
}

module.exports = Route;