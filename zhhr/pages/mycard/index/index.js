//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: false,
    cardInfo: {}
  },
  //事件处理函数
  onShow: function() {
    let requestParams = {
      apiUrl: '/Mycard/index',
      requestData: {}
    }

    app.ajax(requestParams).then(res => {
      let updateData = {
        cardInfo: res.data.cardInfo,
        showPage : true
      }
      if (res.data.cardInfo.id) {
        updateData.isCollected = res.data.isCollected,
        updateData.isLike = res.data.isLike,
        updateData.collectedTotal = res.data.collectedTotal,
        updateData.likeTotal = res.data.likeTotal
      }
      this.setData({...updateData})
    })
  },
  onShareAppMessage: function(res) {
    const cardId = this.data.cardInfo.id
    if (res.from === 'button') {
      return {
        title: '您好！这是我的名片，请惠存',
        path: '/pages/mycard/detail/index?id=' + cardId +"&from=share"
      }
    }

  }

})