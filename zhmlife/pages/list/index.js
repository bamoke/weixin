// pages/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow:false,
    curPage:1,
    moreLoading:false,
    hasMore:false,
    sourceUrl: app.globalData.sourceUrl,
    nav:{}
  },
  /**
   * load more data
   */
  loadMore:function(){
    const apiUrl = "/Article/index";
    var oldList = this.data.newsList;
    var requestData = { cid: this.data.curCid, page: this.data.curPage + 1 }
    var requestResult = app.fetchData(apiUrl, requestData);
    requestResult.then(result=>{
        this.setData({
          curPage:this.data.curPage+1,
          newsList: oldList.concat(result.info.list),
          moreLoading:false,
          hasMore: result.info.hasMore
        })
    }).catch(reject=>{

    });
    this.setData({
      moreLoading:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid=options.cid;
    const apiUrl = "/Article/index";
    var requestData ={cid:cid,page:this.data.curPage}
    var requestResult = app.fetchData(apiUrl,requestData);
    requestResult.then(result => {
      this.setData({
        pageShow: true,
        banner: result.info.banner,
        newsList: result.info.list,
        hasMore:result.info.hasMore,
        curCid:cid,
        nav: {
          isIndex: false,
          curCid:cid,
          list: result.info.nav
        }
      })
    }).catch(reject => {
      console.log(reject)
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