// pages/resume/base/index.js
const app = getApp()
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
    edu: 1,
    phone: '',
    email: '',
    school:'',
    major:'',
    sexArr :["请选择", "男", "女"],
    eduArr :["大专", "本科", "硕士", "博士", "其他"]
  },

  /**
   * Action
   */
  bindBirthChange: function (e) {
    const value = e.detail.value
    this.setData({
      birth: value
    })
  },
  bindSexChange: function (e) {
    const value = e.detail.value
    this.setData({
      sex: parseInt(value)
    })
  },
  bindEduChange: function (e) {
    const value = e.detail.value
    this.setData({
      edu: parseInt(value)
    })
  },

  // submit
  submitForm: function(e) {
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    const _that = this
    if (this.data.isSubmiting) return;
    const formData = e.detail.value
    formData.sex = this.data.sex
    formData.birth = this.data.birth
    formData.edu = this.data.edu
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
    if (!phoneRe.test(formData.phone)) {
      return this._showError("手机号格式不正确")
    }
    if (formData.school == '') {
      this._showError("请填写毕业院校名称")
      return
    }
    if (formData.major == '') {
      this._showError("请填写专业名称")
      return
    }
    if (formData.intend == '') {
      this._showError("请填写求职意向")
      return
    }

    const apiUrl = this.data.id ? "/Resume/update/id/" + this.data.id : "/Resume/create"
    const requestParams = {
      apiUrl: apiUrl,
      requestMethod: 'POST',
      requestData: formData
    }
    this.setData({
      isSubmiting: true
    })
    const request = app.ajax(requestParams)
    request.then(res => {
      wx.showToast({
        title: '保存成功',
      })
      this.setData({
        isSubmiting: false
      })
      setTimeout(function () {
        wx.navigateBack()
      }, 500)

    })
  },
  _showError: function(msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error-fill-white.png"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let updateData = {
      showPage:true,
      handleText : "保存"
    }
    if(options.id) {
      let requestParams = {
        apiUrl: '/Resume/detail',
        requestData: {id:options.id}
      }
      app.ajax(requestParams).then(res => {
        const resumeInfo = res.data.info
        console.log(resumeInfo)
        updateData = Object.assign(updateData,resumeInfo)
        console.log(updateData)
        this.setData({ ...updateData })
      })
    }else {
    this.setData({ ...updateData})
    }
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

})