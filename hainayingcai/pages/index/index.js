//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showPage: false,
    pageInfo:{},
    fairs:[],
    banner:[],
    zhhrzph:null
  },
  noContent(){
    wx.showToast({
      title: '功能开发中……',
      icon:"none"
    })
  },
  /**
  * 跳转
  */
  jumpMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wx3033d010a1183484',
      path: '/pages/index/index',
      // envVersion: 'trial',
      envVersion: 'release',
      success(res) {
        // 打开成功
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  //事件处理函数

  onLoad: function() {
    const params = {
      apiUrl:"/Index/index",
      requestMethod:"GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res=>{
      this.setData({
        showPage:true,
        banner:res.data.banner,
        fairs: res.data.fairs,
        pageInfo: res.data.pageInfo,
        zhhrzph:res.data.zhhrzph
      })

    })
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    const requestParams = {
      apiUrl: "/Index/index",
      isShowLoad:false
    }
    app.ajax(requestParams).then((res) => {
      wx.stopPullDownRefresh();
      this.setData({
        zhhrzph:res.data.zhhrzph,
        banner: res.data.banner,
        fairs: res.data.fairs,
        pageInfo: res.data.pageInfo
      })
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var oldList = this.data.fairs
    var pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }
    const requestParams = {
      apiUrl: "/Index/fairs",
      requestData: {
        page: parseInt(pageInfo.page) + 1
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        fairs: oldList.concat(res.data.fairs),
        pageInfo: res.data.pageInfo
      })
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})