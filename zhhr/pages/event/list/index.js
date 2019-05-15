// pages/event/list/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    tabArr: [{
      name: '全部',
      type: 0
    }, {
      name: '线上',
      type: 1
    },{
      name:"线下",
      type:2
    }],
    curTab: 0,
    pageInfo:{
      page:0,
      total:0,
      pageSize:10,
      hasMore:false
    },
    list:[],
    moreLoading:false
  },
  
  /**
   * Handle
   */
  switchTab(e){
    var index =parseInt(e.detail.index)
    var type = this.data.tabArr[index].type
    var requestParams = {
      apiUrl: "/Event/vlist",
      requestData: { page: 1, type }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        curTab:index
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var requestParams = {
      apiUrl:"/Event/vlist",
      requestData: { page: 1,type:0}
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        pageInfo:res.data.pageInfo,
        list:res.data.list,
        showPage:true
      })
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var type = this.data.tabArr[this.data.curTab].type
    var requestParams = {
      apiUrl: "/Event/vlist",
      requestData: { page: 1, type },
      showLoading:false
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list
      })
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let curPageInfo = this.data.pageInfo
    if(!curPageInfo.hasMore) return;
    var type = this.data.tabArr[this.data.curTab].type
    var oldList = this.data.list
    var requestParams = {
      apiUrl: "/Event/vlist",
      requestData: { page: parseInt(this.data.pageInfo.page) + 1, type }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: oldList.concat(res.data.list)
      })
    })
  }


})