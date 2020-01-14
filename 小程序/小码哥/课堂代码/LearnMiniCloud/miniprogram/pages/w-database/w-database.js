// miniprogram/pages/w-database/w-database.js
// 1.获取数据库对象
const db = wx.cloud.database();

// 2.获取操作的集合
const collection = db.collection("students");

const LIMIT = 3;

Page({
  data: {
    page: 0,
    list: []
  },

  addDataToDB: function() {
    // 向集合中添加一条数据
    collection.add({
      data: {
        name: "tom",
        age: 28,
        height: 1.88,
        courses: ["现在经济", "统计学", "现代文学"],
        goodFriend: {
          name: "hanmeimei",
          age: 20
        },
        location: db.Geo.Point(100, 50),
        birth: new Date("1995-01-01")
      }
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },

  removeDataToDB: function() {
    // 精准删除
    // collection
    //   .doc("7c47f3615dd7e45e022b57387fba9e85") // 精准拿到某一个学生
    //   .remove()
    //   .then(res => {
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })

    // collection.where({
    //   age: 30
    // }).remove().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },

  updateDataToDB: function() {
    // update方法: 修改/添加某些字段
    // collection
    //   .doc("fe42f4e05dd7e29d022c08f70764e0dd")
    //   .update({
    //     data: {
    //       age: 30,
    //       score: 100
    //     }
    //   })
    //   .then(console.log)
    //   .catch(console.error)

    // set方法：直接替换对象
    // collection
    //   .doc("fe42f4e05dd7e29d022c08f70764e0dd")
    //   .set({
    //     data: {
    //       age: 30,
    //       score: 100
    //     }
    //   })
    //   .then(console.log)
    //   .catch(console.error)

    collection
      .where({
        name: "why"
      })
      .set({
        data: {
          age: 30,
          score: 100
        }
      })
      .then(console.log)
      .catch(console.error)
  },

  queryDataFromDB: function() {
    // 1.根据id精准查找数据
    // collection
    //   .doc("7d44a8205dd7e3cd022a8dc259fc726f")
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //   })

    // 2.根据条件查找where
    // collection
    //   .where({ age: 25 })
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //   })

    // 3.使用查询指令数据查询
    // const cmd = db.command;
    // collection
    //   .where({ age: cmd.gte(20) })
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //   })

    // 4.根据正则表达式获取数据
    // collection
    //   .where({ 
    //     name: db.RegExp({
    //       regexp: "^li.*",
    //       options: "i"
    //     }) 
    //   })
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //   })

    // 5.不跟任何的条件，直接查询整个集合
    // db.collection("teacher").get().then(res => {
    //   console.log(res)
    // }）

    // 6.几个字段的作用
    // field: 过滤只需要获取的字段
    // collection
    //   .field({
    //     name: true,
    //     age: true,
    //     height: true
    //   })
    //   .get()
    //   .then(res => {
    //     console.log(res)
    //   })

    // skip: 跳过多少条数据
    // limit: 本次获取多少条数据
    // orderBy: 
    console.log(this.data.page)
    db.collection("wzry")
      .skip(this.data.page * LIMIT).limit(LIMIT)
      .orderBy("rid", "asc")
      .get()
      .then(res => {
        this.data.page += 1;
        console.log(res)
      })
  },

  startChanging: function() {
    db.collection("chatroom").where({
      groupid: "110"
    }).watch({
      onChange: function(snap) {
        console.log(snap)
      },
      onError: function(err) {
        console.log(err)
      }
    })
  },

  sendMessage: function() {
    db.collection("chatroom").add({
      data: {
        groupid: "110",
        message: "吃饭了吗？"
      }
    }).then(res => {
      console.log(res)
    })
  }
})