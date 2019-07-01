// pages/handover/shebao/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    base: {},
    list: [],
    noData: false,
    curMonth:"",
    toMonth:""

  },


  /**
   * 空方法，组织冒泡
   */
  stopPropagation() {

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
  handleMonthChange: function(e) {
    const curMonth = e.detail.value
    const requestParams = {
      apiUrl: "/Gongzi/index",
      requestData: {
        type: "gz",
        month: curMonth
      }
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        curMonth,
        list: res.list
      })
    }, reject => {
      
    })


    this.setData({
      curMonth:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {
    const curDate = new Date();
    const year = curDate.getFullYear();
    var month = curDate.getMonth() + 1;
    month = month < 10 ? "0" + month : month
    var curMonth = [year,month].join("-")

    const requestParams = {
      apiUrl: "/Gongzi/index",
      requestData: {
        type: "gz",
        month: curMonth
      }
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        curMonth,
        base: res.base,
        list: res.list
      })
    }, reject => {
      if (reject.code == 13009) {
        app.errorBack(reject.msg)
      }
    })
  }
})