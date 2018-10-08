// pages/survey/index.js
var App = getApp();
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    showError: false,
    curId: null,
    baseInfo:{},
    progress: 0,
    selected: [],
    question: []
  },

  selectValue:function(e){
    console.log(e)
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.id === 'undefined') return;
    const curId = options.id
    const params = {
      apiUrl: "/survey/detail",
      requestData: { id: curId },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)

    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        curId: curId,
        baseInfo:res.data.baseInfo,
        question: res.data.question
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