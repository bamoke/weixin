// pages/resume/detail/index.js
import util from '../../../utils/util';
import {
  expArr,
  eduArr,
  sexArr
} from '../../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    resumeId:null,
    expArr,
    eduArr,
    sexArr,
    baseInfo: {},
    work: [],
    edu: [],
    introduce: ''
  },

  /**
   * Action
   */
  editBase: function() {
    const baseInfo = this.data.baseInfo
    const data = {
      id: baseInfo.id,
      realname: baseInfo.realname,
      sex: baseInfo.sex,
      birth: baseInfo.birth,
      edu: baseInfo.edu,
      experince: baseInfo.experince,
      phone: baseInfo.phone,
      email: baseInfo.email,
      city: baseInfo.city
    }
    wx.setStorageSync("getResumeData", data)
    wx.navigateTo({
      url: '../base/index?type=edit',
    })
  },
  addItem: function(e) {
    const type = e.currentTarget.dataset.type
    var itemData = this.data[type]
    var pageUrl;
    if (itemData.length >= 5) {
      wx.showToast({
        title: '最多添加五条记录',
        image: "/static/images/icon-error.png"
      })
      return
    }
    if (type == 'edu') {
      pageUrl = "../edu/index"
    } else if (type == 'work') {
      pageUrl = "../work/index"
    }
    wx.navigateTo({
      url: pageUrl + "?type=create",
    })
  },
  editItem: function(e) {
    const type = e.currentTarget.dataset.type
    const index = e.currentTarget.dataset.index
    var itemData = this.data[type][index]
    wx.setStorageSync("getResumeData", itemData)
    var pageUrl;
    if (type == 'edu') {
      pageUrl = "../edu/index"
    } else if (type == 'work') {
      pageUrl = "../work/index"
    }
    wx.navigateTo({
      url: pageUrl + "?type=edit",
    })
  },
  editIntroduce: function() {
    const introduce = this.data.introduce
    wx.setStorageSync("getResumeData", {
      introduce
    })
    wx.navigateTo({
      url: '../introduce/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.showNavigationBarLoading()
    const resumeId = wx.getStorageSync("resumeId")
    const requestParams = {
      apiUrl: "/Resume/detail",
      requestMethod: "GET",
      requestData: { id: resumeId},
      isShowLoad:false
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      wx.hideNavigationBarLoading()
      this.setData({
        showPage:true,
        baseInfo: res.data.base,
        edu: res.data.edu,
        work: res.data.work,
        introduce: res.data.introduce
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // wx.removeStorageSync("resumeData")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})