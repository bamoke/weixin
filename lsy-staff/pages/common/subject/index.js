// pages/fiscal/subject/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTabIndex: 0,
    subjectInfo: [],
    curSubjectList: []
  },

  /**
   * methods
   */
  changeTab(e) {
    if (typeof e.target.dataset.index === 'undefined') return
    const index = e.target.dataset.index
    this.setData({
      curTabIndex: index,
      curSubjectList: this.data.subjectInfo[index].child
    })
  },
  selectSubject: function (e) {
    var item, i;
    const index = e.currentTarget.dataset.index
    const parentIndex = this.data.curTabIndex
    item = this.data.subjectInfo[parentIndex].child[index]
    if (typeof e.currentTarget.dataset.i !== 'undefined') {
      i = e.currentTarget.dataset.i
      item = item.child[i]
    }
    console.log(item)

    wx.setStorageSync('curSelectedSubject', item)
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const requestParams = {
      apiUrl: "/Subject/index"
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        subjectInfo : res.subjectInfo,
        curSubjectList: res.subjectInfo[0].child
      })
    },reject=>{
      wx.navigateBack({
        delta: 1
      })
    })
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

  }


})