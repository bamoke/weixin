// pages/home/coupon/index.js
const cateArr = [
  {
    type:1,
    name:'未使用'
  },
  {
    type:2,
    name:'已使用'
  },
  {
    type:3,
    name:'已过期'
  }
]
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    cateArr: cateArr,
    curNavIndex:0,
    list:[],
    pageInfo:{}
  },
  changeCate(e){
    const index = e.detail.index
    const curTab = cateArr[index]
    let requestParams = {
      apiUrl: '/Coupon/vlist',
      requestData: {type: curTab.type}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: res.data.list,
        curNavIndex: index
      })
    })
  },
  handleUse(e){
    const index = e.currentTarget.dataset.index
    const curItem = this.data.list[index]
    wx.showModal({
      title: "优惠码",
      content: curItem.code,
      showCancel:false
    })
  },
  onShow: function () {
    let requestParams = {
      apiUrl: '/Coupon/vlist',
      requestData: {}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        pageInfo:res.data.pageInfo,
        list: res.data.list
      })
    })
  },
  onReachBottom: function () {
    if (!this.data.pageInfo.hasMore) return
    const type = cateArr[this.data.curNavIndex].type
    let requestParams = {
      apiUrl: '/Coupon/vlist',
      requestData: {page: parseInt(this.data.pageInfo.page) + 1,type }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: this.data.list.concat(res.data.list)
      })
    })

  }
})