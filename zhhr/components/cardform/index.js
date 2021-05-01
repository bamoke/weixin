// components/cardform/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    operatType: {
      type: Number
    },
    formInfo: {
      type: Object,
      value: {},
      observer: function(newVal) {
        this.setData({
          sex: newVal.sex,
          region: [newVal.province, newVal.city],
          avatar: newVal.avatar
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    sex: '请选择',
    sexArr: ['男', '女'],
    region: ['广东省', "珠海市"],
    avatar: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function(e) {
      const mpUserInfo = e.detail.userInfo
      const formInfo = this.data.formInfo
      app.globalData.userInfo = mpUserInfo
      if (this.data.avatar == mpUserInfo.avatarUrl) return;
      app.ajax({
        apiUrl:"/Mycard/update_avatar",
        requestData:{id:this.data.formInfo.id,img:mpUserInfo.avatarUrl}
      })
      this.setData({
        avatar: mpUserInfo.avatarUrl
      })

    },
    bindRegionChange: function(e) {
      const value = e.detail.value
      this.setData({
        region: value
      })
    },
    bindSexChange: function(e) {
      const index = e.detail.value
      let sex = this.data.sexArr[index]
      console.log(sex)
      this.setData({
        sex
      })
    },
    submitForm: function(e) {
      let apiUrl = '/Mycard/create'
      const formInfo = e.detail.value
      const phoneRegexp = /^[1][35678][0-9]{9}$/
      const emailRegexp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,8}$/

      formInfo.sex = this.data.sex
      formInfo.avatar = this.data.avatar
      /*       formInfo.province = this.data.region[0]
            formInfo.city = this.data.region[1] */

      if (!formInfo.realname) {
        this._showError('请填写姓名')
        return false
      }
      if (formInfo.sex == '请选择') {
        this._showError('请选择性别')
        return false
      }
      if (!formInfo.phone) {
        this._showError('请填写手机号')
        return false
      }
      if (!phoneRegexp.test(formInfo.phone)) {
        this._showError('手机号格式不正确')
        return false
      }

      if (!formInfo.email) {
        this._showError('请填写邮箱')
        return false
      }
      if (!emailRegexp.test(formInfo.email)) {
        this._showError('邮箱格式不正确')
        return false
      }
      /*       if (!formInfo.province) {
              this._showError('请填写所在地区')
              return false
            } */
      if (!formInfo.company) {
        this._showError('请填写您所在单位')
        return false
      }
      if (!formInfo.position) {
        this._showError('请填写您担任的职位')
        return false
      }
      if (this.data.operatType == 1) {
        formInfo.id = this.data.formInfo.id
        apiUrl = '/Mycard/update'
      }

      const requestParams = {
        apiUrl,
        requestData: formInfo,
        requestMethod: "POST"
      }
      const request = app.ajax(requestParams)
      request.then(res => {
        wx.showToast({
          title: '操作成功',
          icon: "success"
        })
        setTimeout(function() {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }, 500)
      })
    },
    _showError: function(msg) {
      wx.showToast({
        title: msg,
        image: "/static/images/icon-error.png"
      })
    },
  }
})