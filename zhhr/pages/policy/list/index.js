// pages/policy/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    cateId: null,
    keywords: '',
    list: [],
    pageInfo: {
      page: 1,
      pageSize: 10,
      total: 0,
      hasMore: false
    }
  },

  /**
   * 
   */
  handleView() {
    const detailInfo = this.data.detail
    /**下载文件 */
    if (detailInfo.file) {
      wx.downloadFile({
        url: detailInfo.file,
        success: function(res) {
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: res.tempFilePath,
              success: function(result) {
                // console.log(result)
              }
            })
          }
        }
      })
    }
  },
  setKeywords(e){
    this.setData({
      keywords:e.detail.value
    })
  },
  search(e) {
    const keywords = e.detail.value || this.data.keywords
    console.log(keywords)
    let requestParams = {
      apiUrl: '/Policy/vlist',
      requestData: {
        page:1,
        keywords,
        cateid: this.data.cateId,
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        keywords,
        pageInfo: res.data.pageInfo,
        list: res.data.list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cateId: options.cate
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var requestParams = {
      apiUrl: "/Policy/vlist",
      requestData: {
        cateid: this.data.cateId,
        page: 1
      },
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: res.data.list,
        showPage: true,
        cateInfo: res.data.cateInfo
      })
      wx.setNavigationBarTitle({
        title: res.data.cateInfo.name
      })
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var requestParams = {
      apiUrl: "/Policy/vlist",
      requestData: {
        keywords:this.data.keywords,
        cateid: this.data.cateId,
        page: 1
      },
      showLoading: false
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
  onReachBottom: function() {
    var oldList = this.data.list
    var pageInfo = this.data.pageInfo
    var requestParams = {
      apiUrl: "/Policy/vlist",
      requestData: {
        keywords: this.data.keywords,
        cateid: this.data.cateId,
        page: parseInt(pageInfo.page) + 1
      },
    }
    if (!pageInfo.hasMore) {
      return false;
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo: res.data.pageInfo,
        list: oldList.concat(res.data.list)
      })
    })
  }


})