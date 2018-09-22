// pages/home/record/index.js
import util from '../../../utils/util'
import { deliverStageArr, wagesArr} from '../../../utils/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    wagesArr,
    deliverStageArr,
    curPage:1,
    curStage:null,
    isLoading:false,
    list:[],
    hasMore:false
  },

  /***
   * Action
   */
  swichTab:function(data){
    const index = data.currentTarget.dataset.index;
    var stageData;
    if (index === undefined){
      this.setData({
        curPage:1,
        curStage:null
      })
      stageData=null
    }else {
      this.setData({
        curPage:1,
        curStage: parseInt(index)
      })
      stageData = { stage: parseInt(index)}
    }
    this._fetchData(stageData)
  },
  // 加载更多
  _loadMore: function () {
    if (this.data.isLoading || !this.data.hasMore) return
    this.setData({ isLoading: true })
    let requestData = {
      p: parseInt(this.data.curPage)+1
    }
    if (this.data.curStage !== null) {
      requestData.stage = this.data.curStage
    }
    const requestParams = {
      apiUrl: "/Deliver/mylog",
      requestData,
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      let newList = this.data.list.concat(res.info.list)
      let updateData = {
        list: newList,
        curPage: res.info.page,
        hasMore: res.info.hasMore
      }
      this.setData({
        isLoading: false,
        ...updateData
      })
    })
  },

_fetchData:function(data){
  let newData = data || {}
  let requestData = Object.assign({ p: this.data.curPage },newData)
  const requestParams = {
    apiUrl: "/Deliver/mylog",
    requestMethod: "GET",
    requestData
  }
  const ajaxRequest = util.request(requestParams)
  ajaxRequest.then(res => {
    this.setData({
      showPage: true,
      hasMore: res.info.hasMore,
      list: res.info.list
    })
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const requestParams = {
      apiUrl:"/Deliver/mylog",
      requestMethod:"GET",
      requestData:{p:this.data.curPage}
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res=>{
      this.setData({
        showPage:true,
        hasMore:res.info.hasMore,
        list:res.info.list
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
    this._loadMore()
  }

  
})