// pages/search/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curPage:1,
    keyWord:"ss",
    sourceUrl: app.globalData.sourceUrl,
    hasMore:false,
    moreLoading:false,
    newsList:[]
  },
  setkeywords: function (e) {
    var keyWords = e.detail.value;
    this.setData({
      keyWord: keyWords
    })
  },
  gosearch: function () {
    var keyword = this.data.keyWord;
    if (keyword == '') {
      return
    } else {
      wx.redirectTo({
        url: '../search/index?k=' + keyword
      })
    }
  },
  loadMore: function () {
    const apiUrl = "/Article/search";
    var oldList = this.data.newsList;
    var requestData = { kw: this.data.keyWord, page: this.data.curPage + 1 }
    var requestResult = app.fetchData(apiUrl, requestData);
    requestResult.then(result => {
      this.setData({
        curPage: this.data.curPage + 1,
        newsList: oldList.concat(result.info.list),
        moreLoading: false,
        hasMore: result.info.hasMore
      })
    }).catch(reject => {

    });
    this.setData({
      moreLoading: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keywords = options.k;
    const apiUrl = '/Article/search';
    var requestData = {
      kw:keywords,
      page:this.data.curPage
    }
    var requestResult = app.fetchData(apiUrl, requestData);
    requestResult.then(data=>{
      this.setData({
        newsList:data.info.list,
        hasMore:data.info.hasMore,
        total:data.info.total
      })
    }).catch(reject=>{

    })
    this.setData({
      showPage:true,
      keyWord: keywords
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