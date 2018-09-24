// pages/testdetail/index.js
import { siteConf } from "../../../static/js/common";
//获取应用实例
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testsId:null,
    symbolArr: ['A', 'B', 'C', "D", 'E', 'F', 'G'],
    showStartPage: true,
    showCompletePage: false,

    havaPurchaset:false,
    isVip: false,
    curIndex: 0,
    totalNum: 5,
    correctNum: 0,
    score: 0,
    correctName: '',
    errorList:[],
    examinationInfo:{},
    question: []

  },
/**
 * 开始答题
 */
  startTest:function(){
  this.setData({
    showStartPage:false
  })
  },
  /**
   * 选择答案,单选和判断题选择即确认，多选需要点击确认按钮
   */
  selectAnswer: function (e) {
    var newData = {};
    var val = (e.detail.value).toString();
    var newQuestion = this.data.question;
    var curIndex = this.data.curIndex;
    var newScore = this.data.score;
    var newCorrectNum = this.data.correctNum;
    var newErrorList = this.data.errorList;
    newQuestion[curIndex].selected = val;
    if (newQuestion[curIndex].type != 2) {
      if (val == newQuestion[curIndex].correct) {
        newQuestion[curIndex].answeredResult = 1;
        newCorrectNum++;
        newScore = Math.floor(newCorrectNum * Math.floor(100 / this.data.totalNum));
        newData.correctNum = newCorrectNum;
        newData.score = newScore;
      } else {
        newQuestion[curIndex].answeredResult = 2;
        newData.correctName = this._transSymbol(newQuestion[curIndex].correct)
        // newErrorList.push('{ "id": ' + newQuestion[curIndex].id + ', "selected": ' + val + '}')
        newErrorList.push('question_id=' + newQuestion[curIndex].id + '&selected=' + val);
        newData.errorList = newErrorList;
      }
    }
    newData.question = newQuestion;
    this.setData(newData)
  },

  /**
   * 确认答案
   */
  confirmAnswer: function (data) {
    var newQuestion = this.data.question;
    var curIndex = this.data.curIndex;
    var val = (newQuestion[curIndex].selected).split(',').sort().toString();
    var newScore = this.data.score;
    var newCorrectNum = this.data.correctNum;
    var newData = {};
    var newErrorList = this.data.errorList;
    if (newQuestion[curIndex].selected == '') {
      wx.showToast({
        title: '请先选择答案',
        icon: 'error',
        duration: 1000
      })
      return;
    }
    if (val == newQuestion[curIndex].correct) {
      newQuestion[curIndex].answeredResult = 1;
      newCorrectNum++;
      newScore = Math.floor(newCorrectNum * Math.floor(100 / this.data.totalNum));
      newData.correctNum = newCorrectNum;
      newData.score = newScore;
    } else {
      newQuestion[curIndex].answeredResult = 2;
      newData.correctName = this._transSymbol(newQuestion[curIndex].correct)
      newErrorList.push('question_id=' + newQuestion[curIndex].id +'&selected='+val)
      newData.errorList = newErrorList;
    }
    newData.question = newQuestion;

    this.setData(newData)
  },

  /**
  * 切换下一题
  */
  nextQuestion: function () {
    var curQuestion = this.data.question[this.data.curIndex];
    if (curQuestion.answeredResult) {
      this.setData({
        curIndex: this.data.curIndex + 1,
        isChecked: false
      })
    } else {
      wx.showToast({
        title: '请先确认答案',
        icon: 'error',
        duration: 1000
      })
    }

  },

  /**
   * 交卷
   */
  submitTest: function () {
    var _that = this;
    var apiUrl = '/Tests/result'
    var requestData = {
      "tests_id":this.data.testsId,
      "score": this.data.score,
      "error_list": this.data.errorList.toString()
    }
    var myPromise = app._getApiData(apiUrl, requestData,"POST");
    myPromise.then(function(){
      wx;wx.hideLoading();
      _that.setData({
        showCompletePage: true
      })
    })

  },
  /**
   * 私有方法
   */
  _transSymbol: function (str) {//将0,1模式转换成A,B模式
    var arr = str.split(',').sort();
    var that = this;
    return arr.map(function (item) { return that.data.symbolArr[item] }).toString();
  },

  /**
   * 购买试卷
   */
  buyTests:function(){
    var proid = this.data.testsId;
    var apiUrl = '/Orders/create';
    var requestData = { type: 3, proid: proid }
    var promise = app._getApiData(apiUrl, requestData);

    promise.then((backdata) => {
      var info = backdata.info;
      var nonceStr = info.nonceStr;
      var pkg = info.package;
      var timeStamp = info.timeStamp;
      var paySign = info.sign;
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: 'MD5',
        paySign: paySign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/tests/detail/index?id=' + proid,
          })
        },
        fail: function (res) {
          wx.redirectTo({
            url: '/pages/home/orders/index',
          })
        }
      })
    }, (rej) => {
      console.log(rej)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    var apiUrl = '/Tests/detail'
    var requestData = { id: options.id }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      _that.setData({
        showPage: true,
        testsId: options.id,
        havaPurchaset: data.havaPurchaset,
        totalNum: data.totalNum,
        examinationInfo: data.examinationInfo,
        question:data.question
      })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})