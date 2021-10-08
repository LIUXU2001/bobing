// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const DB = cloud.database().collection("user_info");
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = cloud.getWXContext().OPENID
  const userInfo = event.userInfo;
  var openId = {};
  openId = {
    'openId': openid
  }
  var new_userInfo = {
    ...userInfo,
    ...openId
  }

  await DB.add({
    data: new_userInfo
  })

  return await DB.where({
    'openId': openid
  }).get()

}