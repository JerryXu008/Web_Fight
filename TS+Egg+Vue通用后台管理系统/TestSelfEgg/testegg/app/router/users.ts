module.exports = (app)=>{
    app.router.get('/api/v1/users', app.controller.users.index);
    app.router.post('/api/v1/users', app.controller.users.create);
    app.router.delete('/api/v1/users/:id', app.controller.users.destroy);
  
  
    app.router.put('/api/v1/users/:id', app.controller.users.update);
     // 上传头像
     app.router.post('/api/v1/posts', app.controller.users.posts);
    //导入用户，上传excel
    app.router.post('/api/v1/importUser', app.controller.users.importUser);
    
    //导出用户
    app.router.get('/api/v1/exportUser', app.controller.users.exportUser);
  
}
