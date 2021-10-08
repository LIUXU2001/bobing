
const PLAYER1 = wx.cloud.database().collection("player_notReady");
const PLAYER2 = wx.cloud.database().collection("player_ready");
const PLAYER3 = wx.cloud.database().collection("player_done");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userState: false,
    roomState: 0,//表示房间中未准备的人数
    isDone: false,
    roomIsDone:false,
    userinfo:'',
    result:"状元",
    player3Num:0,
    temp1:0,
    temp2:0,
    showsRollDice: true,
    showResult:true,
    showMember:true,
    showList:true,
    showPrize:true,
    showRule:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    var info = wx.getStorageSync('userInfo')
		this.setData({
      userinfo:info
    }) 


    PLAYER3.watch({
      onChange: snapshot=> {
        
        console.log(snapshot.type)
       
        if (snapshot.type != 'init') { 
          PLAYER3.count({
            success: function(res) {
              //console.log(res.total)
              _this.setData({
                temp1:res.total
              })
              PLAYER2.count({
                success: function(res) {
                  //console.log(res.total)
                  _this.setData({
                    temp2:res.total
                  })
                  if (_this.data.temp1==_this.data.temp2) {
                    wx.showToast({
                      title: '所有人都摇完了',
                      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
                      duration: 2000     
                    }) 
                  }
                },
                fail: console.error
              })
            },
            fail: console.error
          })
          
          
          
        }
      },
      onError: err=> {
        console.error('the watch closed because of error', err)
      }

    })
     
  },
  
  
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _this = this
    PLAYER1.watch({
        onChange: snapshot=> {
          PLAYER1.count({
            success: function(res) {
              //console.log(res.total)
              _this.setData({
                roomState:res.total
              })

            },
            fail: console.error
          })
          
        },
        onError: err=> {
          console.error('the watch closed because of error', err)
        }
      })

      
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
   
    if (this.data.userState) {
      PLAYER2.doc(this.data.userinfo.openId).remove({})
      //PLAYER3.doc(this.data.userinfo.openId).remove({})
    } else {
      PLAYER1.doc(this.data.userinfo.openId).remove({})
    }
    

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

  getReady()
  {
    if (!this.data.userState) {
      this.setData({
        userState:true,
      })
      
      PLAYER1.doc(this.data.userinfo.openId).remove({})
      var info = wx.getStorageSync('userInfo')
      PLAYER2.add({
        data: {
          _id: info.openId,
          info,
        }
      })
      
      

    } else {
      this.setData({
        userState:false,
      })
      
      PLAYER2.doc(this.data.userinfo.openId).remove({})
      var info = wx.getStorageSync('userInfo')
      PLAYER1.add({
        data: {
          _id: info.openId,
          info,
        }
      })

    }
   
  },

  userList(){
    wx.navigateTo({
 
      url: '/pages/userList/userList',
       
      })
  },
  awardList(){
    wx.navigateTo({
 
      url: '/pages/awardList/awardList',
       
      })
  },

  rollDice(){
    const _this=this
    if (this.data.roomState==0) {
      if (!this.data.isDone) {

        wx.showToast({
          title: '你博到了状元！',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        }) 

        PLAYER2.doc(this.data.userinfo.openId).remove({})
        var info = wx.getStorageSync('userInfo')
        var temp = this.data.result
        console.log(temp)
        PLAYER3.add({
        data: {
          _id: info.openId,
          info,
          temp
        }
      })
        _this.setData({
          isDone:true
        })
      } else {
        wx.showToast({
          title: '你这一轮已经摇过了',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        }) 
        this.setData({
          showResult: true,

       })
      }
      


    } else {
      wx.showToast({
        title: '还有人没有准备',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000 
			})
    }
  },


  click: function () {
    this.setData({
      showsRollDice: false,
    })
  },
  close: function () {
    this.setData({
      showsRollDice: true,
    })
  },

  // 规则
  clickRule: function () {
    this.setData({
      showRule: false,
    })
  },
  closeRule: function () {
    this.setData({
      showRule: true,
    })
  },

  // 奖品
  clickPrize: function () {
    this.setData({
      showPrize: false,
    })
  },
  closePrize: function () {
    this.setData({
      showPrize: true,
    })
  },

    // 显示结果
  // clickResult: function () {
  //   this.setData({
  //     showResult: false,
  //   })
  // },
   closeResult: function () {
     this.setData({
       showResult: true,
       showsRollDice: true,
    })
   },

   clickResult:function()
  {
    
    const _this=this
    if (this.data.roomState==0) {
      if (!this.data.isDone) {

        var temp="没中奖"
        //存储每个点数的个数
        var num1=0
        var   num2=0
        var   num3=0
        var    num4=0
        var   num5=0
        var   num6=0
        
        //  存储当前随机数组
        var NumberArr = [];
         
        //  生成随机数据
        var a = Math.floor(Math.random() * 6) + 1,
            b = Math.floor(Math.random() * 6) + 1,
            c = Math.floor(Math.random() * 6) + 1,
            d = Math.floor(Math.random() * 6) + 1,
            e = Math.floor(Math.random() * 6) + 1,
            f = Math.floor(Math.random() * 6) + 1;
        
        // 数据进入数组，排序
        NumberArr.push(a, b, c, d, e, f);
        NumberArr.sort();
        
        //统计点数个数
        for (var i = 0; i < NumberArr.length; i++){
          if (NumberArr[i] == 1)num1++;
          else if(NumberArr[i] == 2)num2++;
          else if(NumberArr[i] == 3)num3++;
          else if(NumberArr[i] == 4)num4++;
          else if(NumberArr[i] == 5)num5++;
          else if(NumberArr[i] == 6)num6++;
        }
        
        if (num4==4&&num1==2) {
          temp="状元插金花"
        }else if(num4==6){
          temp="六杯红"
        }else if(num1==6){
          temp="遍地锦"
        }else if(num2==6||num3==6||num5==6||num6==6){
          temp="六杯黑"
        }else if(num4==5){
          temp="五王"
        }else if(num1==5||num2==5||num5==5||num6==5||num3==5){
          temp="五子登科"
        }else if(num4==4){
          temp="状元"
        }else if(num1==1&&num2==1&&num5==1&&num6==1&&num3==1&&num4==1){
          temp="对堂"
        }else if(num4==3){
          temp="三红"
        }else if(num1==4||num2==4||num5==4||num6==4||num3==4){
          temp="四进"
        }else if(num4==2){
          temp="二举"
        }else if(num4==1){
          temp="一秀"
        }else{
          temp='继续加油'
        }
        this.setData({
          showResult: false,
          result:temp
        })



        //PLAYER2.doc(this.data.userinfo.openId).remove({})
        var info = wx.getStorageSync('userInfo')
        PLAYER3.add({
        data: {
          _id: info.openId,
          info,
          temp
        }
      })
        _this.setData({
          isDone:true
        })
      } else {
        wx.showToast({
          title: '你这一轮已经摇过了',
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000     
        }) 
        this.setData({
          showsRollDice: true,
       })
      }
    } else {
      wx.showToast({
        title: '还有人没有准备',
        icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
        duration: 2000 
      })
      this.setData({
        showsRollDice: true,
     })
    }
    
    

  }

})