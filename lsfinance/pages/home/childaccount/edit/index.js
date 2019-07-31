// pages/home/childaccount/edit/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showpage: false,
    curId:null,
    info:{},
    isSubmiting: false
  },

  submitForm: function (e) {
    var formData = e.detail.value
    formData.id = this.data.curId
    if (this.data.isSubmiting) return
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;

    if(formData.realname == '') {
      this._showError("姓名不能为空")
      return
    }
    if (formData.phone == '') {
      this._showError("手机号不能为空")
      return
    }
    if (!phoneRe.test(formData.phone)) {
      return this._showError("手机号格式不正确")
    }
    const requestParams = {
      apiUrl: "/ChildAccount/update/comid/"+this.data.curComInfo.comId,
      requestData: { ...formData},
      requestMethod: "POST"
    }
    this.setData({
      isSubmiting: true
    })
    app.ajax(requestParams).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: "sucess"
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 500)

    }, reject => {
      this.setData({
        isSubmiting: false
      })
    })
  },

  _showError: function (msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
    return false
  },

  del:function(){
    const _that = this
    const curId = this.data.curId
    const comId = this.data.curComInfo.comId
    wx.showModal({
      content: '确认删除此账号吗？',
      success:function(res){
        if(res.confirm) {
          const requestParams = {
            apiUrl: "/ChildAccount/del",
            requestData: { id: curId, comid:comId}
          }
          app.ajax(requestParams).then(res => {
            wx.showToast({
              title: '账号已删除',
              icon: "sucess"
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curId = options.id
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({ curId, curComInfo})
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
      apiUrl: "/ChildAccount/detail",
      requestData:{id:this.data.curId,comid:this.data.curComInfo.comId}
    }

    app.ajax(requestParams).then(res => {

      this.setData({
        showPage: true,
        info:res.info
      })
    })
  }
})