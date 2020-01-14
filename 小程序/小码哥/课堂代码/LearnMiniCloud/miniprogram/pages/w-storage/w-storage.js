// pages/w-storage/w-storage.js
Page({
  data: {
    imgFileID: "",
    videoFileID: "",
    localFilePath: "http://tmp/wx44a8878d2bb8c7d8.o6zAJs6HWnjK2wxnenhV8l3gPths.ctwqJttGj3NF52762b4f5657c9f647cb7f6f97b91575.mp4"
  },
  uploadFile: function() {
    // 1.用户选择一张图片（拍照、相册）
    wx.chooseImage({
      success: (res) => {
        // 2.获取选中图片的路径
        const filePath = res.tempFilePaths[0]

        // 3.上传图片到云存储中
        const timestamp = new Date().getTime();
        const openid = "123fdafdsaf";
        const cloudPath = `lrc/${timestamp}_${openid}.png`;
        wx.cloud.uploadFile({
          filePath, // 要上传的图片路径
          cloudPath, // 上传到cloud的什么位置
        }).then(res => {
          const fileID = res.fileID;
          this.setData({imgFileID: fileID})
        })
      },
    })
  },

  uploadVideo: function() {
    wx.chooseVideo({
      success: res => {
        const filePath = res.tempFilePath;
        wx.cloud.uploadFile({
          filePath,
          cloudPath: "videos/123.mp4"
        }).then(res => {
          this.setData({ videoFileID: res.fileID })
        })
      }
    })
  },

  getTempURL: function() {
    const fileid = "cloud://coderwhy-i7b7z.636f-coderwhy-i7b7z-1259322030/images/1574858242404_123fdafdsaf.png"
    wx.cloud.getTempFileURL({
      fileList: [fileid]
    }).then(res => {
      console.log(res)
    })
  },

  downloadVideoFile: function() {
    wx.cloud.downloadFile({
      fileID: "cloud://coderwhy-i7b7z.636f-coderwhy-i7b7z-1259322030/videos/123.mp4"
    }).then(res => {
      console.log(res)
    })
  },

  deleteFile: function() {
    const fileID = "cloud://coderwhy-i7b7z.636f-coderwhy-i7b7z-1259322030/videos/123.mp4"
    wx.cloud.deleteFile({
      fileList: [fileID]
    }).then(res => {
      console.log(res)
    })
  }
})