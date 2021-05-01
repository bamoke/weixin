// miniprogram/pages/product/list/list.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curCateIndex:0,
    proList:[],
    pageInfo:{},
    keywords: '',
    canPull: true,
    scrollTop:0
  },

  updateList(e){
    let {newItem,index} = {...e.detail}
    let list = this.data.proList
    list[index] = newItem
    this.setData({
      proList:list
    })
  },
  setKeywords(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  handleSearch(){
    App.ajax({
      apiUrl: '/Product/vlist',
      requestData:{keyword:this.data.keywords},
      requestMethod: "get"
    }).then(res => {
      this.setData({
        proList: App.compare(res.data.proList),
        pageInfo: res.data.pageInfo,
        curCateIndex:0
      })
    }, reject => {

    })
  },
  handleSwitchCate(e){
    var index = e.currentTarget.dataset.index
    const curCate = this.data.cateList[index]
    App.ajax({
      apiUrl: '/Product/vlist',
      requestData:{cate:curCate.fullname},
      requestMethod: "get"
    }).then(res => {
      wx.setStorageSync('curCate', curCate.fullname)
      this.setData({
        proList: App.compare(res.data.proList),
        pageInfo: res.data.pageInfo,
        curCateIndex:index,
        keywords:''
      })
    }, reject => {

    })
  },
  /**
   * 触底加载更多
   */
  handleReachBottom(){
    var oldList = this.data.proList
    var pageInfo = this.data.pageInfo
    if(this.data.canPull === false) {
      return false
    }
    var cateName = this.data.cateList[this.data.curCateIndex].fullname
    if(pageInfo.total < (pageInfo.pageSize * pageInfo.page)) {
      return false
    }

    this.setData({
      canPull: false
    })
    App.ajax({
      apiUrl: '/Product/vlist',
      requestData: { cate:cateName,keyword:this.data.keywords,page: parseInt(pageInfo.page) + 1 },
      requestMethod: "get"
    }).then(res => {
      this.setData({
        canPull: true,
        proList: oldList.concat(App.compare(res.data.proList)),
        pageInfo:res.data.pageInfo
      })
    }, reject => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
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
    var curCateIndex = 0, scrollTop = 0, requestData = {},curCate = wx.getStorageSync('curCate')

    if(curCate) {
      requestData.cate = curCate
    }
    App.ajax({
      apiUrl: '/Product/index',
      requestData,
      requestMethod: "get"
    }).then(res => {
      var cateList = res.data.cateList

      if(curCate){
        for(var i=0;i< cateList.length;i++) {
          if(cateList[i].fullname == curCate) {
            curCateIndex = i
            break
          }
        }
        if(curCateIndex > 7 ) {
          scrollTop = parseInt(curCateIndex/2)* 60
        }
        // wx.removeStorageSync('curCate')
      }
      this.setData({
        showPage: true,
        proList: App.compare(res.data.proList),
        pageInfo: res.data.pageInfo,
        cateList: res.data.cateList,
        curCateIndex,
        scrollTop
      })
    }, reject => {

    })
  },





  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})