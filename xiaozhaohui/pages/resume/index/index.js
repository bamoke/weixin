// pages/resume/index/index.js
import util from '../../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    typeList: ["请选择","在线简历","附件简历"],
    curType: 1,
    resumeId:null,
    resumeAttachment: ''
  },

  /**
   * Action
   */
  createResume:function(){
    wx.redirectTo({
      url: '../base/index?type=create'
    })
  },
  bindTypeChange:function(e){
    const index = parseInt(e.detail.value)
    if(index === 0) return;
    if(index == 2 && this.data.resumeAttachment == ''){
      wx.showToast({
        title: '附件简历未上传',
        image: '/static/images/icon-error.png'
      })
      return
    }
    this.setData({
      curType:parseInt(e.detail.value)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const requestParams = {
      apiUrl: '/Resume/index',
      isShowLoad:false
    }
    var res = util.request(requestParams)
    res.then(res => {
      if (res.data.info === null) {
        this.setData({ showPage: true })
        return
      }
      var updateData = {
        showPage: true,
        resumeId:res.data.info.id,
        completion: res.data.info.completion,
        curType: parseInt(res.data.info.default_set)
      }
  
      if (res.data.info.attachment !== '') {
        updateData.resumeAttachment = res.data.info.attachment
      }
      this.setData({ ...updateData })
    })
  }



 
})