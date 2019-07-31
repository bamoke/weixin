// 费用支出
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    curPage: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const requestParams = {
      apiUrl: "/Expend/vlist"
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        list: data.list,
        curPage: data.page,
        hasMore: data.hasMore
      })
    }).catch(function (msg) {
      /*       setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000) */
    })

  }

})