// pages/work/detail/index.js
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow:false,
    showStartPage: true,
    showCompletePage: false,
    canShowNext:false,
    totalNum:0,
    curIndex: 0,//当前问答Index
    score: 0,//总分
    baseInfo: {},//基本信息
    question: [],//问题列表
    anserResult:[]//回答结果列表;
  },

  /**
   * 确认答案
   */
  confimAnswer:function(e){
    const curIndex = this.data.curIndex
    const result = e.detail
    const anserResult = this.data.anserResult
    anserResult[curIndex] = result
    this.setData({
      anserResult,
      canShowNext:true,
    })
  },
  // next
  nextQuestion:function(){
    if (!this.data.canShowNext) return
    this.setData({
      curIndex:this.data.curIndex+1,
      canShowNext:false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const workId = options.id
    const params = {
      apiUrl: "/Work/detail",
      requestData: { id: workId },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      var anserResult = res.data.question.map((item,index)=>{
        if(index === 0) return 'active'
        return ''
      })
      this.setData({
        workId,
        showPage: true,
        baseInfo: res.data.baseInfo,
        question: res.data.question,
        totalNum: res.data.question.length,
        anserResult
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

  }

})