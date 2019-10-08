module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: ["./src/theme"]
      }
    }
  },
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
            //比如请求127.0.0.1/api/user的时候会自动转发到
          // http://127.0.0.1:3000/aip.user
            target: "http://127.0.0.1:3000/",
          //hangeOrigin默认是false：请求头中host仍然是浏览器发送过来的host,
          // 如果设置成true：发送请求头中host会设置成target·
            changeOrigin: true,

            // pathRewrite:{
            //   //意思是用value代替/api,比如http://127.0.0.1/api/user.json
            //   // 会转为http://127.0.0.1//static/mock/user.json
            //   '^/api':'/static/mock'
            //  }
        }
      },
      // before(app) {
      //   // 模拟后台服务器express
      //   app.get("/api/login", function(req, res) {
      //     const { username, passwd } = req.query;
      //     console.log(username, passwd);

      //     if (username == "kaikeba" && passwd == "123") {
      //       res.json({ code: 1, token: "jilei" });
      //     } else {
      //       res.status(401).json({ code: 0, message: "用户名或者密码错误" });
      //     }
      //   });

      //   // 保护接口中间件
      //   function auth(req, res, next) {
      //     if (req.headers.token) {
      //       // 已认证
      //       next()
      //     } else {
      //       // 用户未授权
      //       res.sendStatus(401)
      //     }
      //   }

      //   // 获取登录用户信息
      //   app.get("/api/userinfo", auth, function(req, res) {
      //     res.json({ code: 1, data: { name: "tom", age: 20 } });
      //   });
      // }
    }
  }
};
