// pages/userList/userList.js
const PLAYER1 = wx.cloud.database().collection("player_notReady");
const PLAYER2 = wx.cloud.database().collection("player_ready");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList1:[],
    userList2:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    PLAYER1.get({
      success(res) {
        console.log(res.data)
        _this.setData({
          userList1: res.data
        })
      }
    })
    PLAYER2.get({
      success(res) {
        console.log(res.data)
        _this.setData({
          userList2: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})