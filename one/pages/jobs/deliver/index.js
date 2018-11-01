// pages/jobs/deliver/index.js
import util from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    isCompleted:false,
    jobId:null,
    resume:{}
  },

  /**
   * Action
   */

  goDeliver:function(){
    let data = {
      jobid:this.data.jobId,
      resumeid: this.data.resume.id
    }
    if(this.data.resume.completion < 80 ) {
      wx.showModal({
        content: '请完善简历后再投递,现在去完善简历?',
        success:function(res){
          if(res.confirm){
            wx.redirectTo({
              url: '/pages/resume/index/index?'
            })
          }
        }
      })
      return
    }
    const requestParams = {
      apiUrl:"/Deliver/doit",
      requestData: data,
      requestMethod:"GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res=>{
      this.setData({
        isCompleted: true
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const jobId = options.jobid
    this.setData({
      jobId,
      showPage:true
    })
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
      apiUrl: '/Resume/index'
    }
    var ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res=>{
      this.setData({
        resume:res.data.info
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  }

})