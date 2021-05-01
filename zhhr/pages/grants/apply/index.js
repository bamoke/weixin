// pages/grants/apply/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {},
    rules: [{
      name: 'realname',
      rules: {
        required: true,
        message: '请填写您的姓名或称呼'
      },
    },{
      name: 'phone',
      rules: {
        required: true,
        message: '请填写您的手机号码'
      },
    }]
  },
  handleInput(e) {
    const value = e.detail.value
    const fieldName = e.currentTarget.dataset.name
    let newFormData = this.data.formData
    newFormData[fieldName] = value
    this.setData({
      formData: newFormData
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        app.ajax({
          apiUrl: '/Grants/doapply',
          requestData: {
            ...this.data.formData
          },
          requestMethod: "POST"
        }).then(res => {
          this.setData({
            isCompleted: true
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var formData = {}
    app.ajax({
      apiUrl: '/Grants/fetchuserinfo'
    }).then(res => {
      this.setData({
        userInfo: res.data.userInfo,
        formData:{grant_id:options.grantid,...res.data.userInfo}
      })
    })


    this.setData({
      formData
    })
  }
})