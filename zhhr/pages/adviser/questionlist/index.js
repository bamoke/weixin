// pages/adviser/questionlist/index.js
const app = getApp()
const cateArr = [
  {
    type:'all',
    name:'全部'
  },
  {
    type:1,
    name:'已解决'
  },
  {
    type:0,
    name:'未解决'
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curCateId:null,
    cateArr: cateArr,
    curNavIndex:0,
    pageInfo:{},
    list:[],
    keywords:""
  },

  /**
   * search
   * @param {*} e 
   */
  setKeywords(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  /***
   * 
   */
  handleSearch(e){
    let requestParams = {
      apiUrl: '/AdviserQuestion/vlist',
      requestData: {cateid:this.data.curCateId,keywords:this.data.keywords}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: res.data.list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curCateId = options.cateid
    app.ajax({
      apiUrl:"/AdviserQuestion/vlist",
      requestData:{cateid:curCateId}
    }).then(res=>{
      this.setData({
        showPage:true,
        curCateId,
        list:res.data.list,
        pageInfo:res.data.pageInfo
      })
    })
  },





  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    app.ajax({
      apiUrl:"/AdviserQuestion/vlist",
      requestData:{cateid:this.data.curCateId,keywords:this.data.keywords}
    }).then(res=>{
      wx.stopPullDownRefresh()
      this.setData({
        list:res.data.list,
        pageInfo:res.data.pageInfo
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) return
    const keywords = this.data.keywords
    let requestParams = {
      apiUrl: '/AdviserQuestion/vlist',
      requestData: {page: parseInt(pageInfo.page) + 1,keywords,cateid:this.data.curCateId }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: this.data.list.concat(res.data.list)
      })
    })
  }


})