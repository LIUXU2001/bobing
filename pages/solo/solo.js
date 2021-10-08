Page({
  data: {
    // 一开始遮罩层与面板隐藏
    showsRollDice: true,
    showResult:true,
    showMember:true,
    showList:true,
    showPrize:true,
    showRule:true,
  },

  // 摇色子
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
  clickResult: function () {
    this.setData({
      showResult: false,
    })
  },
  closeResult: function () {
    this.setData({
      showResult: true,
      showsRollDice: true,
    })
  },
})