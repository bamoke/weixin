// pages/home/childaccount/index.js
import util from '../../../../utils/util';
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
      comid: this.data.selectedCom,
      realname:form.detail.value.realname,
      phone:form.detail.value.phone
    }
    if (formData.realname == '') {
      return this._showError("请填写管理人员的姓名")
    }
    if (formData.phone == '') {
      return this._showError("请填写管理人员的手机号码")
    }
    if (formData.comid == '') {
      return this._showError("请选择管理企业")
    }
    const requestParams = {
      apiUrl: "/ChildAccount/doadd",
      requestData:formData,
      requestMethod:"POST"
    }
    this.setData({
      isSubmiting:true
    })
    util.request(requestParams).then(res => {
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
    const accountInfo = wx.getStorageSync("userInfo")
    this.setData({
      showPage: true,
      comList: wx.getStorageSync("myCom"),
      // selectedCom: temArr.length?temArr.join(','):''
    })
  }


})