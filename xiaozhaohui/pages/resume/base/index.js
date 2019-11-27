// pages/resume/base/index.js
const app = getApp()
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
    acType: '',
    handleText: '',
    isSubmiting: false,
    id: null,
    realname: '',
    birth: "",
    sex: 0,
    edu: 0,
    experince: 0,
    phone: '',
    email: '',
    sexArr,
    eduArr,
    expArr
  },

  /**
   * Action
   */
  bindBirthChange: function(e) {
    const value = e.detail.value
    this.setData({
      birth: value
    })
  },
  bindSexChange: function(e) {
    const value = e.detail.value
    this.setData({
      sex: parseInt(value)
    })
  },
  bindEduChange: function(e) {
    const value = e.detail.value
    this.setData({
      edu: parseInt(value)
    })
  },
  bindExpChange: function(e) {
    const value = e.detail.value
    this.setData({
      experince: parseInt(value)
    })
  },
  // submit
  submitForm: function(e) {
    const _that = this
    if (this.data.isSubmiting) return;
    const formData = e.detail.value
    // validate
    if (formData.realname == '') {
      this._showError("请填写姓名")
      return
    }
    if (this.data.sex == 0) {
      this._showError("请选择性别")
      return
    }
    if (this.data.birth == '') {
      this._showError("请选择出生年月")
      return
    }
    if (formData.phone == '') {
      this._showError("请填写手机号")
      return
    }
    if (formData.last_school == '') {
      this._showError("请填写毕业院校")
      return
    }
    formData.id = this.data.id
    formData.sex = this.data.sex
    formData.birth = this.data.birth
    formData.edu = this.data.edu
    formData.experince = this.data.experince
    const apiUrl = this.data.acType == 'edit' ? "/Resume/save/type/base/id/" + this.data.id : "/Resume/create_resume"
    const requestParams = {
      apiUrl: apiUrl,
      requestMethod: 'POST',
      requestData: formData
    }
    this.setData({
      isSubmiting: true
    })
    app.ajax(requestParams).then(data => {
      wx.showToast({
        title: '保存成功',
      })
      setTimeout(function() {
        if (_that.data.acType == 'create') {
          wx.setStorageSync("resumeId", data.info.id)
          wx.redirectTo({
            url: '../index/index'
          })
        } else {
          wx.navigateBack()
        }
      }, 500)
    })
  },
  _showError: function(msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var acType = options.type
    var handleText = "保存"
    if (acType == 'create') {
      handleText = "创建"
    }
    this.setData({
      handleText,
      acType
    })


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
    if(this.data.acType == 'create'){
      let userInfo = wx.getStorageSync("user") || {phone:""}
      this.setData({
        phone: userInfo.phone
      })
    }else {
      const requestParams = {
        apiUrl: "/Resume/fetch_data",
        requestData: {type:"base"},
        requestMethod: 'get'
      }
      app.ajax(requestParams).then(res=>{
        this.setData({...res.data})
      })
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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

  }
})