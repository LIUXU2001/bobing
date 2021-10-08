const cloud = require('wx-server-sdk')
cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV
})
const DB = cloud.database()
exports.main = (event, context) => {
	const wxContext = cloud.getWXContext()
	const openid = wxContext.OPENID;
	try {
		return DB.collection('user_info').where({
			"openId": openid
		}).get()
	} catch (err) {
		console.log(err)
	}
}