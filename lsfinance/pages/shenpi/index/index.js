// pages/work/fybx/index.js
const app = getApp();
const cateArr = [{
  name: "报销",
  type: "1"
}/* , {
  name: "借支",
  type: "2"
} */]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateArr: cateArr,
    curNavIndex: 0,
    pageShow: true,
    pageInfo: {},
    list: []
  },

  /**
   * Methods
   */
  changeCate(e){
    const newIndex = parseInt(e.detail.index)
    const requestParams = {
      apiUrl: "/Shenpi/vlist",
      requestData: {
        type: cateArr[newIndex].type
      }
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        curNavIndex: newIndex,
        list: data.list,
        pageInfo: data.pageInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {

    const requestParams = {
      apiUrl: "/Shenpi/vlist"
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        showPage: true,
        list: data.list,
        pageInfo: data.pageInfo
      })
    })

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const navIndex = this.data.curNavIndex
    const requestParams = {
      apiUrl: "/Shenpi/vlist",
      requestData: {
        type: cateArr[navIndex].type
      }
    }
    app.ajax(requestParams).then((data) => {
      wx.stopPullDownRefresh();
      this.setData({
        list: data.list,
        pageInfo: data.pageInfo
      })
    })
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var oldList = this.data.list
    var pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }
    const requestParams = {
      apiUrl: "/Shenpi/vlist",
      requestData: {
        page: parseInt(pageInfo.page) + 1,
        type: cateArr[this.data.curNavIndex].type
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: oldList.concat(res.list),
        pageInfo: res.pageInfo
      })
    })
  }

})