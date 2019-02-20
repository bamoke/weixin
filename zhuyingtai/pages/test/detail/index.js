// pages/test/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    questionIndex: 0,
    testInfo: {},
    questionList: [],
    selectedResult: [],
    isCompleted:false,
    isPassed:false
  },
  restart:function(){
    this.setData({
      questionIndex: 0,
      selectedResult: [],
      isCompleted: false,
      isPassed: false
    })
  },
  chooseAnswer: function(e) {
    const data = e.target.dataset
    let selectedResult = this.data.selectedResult
    let questionIndex = this.data.questionIndex + 1
    selectedResult.push(data)
    this.setData({
      selectedResult
    })
    if (questionIndex == this.data.questionList.length) {
      this._submit()
    } else {
      this.setData({
        questionIndex
      })
    }
  },
  _submit:function(){
    let requestParams = {
      apiUrl: '/Test/result',
      requestMethod:"POST",
      requestData: {
        testid: this.data.id,
        result:JSON.stringify(this.data.selectedResult)
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        isCompleted:true,
        isPassed:res.data.passStatus
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curId = options.id
    let requestParams = {
      apiUrl: '/Test/detail',
      requestData: {
        id: curId
      }
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        testInfo: res.data.testInfo,
        questionList: res.data.question,
        id:curId
      })
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