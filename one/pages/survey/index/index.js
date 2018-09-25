// pages/survey/index.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    showError: false,
    surveyId: null,
    give_balance: null,
    title: "",
    description: "",
    progress: 0,
    selectedQuestion: [],
    questionList: []
  },
  valueChange: function (data) {
    var curValue = data.detail.value
    var curQuestionIndex = data.target.dataset.qindex
    var questionList = this.data.questionList;
    var selectedQuestion = this.data.selectedQuestion;
    var progress;
    questionList[curQuestionIndex].selected = true;

    //设置已选择的问题
    var selectedIndex = selectedQuestion.indexOf(curQuestionIndex);
    if (selectedIndex < 0) {
      selectedQuestion.push(curQuestionIndex)
    }

    //选取答案
    if (typeof curValue === 'string') {
      questionList[curQuestionIndex].selectedAnswer = curValue;
    } else {
      if (curValue.length === 0) {
        questionList[curQuestionIndex].selected = false;
        selectedQuestion.splice(selectedIndex, 1)

      }
      questionList[curQuestionIndex].selectedAnswer = curValue.toString();
    }

    //ser progress
    progress = selectedQuestion.length * Math.ceil(100 / questionList.length);

    //update data
    this.setData({
      questionList: questionList,
      progress: progress > 100 ? 100 : progress
    })

  },
  submit: function () {
    var selectedQuestion = this.data.selectedQuestion;
    var questionList = this.data.questionList;
    var apiUrl = "/Survey/dopoll";
    var requestData = {};
    var allSelectedAnswer = "";
    if (selectedQuestion.length != questionList.length) {
      this.setData({
        showError: true
      })
      return;
    }
    //
    requestData.id = this.data.surveyId;
    questionList.forEach(function (e) {
      allSelectedAnswer += (e.selectedAnswer).toString() + ","
    })
    console.log(allSelectedAnswer);
    requestData.answerid = allSelectedAnswer.slice(0, allSelectedAnswer.length - 1);
    var postData = App._getApiData(apiUrl, requestData, "POST")
    postData.then((data) => {
      wx.hideLoading();
      var tipText = "感谢您的参与！"
      if (data.give_balance !== null) {
        tipText += "并获得￥" + data.give_balance + "现金红包"
      }
      wx.showModal({
        content: tipText,
        showCancel: false,
        confirmText: "返回首页",
        success: function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }, reject => {
      wx.hideLoading();
      console.log(reject);
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.id === 'undefined') return;
    var curId = options.id;
    var apiUrl = "/Survey/index";
    var requestData = { id: curId };
    var fetchData = App._getApiData(apiUrl, requestData)
    fetchData.then(data => {
      wx.hideLoading();
      console.log(data)
      this.setData({
        showPage: true,
        surveyId: curId,
        give_balance: data.surveyInfo.give_balance,
        title: data.surveyInfo.title,
        description: data.surveyInfo.description,
        questionList: data.questionList

      })
    }, reject => {
      wx.hideLoading();
      console.log(reject)
      wx.showModal({
        content: reject,
        showCancel: false,
        confirmText: "返回首页",
        success: function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
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