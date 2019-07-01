// pages/work/fybx/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow: true,
    curPage: 1,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const orgInfo = wx.getStorageSync("orgInfo")
    if (!orgInfo) {
      wx.showToast({
        title: '访问数据错误',
        image:"/static/images/icon-error.png"
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
    /*     var list = [
          {
            "num":"BX0001",
            "description":"6月伙食费5w44酒啊就开始网站备案域名核验要求通知",
            "status":"未审核",
            "time":"2018-07-01",
            "amount":"20158.47"
          },
          {
            "num": "BX0002",
            "description": "5月伙食费",
            "status": "已审核",
            "time": "2018-06-01",
            "amount": "981.04"
          },
        ]
        this.setData({
          pageShow:true,
          list:list
        }) */

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var orgInfo = wx.getStorageSync("orgInfo");
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
        orgid: orgInfo.orgid
      }
    }
    util.request(requestParams).then((data) => {
      this.setData({
        list:data.list,
        curPage:data.page,
        hasMore:data.hasMore
      })
    }).catch(function(msg) {
/*       setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000) */
    })

  }

})