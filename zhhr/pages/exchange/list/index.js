// pages/exchange/list/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabArr: [{
      name: '待审核',
      type: 1
    }, {
      name: '已审核',
      type: 2
    }],
    curTab: 0,
    showPage: false,
    type: 1,
    page: 1,
    hasMore: false,
    total: 0,
    list: []
  },
  /**
   * verify
   */
  verify: function(e) {
    const index = e.currentTarget.dataset.index
    const status = e.target.dataset.type
    const dataList = this.data.list

    let requestParams = {
      apiUrl: '/Exchange/verify',
      requestData: {
        id: dataList[index].exchangeid,
        status
      }
    }
    app.ajax(requestParams).then(res => {
      dataList.splice(index, 1)
      this.setData({
        list: dataList
      })
    })

  },
  switchTab: function(e) {
    const tabArr = this.data.tabArr
    const index = e.detail.index
    if (index === this.data.curTab) return;
    const type = tabArr[index].type
    let requestParams = {
      apiUrl: '/Exchange/vlist',
      requestData: {
        type
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        type,
        curTab: index,
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: res.data.list
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let requestParams = {
      apiUrl: '/Exchange/vlist',
      requestData: {
        type: this.data.type
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: res.data.list
      })
    })
  },
  onReachBottom: function() {
    if (!this.data.hasMore) return
    let requestParams = {
      apiUrl: '/Exchange/vlist',
      requestData: {
        page: parseInt(this.data.page) + 1,
        type: this.data.type
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        page: res.data.page,
        total: res.data.total,
        hasMore: res.data.hasMore,
        list: this.data.list.concat(res.data.list)
      })
    })

  }



})