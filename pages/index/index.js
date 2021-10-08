// 获取数据库
const DB = wx.cloud.database().collection("user_info");
const PLAYER1 = wx.cloud.database().collection("player_notReady"); // 取集合
const PLAYER2 = wx.cloud.database().collection("player_ready");
const PLAYER3 = wx.cloud.database().collection("player_done");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
     user:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let that = this;
		// 判断用户是否授权过
		wx.getSetting({
			complete: (res) => {
				if (res.errMsg == "getSetting:ok") {
					var info = wx.getStorageSync('userInfo')
					if (info) {
						wx.showToast({
							title: '登陆成功'
            })
            this.setData({
              user : info
            })
						// wx.switchTab({
						// 	url: '../me/index',
						// })

					}

				} else {
					wx.showToast({
						title: '请先登陆'
					})
				}
			},
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

	},
	// 点击登陆
	login() {
		const _this = this
		wx.getUserProfile({
			desc: '用于完善资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: (res) => {
				let userInfo = res.userInfo
				console.log(res.userInfo)
					if (userInfo) {
						wx.cloud.callFunction({
							name: 'getOpenid',
							complete: res => {
								// 查询结果不存在
								if (res.result.data.length == 0) {
									
									console.log("查询到用户未注册,即将为用户产生注册操作")
									wx.cloud.callFunction({
										name: 'register',
										data: {
											'userInfo': userInfo
										},
										complete: res => {
											console.log(res)
											console.log("用户注册成功,即将产生登陆操作")
											wx.setStorageSync('userInfo', res.result.data[0])
											wx.showToast({
												title: '登陆成功'
											})
											
											// 判断用户是否授权过
											wx.getSetting({
												complete: (res) => {
													if (res.errMsg == "getSetting:ok") {
														var info = wx.getStorageSync('userInfo')
														if (info) {
															this.setData({
																user : info
															})
														}
													} 
												},
											})                      
										}
										
									})
									

									
									// 判断用户是否授权过
									wx.getSetting({
										complete: (res) => {
											if (res.errMsg == "getSetting:ok") {
												var info = wx.getStorageSync('userInfo')
												if (info) {	
													_this.setData({
														user : info
													})
												}
							
											} 
										},
									})



									// 查询结果存在
								} else if (res.result.data.length != 0) {
									console.log(res)
									console.log("查询到用户已经授权注册,数据库查询到信息,即将直接产生登陆操作")
									wx.setStorageSync('userInfo', res.result.data[0])
									// 判断用户是否授权过
									wx.getSetting({
										complete: (res) => {
											if (res.errMsg == "getSetting:ok") {
												var info = wx.getStorageSync('userInfo')
												if (info) {
													
													this.setData({
														user : info
													})
												}
							
											} 
										},
									})									
									wx.showToast({
										title: '登陆成功'
                  })
                  
									// wx.switchTab({
									// 	url: '../me/index',
									// })
								}
			
			
							}
						})
			
					} else {
						wx.showToast({
							title: '登陆异常',
							icon: "none"
						})
					}
					
			}
	})

		
		
  },
  
  playGame(){
		
		PLAYER1.doc(this.data.user.openId).remove({
			success(res) {
				//console.log("删了")
			}
		})
		PLAYER2.doc(this.data.user.openId).remove({
			success(res) {
				//console.log("删了")
			}
		})
		PLAYER3.doc(this.data.user.openId).remove({
			success(res) {
				//console.log("删了")
			}
		})

		wx.getSetting({
			complete: (res) => {
				if (res.errMsg == "getSetting:ok") {
					var info = wx.getStorageSync('userInfo')
					//console.log(info)
					if (info) {
						PLAYER1.add({
							data: {
								_id: info.openId,
								info,
							}
						})
					}
				} else {
					wx.showToast({
						title: '请先登陆'
					})
				}
			},
		})
		
		if (this.data.user) {
				
			wx.navigateTo({
				url: '/pages/playGame/playGame',
				})
		} else {
			wx.showToast({
				title: '请先登陆'
			})
		}
	
	
  },

  aboutUs(){
    wx.redirectTo({
      url: '../solo/solo',
    })
  }
})


