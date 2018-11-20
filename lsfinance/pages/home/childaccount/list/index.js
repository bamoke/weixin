// pages/home/childaccount/list/index.js
import util from '../../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    memberList:[]
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showNavigationBarLoading()
    const requestParams = {
      apiUrl: "/ChildAccount/vlist",
      isShowLoad:false
    }
    util.request(requestParams).then(res => {
      wx.hideNavigationBarLoading()
      this.setData({
        showPage:true,
        memberList:res.list
      })
    })
  }
})