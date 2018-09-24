// pages/resume/base/index.js
import util from '../../../utils/util'
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
    handleText: '提交',
    isSubmiting: false,
    jobId: null,
    realname: '',
    birth: "",
    sex: 0,
    edu: 0,
    experince: 0,
    phone: '',
    email: '',
    introduce:'',
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
  bindContentChange: function (e) {
    const value = e.detail.value
    this.setData({
      introduce: value
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
    formData.jobid = this.data.jobId
    formData.sex = this.data.sex
    formData.birth = this.data.birth
    formData.edu = this.data.edu
    formData.experince = this.data.experince
    formData.introduce = this.data.introduce
    const apiUrl = "/Jobs/accept"
    const requestParams = {
      apiUrl: apiUrl,
      requestMethod: 'POST',
      requestData: formData
    }
    this.setData({
      isSubmiting: true
    })
    const request = util.request(requestParams)
    request.then(res => {
      wx.showModal({
        content: '提交成功,请等待工作人员审核。通过审核后我们将和您取得联系并商谈后续事宜，感谢您的支持！',
        showCancel:false,
        success:function(){
          wx.navigateBack()
        }
      })
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
    const jobId = options.jobid
    this.setData({jobId})

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