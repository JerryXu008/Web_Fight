// 云函数入口文件
const cloud = require('wx-server-sdk');
const { WXMINIUser, WXMINIMessage } = require('wx-js-utils');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  // 1.获取access_token
  const user = new WXMINIUser({
    appId: "wx44a8878d2bb8c7d8",
    secret: "49f37e175dd9f607909c87890669f10f"
  })
  const access_token = await user.getAccessToken();

  // 2.获取参数，发送消息模板
  const template_id = "jMe9FJZNcwjFjqEZm-jVAI34YPi_pn8coUyMr1n-vKM";
  const touser = cloud.getWXContext().OPENID;
  const form_id = event.formId;

  let wXMINIMessage = new WXMINIMessage();
  const result = await wXMINIMessage.sendMessage({
    access_token,
    touser,
    form_id,
    template_id,
    data: {
      keyword1: {
        value: "天豪大酒店"
      },
      keyword2: {
        value: "2019-11-30"
      },
      keyword3: {
        value: "￥888"
      },
      keyword4: {
        value: "科韵路天豪大酒店"
      },
    }
  })

  return result;
}