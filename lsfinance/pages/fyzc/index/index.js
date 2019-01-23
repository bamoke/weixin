// 费用支出
import util from '../../../utils/util';
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
    const orgInfo = wx.getStorageSync("orgInfo")
    if (!orgInfo) {
      wx.showToast({
        title: '访问数据错误',
        image: "/static/images/icon-error.png"
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
 

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var orgInfo = wx.getStorageSync("orgInfo");
    const requestParams = {
      apiUrl: "/Expend/vlist",
      requestData: {
        orgid: orgInfo.orgid
      }
    }
    util.request(requestParams).then((data) => {
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