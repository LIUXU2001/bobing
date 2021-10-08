// app.js
App({
  onLaunch() {
    // 云开发初始化
    wx.cloud.init({
      env: 'cloud1-9g397egc101dc34f'
    })
  },
  
  
  globalData: {
    userInfo: null
  },
  
})
