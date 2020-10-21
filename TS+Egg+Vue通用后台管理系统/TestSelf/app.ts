const Koa = require('koa');
const app = new Koa();
import value = require('./testexport')
import index from './routers/index'

 

// response
// app.use((ctx:any) => {
//     ctx.body = 'Hello Koa';
// });

app.use(index.routes())

app.listen(3000, ()=>{
    console.log('listen 3000 OK');
});
console.log(value)
