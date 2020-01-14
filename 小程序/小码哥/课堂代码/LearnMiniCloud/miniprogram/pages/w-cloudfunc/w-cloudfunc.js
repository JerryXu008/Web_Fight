// pages/w-cloudfunc/w-cloudfunc.js
Page({
  data: {
    fileID: ""
  },
  basicUsing: function() {
    const num1 = 100;
    const num2 = 230;

    // 如何调用云函数
    wx.cloud.callFunction({
      name: "sum", // 调用哪一个云函数
      data: { // 要给云函数传递的参数
        num1,
        num2
      }
    }).then(res => {
      console.log(res)
    })
  },

  getOpenID: function() {
    wx.cloud.callFunction({
      name: "login"
    }).then(res => {
      console.log(res)
    })
  },

  removeMultidata: function() {
    wx.cloud.callFunction({
      name: "removeMultidata"
    }).then(res => {
      console.log(res)
    })
  },

  generateCode: function() {
    wx.cloud.callFunction({
      name: "generateCode"
    }).then(res => {
      this.setData({fileID: res.result.fileID})
    })
  },

  // formid必须是真机上才是有消息
  formSubmit: function(event) {
    // 1.取出formId
    const formId = event.detail.formId;

    // 2.
    wx.cloud.callFunction({
      name: "sendTemplate",
      data: {
        formId
      }
    }).then(res => {
      console.log(res)
    })
  }
})