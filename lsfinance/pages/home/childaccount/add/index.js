// pages/home/childaccount/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showpage: false,
    selectedCom: '',
    comList: [],
    isSubmiting:false
  },
  updatePhone: function(e) {
    const value = e.detail.value
    console.log(value)
  },
  selectCom: function(e) {
    const selectedComArr = e.detail.value
    this.setData({
      selectedCom: selectedComArr.join(",")
    })
  },
  submitForm:function(form){
    if(this.data.isSubmiting) return
    let formData = {
      realname:form.detail.value.realname,
      phone:form.detail.value.phone
    }
    if (formData.realname == '') {
      return this._showError("请填写子账号管理人员的姓名")
    }
    if (formData.phone == '') {
      return this._showError("请填写子账号管理人员的手机号码")
    }
    const requestParams = {
      apiUrl: `/ChildAccount/doadd/comid/${this.data.curComInfo.comId}`,
      requestData:formData,
      requestMethod:"POST"
    }
    this.setData({
      isSubmiting:true
    })
    app.ajax(requestParams).then(res => {
      wx.showToast({
        title: '添加成功',
        icon:"sucess"
      })
      setTimeout(function(){
        wx.navigateBack({
          delta:1
        })
      },500)

    },reject=>{
      this.setData({
        isSubmiting: false
      })
    })
  },

_showError:function(msg){
  wx.showToast({
    title: msg,
    image: "/static/images/icon-error.png"
  })
  return false
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({
      curComInfo
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

  }


})