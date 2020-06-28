const url = require('url');
function queryMiddleware() {
   // console.log("...........看看执行了吗2222");
    return function (req, res, next) {

      //  console.log("...........看看执行了吗");


        let {pathname, query} =  url.parse(req.url, true);
        req.query = query;
        req.path = pathname;
        next();
    }
}
module.exports = queryMiddleware;