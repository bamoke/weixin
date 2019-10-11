// pages/jobs/deliver/index.js
import util from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    isCompleted:false,
    resumeId:null,
    resumeAttachment:'',
    curSelected:1
  },

  /**
   * Action
   */
  selecteResume:function(e){
    const index= e.currentTarget.dataset.index;
    if((index==1 && !this.data.resumeId) || (index==2 && this.data.resumeAttachment == '')){
      return
    }
    this.setData({
      curSelected: parseInt(index)
    })
  },

  goDeliver:function(){
    let data = {
      type: this.data.curSelected,
      jobid:this.data.jobId,
      resumeid: this.data.resumeId
    }
    console.log(data)
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
    const jobId = options.jid
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
        resumeId: parseInt(res.data.info.id),
        resumeAttachment: res.data.info.attachment,
        curSelected: parseInt(res.data.info.default_set)       
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