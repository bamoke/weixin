// pages/resume/work/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSubmiting:false,
    acType: '',
    resumeId:null,
    id: null,
    company: '',
    position: '',
    start_time: '',
    end_time: '',
    content: ""
  },
  /**
   * Action
   */
  deleteItem:function(){
    const _that = this
    wx.showModal({
      content: '确认删除此项经历吗？',
      success:function(res){
        if(res.confirm){
         _that._delete()
        }
      }
    })
  },
  // delete
  _delete:function(){
    let requestParams = {
      apiUrl: "/Resume/delete_item",
      requestData: {
        id:this.data.id,
        type: "work"
      },
      requestMethod:"GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res=>{
      wx.showToast({
        title: '删除成功',
      })
      setTimeout(function(){
        wx.navigateBack()
      },500)
    })
  },
  bindStartTimeChange: function (e) {
    const value = e.detail.value
    this.setData({
      start_time: value
    })
  },
  bindEndTimeChange: function (e) {
    const value = e.detail.value
    this.setData({
      end_time: value
    })
  },
  bindContentChange:function(e){
    const value = e.detail.value
    this.setData({
      content:value
    })
  },
  // submit
  submitForm: function (e) {
    if (this.data.isSubmiting) return;
    const formData = e.detail.value
    const resumeId = this.data.resumeId
    var apiUrl;
    formData.rid = resumeId
    formData.start_time = this.data.start_time
    formData.end_time = this.data.end_time
    formData.content = this.data.content
    if (formData.company == '') {
      this._showError("请填写公司名称")
      return
    }
    if (formData.position == '') {
      this._showError("请填写工作岗位")
      return
    }
    if (formData.start_time == '') {
      this._showError("请选择入职年月")
      return
    }
    if (formData.end_time == '') {
      this._showError("请选择离职年月")
      return
    }
    if (Date.parse(formData.end_time) < Date.parse(formData.start_time)) {
      this._showError("离职年月不能小于入职年月")
      return
    }

    if (this.data.acType == 'create') {
      apiUrl = "/Resume/add_work"
    } else {
      apiUrl = "/Resume/save/type/work/id/" + this.data.id
    }
    const requestParams = {
      apiUrl,
      requestMethod: "POST",
      requestData: formData
    }
    this.setData({ isSubmiting: true })
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      wx.showToast({
        title: '保存成功',
      })
      setTimeout(function () {
        wx.navigateBack()
      }, 500)
    })

  },
  _showError: function (msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const acType = options.type
    if (acType == 'create') {
      this.setData({
        acType,
        resumeId:options.rid
      })
      return
    }
    const info = wx.getStorageSync("getResumeData")
    this.setData({
      acType,
      resumeId: options.rid,
      ...info
    })
  }


})