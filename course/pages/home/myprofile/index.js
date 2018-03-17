// pages/home/myprofile/index.js
import { siteConf } from '../../../static/js/common';
var app = getApp();
var eduArr = ['请选择', "高中", "大专", "本科", "研究生", "博士后"];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    region: ['北京市', '北京市', '东城区'],
    eduArray: eduArr,
    eduIndex: 0,
    eduText: "",
    birthDay: "",
    realName: "",
    gender: null,
    email: "",
    submitDiseble: true,
    errorStatus: false,
    errorMsg: ""
  },

  /**
   * realname
   */
  updateRealname: function (data) {
    this.setData({
      realName: data.detail.value
    })
  },
  /**
   * gender
   */
  updateGender: function (data) {
    this.setData({
      gender: data.detail.value
    })
  },
  /**
   * 选择生日
   */
  birthdayChange: function (data) {
    var newBirthDay = data.detail.value;
    console.log(data)
    this.setData({
      birthDay: newBirthDay
    })
    console.log(this.data.birthDay);
  },
  /**
   * region
   */
  regionChange: function (data) {
    this.setData({
      region: data.detail.value
    })
  },
  /**
   *edu
   */
  eduChange: function (data) {
    this.setData({
      eduIndex: data.detail.value,
      eduText: eduArr[data.detail.value]
    })
  },
  /**
   * Email
   */
  updateEmail: function (data) {
    this.setData({
      email: data.detail.value
    })
  },

  /**
   * submit
   */
  submitForm: function () {
    var data = this.data;
    var apiUrl = "/Account/updateUserinfo";
    var requestData = {};
    var postData;
    if (data.realName) {
      requestData.realname = data.realName;
    }
    if (data.gender) {
      requestData.gender = data.gender;
    }
    if (data.birthDay) {
      requestData.birthday = data.birthDay;
    }
    if (data.region) {
      requestData.region = data.region;
    }
    if (data.eduText) {
      requestData.edu = data.eduText;
    }
    if (data.email) {
      requestData.email = data.email;
    }
    var arr = Object.keys(requestData);
    if (arr.length == 0) {
      this.setData({
        errorStatus: true,
        errorMsg: "没有填写任何数据"
      })
      return;
    }
    this.setData({
      errorStatus: false,
      errorMsg: ""
    })
    postData = app._getApiData(apiUrl, requestData, "POST")
    postData.then(data => {
      wx.hideLoading();
      wx.showToast({
        title: '修改成功',
      })
/*       wx.navigateBack({
        delta: 1
      }) */
    }, reject => {
      this.setData({
        errorStatus: true,
        errorMsg: reject
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiUrl = "/Account/getUserinfo";
    var result = app._getApiData(apiUrl);
    result.then(data => {
      var info = data.info;
      wx.hideLoading()
      this.setData({
        showPage: true,
        region: info.region ? info.region : [],
        eduText: info.edu ? info.edu : "未填写",
        birthDay: info.birthday,
        realName: info.realname,
        gender: info.gender,
        email: info.email
      })
    }, reject => {
      wx.hideLoading()
      console.log(reject);
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

  },

})