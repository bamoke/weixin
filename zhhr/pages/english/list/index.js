// pages/article/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    cateArr:[],
    curNavIndex:0,
    curCate:0,
    pageInfo:{
      page:1,
      pageSize:10,
      total:0,
      hasMore:false
    },
    list:[],
    showEnd:false
  },

  /**
   * Handle
   */
  changeCate(e){
    const cateArr = this.data.cateArr
    var index = e.detail.index
    var requestParams = {
      apiUrl: "/En/vlist",
      requestData: { page: 1, cate: cateArr[index].id }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        cateArr: res.data.cate,
        keywords:"",
        curNavIndex:index,
        showEnd:false
      })
    })
  },

  search:function(){
    var requestParams = {
      apiUrl: "/En/vlist",
      requestData: { kw:this.data.keywords}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        cateArr:res.data.cate,
        showEnd:false
      })
    })

  },
  setKeywords(e){
    console.log(e)
    this.setData({
      keywords:e.detail.value
    })
  },

  onLoad:function(options){
    var cate = 0;
    var keywords = ""
    if(options.cid) {
      cate = options.cid
    }
    if(options.keywords) {
      keywords = options.keywords
    }
    this.setData({
      curCate:cate,
      keywords
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var requestParams = {
      apiUrl: "/En/vlist",
      requestData: { page: 1, cate: this.data.curCate,kw:this.data.keywords }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        cateArr:res.data.cate,
        showPage: true
      })
    })
  },




  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const cateArr = this.data.cateArr
    const curNavIndex = this.data.curNavIndex
    const pageInfo = this.data.pageInfo
    var oldList = this.data.list
    var requestParams = {
      apiUrl: "/En/vlist",
      requestData: { page: parseInt(pageInfo.page) + 1, cate: cateArr[curNavIndex].id }
    }
    if(!pageInfo.hasMore) {
      this.setData({
        showEnd:true
      })
      return;
    }
    app.ajax(requestParams).then(res => {
      var showEnd = !res.data.pageInfo.hasMore;
      this.setData({
        pageInfo: res.data.pageInfo,
        list: oldList.concat(res.data.list),
        showEnd
      })
    })
  }

 
})