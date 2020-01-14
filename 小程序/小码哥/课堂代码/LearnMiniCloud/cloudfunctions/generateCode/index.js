// 云函数入口文件
const cloud = require('wx-server-sdk');
// ES6对象的解构
// const utils = require("wx-js-utils");
// const WXMINIUser = utils.WXMINIUser;
// const WXMINIQR = utils.WXMINIQR;
const {WXMINIUser, WXMINIQR} = require("wx-js-utils");

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 1.获取access_token
  const user = new WXMINIUser({
    appId: "wx44a8878d2bb8c7d8",
    secret: "49f37e175dd9f607909c87890669f10f"
  })
  const access_token = await user.getAccessToken();

  // 2.获取小程序码
  const qr = new WXMINIQR();
  const qrCode = await qr.getMiniQRLimit({
    access_token: access_token,
    path: "pages/index/index"
  });

  // 3.将小程序码的图片上传到云存储中
  return cloud.uploadFile({
    cloudPath: "images/minicode.png",
    fileContent: qrCode
  })
}