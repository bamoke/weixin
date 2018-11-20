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
    baseInfo: {},
    progress: 0,
    selected: [],
    questionList: [],
    typeIcon: ['', 'icon-single', 'icon-multiple'],
    curFillQuestionIndex: null //当前正在填写的填空题题目索引
  },

  selectSingle: function(e) {
    const questionIndex = e.currentTarget.dataset.questionindex
    const answerId = e.currentTarget.dataset.answerid
    let questionList = this.data.questionList
    questionList[questionIndex].selected = answerId
    questionList[questionIndex].isError = 0
    this.setData({
      questionList
    })
  },
  selectMultiple: function(e) {
    const questionIndex = e.currentTarget.dataset.questionindex
    const answerId = (e.currentTarget.dataset.answerid)
    const answerIndex = (e.currentTarget.dataset.answerindex)
    let questionList = this.data.questionList
    let selected = questionList[questionIndex].selected
    let curAnswerItem = questionList[questionIndex].answer[answerIndex]

    // 设置已选择
    if (curAnswerItem.selected) {
      curAnswerItem.selected = 0
    } else {
      curAnswerItem.selected = 1
    }
    questionList[questionIndex].answer[answerIndex] = curAnswerItem

    // 设置已选择的答案
    let answerArr = []
    if (selected !== '') {
      answerArr = selected.split(",")
    }
    let answerArrIndex = answerArr.indexOf(answerId)
    if (answerArrIndex >= 0) {
      answerArr.splice(answerArrIndex, 1)
    } else {
      answerArr.push(answerId)
    }
    if(answerArr.length >0){
      questionList[questionIndex].isError = 0
    }
    questionList[questionIndex].selected = answerArr.join(",")
    this.setData({
      questionList
    })

  },

  fillAnswer: function(e) {
    const value = e.detail.value
    const curQuestionIndex = e.currentTarget.dataset.questionindex
    const questionList = this.data.questionList
    questionList[curQuestionIndex].selected = value
    if(value != '') {
      questionList[curQuestionIndex].isError = 0
    }
    this.setData({
      questionList
    })
  },

  /**提交 */
  submit: function() {
    const questionList = this.data.questionList
    let hasError = 0
    let allSelected = []
    questionList.forEach(function(el,index,arr){
      if(el.selected == ''){
        arr[index].isError = 1
        hasError = 1
      }
      allSelected.push({ id: el.id, type: el.type, content: el.selected })
    })
   
    if(hasError == 1) {
      wx.showToast({
        title: '还有题目没完成',
        image:'/static/images/icon-error.png'
      })
      this.setData({ questionList})
      return
    }
   
    let requestParams = {
      apiUrl:'/Survey/save',
      requestMethod:"POST",
      requestData: { data: JSON.stringify(allSelected),surveyid:this.data.curId}
    }
    const ajaxRequest = util.request(requestParams)

    ajaxRequest.then(res => {
      wx.showModal({
        content: '感谢您的参与，现在返回首页',
        showCancel:false,
        success:function(res){
          if(res.confirm){
            wx.switchTab({
              url: '/pages/index/index/index',
            })
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (typeof options.id === 'undefined') return;
    const curId = options.id
    const params = {
      apiUrl: "/survey/detail",
      requestData: {
        id: curId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)

    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        curId: curId,
        baseInfo: res.data.baseInfo,
        questionList: res.data.question
      })
    }, reject => {
      if (reject.code == 14001) {
        wx.showModal({
          content: reject.msg,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})