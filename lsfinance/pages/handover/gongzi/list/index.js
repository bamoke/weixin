// pages/handover/gongzi/index.js
const app = getApp();

const curDate = new Date();
const year = curDate.getFullYear();
var month = curDate.getMonth() + 1;
month = month < 10 ? "0" + month : month
var curMonth = [year, month].join("-")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    base: {},
    list: [],
    toMonth:curMonth,
    curMonth:curMonth
  },


  /**
   * 空方法，组织冒泡
   */
  stopPropagation() {

  },
  handleMonthChange(e) {
    var newMonth = e.detail.value
    const requestParams = {
      apiUrl: "/Handover/shenbao",
      requestData: {
        type: "gz",
        month: newMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        base: res.base,
        list: res.list,
        showPage: true,
        curMonth: newMonth
      })
    })
  },

  /**
   * 
   */
  switchDetail(e) {
    var curIndex = e.currentTarget.dataset.index
    var list = this.data.list
    list[curIndex].show = !list[curIndex].show
    this.setData({
      list
    })
  },
  
  /**
   * 
   */
  handleSelectedItem(e) {
    const value = e.detail.value[0]
    const index = e.currentTarget.dataset.index
    let list = this.data.list
    list[index].status = typeof value === 'undefined' ? "暂停发放" : "同意发放"
    list[index].style = typeof value === 'undefined' ? "un-agree" : "agree"
    list[index].checked = typeof value !== 'undefined'
    this.setData({
      list
    })
  },
  handleSelectAll(e) {
    let list = this.data.list
    const value = e.detail.value[0]
    list.forEach(item => {
      if (typeof value === 'undefined') {
        item.checked = false
        item.status = "暂停发放"
        item.style = "un-agree"
      } else {
        item.checked = true
        item.status = "同意发放"
        item.style = "agree"
      }
    })
    this.setData({
      list
    })
  },
  handleSubmit() {
    let list = this.data.list;
    let base = this.data.base;

    var unSbNum = 0;
    list.forEach(item => {
      if (item.status === "暂停发放" || item.status === '待处理') {
        unSbNum++
      }
    })



    if (unSbNum > 0) {
      base.status_name = "部分发放"
      this.setData({
        base
      })
      wx.showModal({
        title: `${unSbNum}个名单未选择`,
        content: `未被选择名单本月将暂停工资发放，确定继续提交？`,
        success: res => {
          if (res.confirm) {
            this._sendData()
          }
        }
      })
    } else {
      base.status_name = "全部发放"
      this.setData({
        base
      })
      this._sendData()
    }
  },
  _sendData() {
    const requestParams = {
      apiUrl: "/Handover/shenbao_save",
      requestData: {
        type: "gz",
        base: JSON.stringify(this.data.base),
        list: JSON.stringify(this.data.list)
      },
      requestMethod: "POST"
    }
    app.ajax(requestParams).then(res => {
      wx.showToast({
        title: '操作成功',
        icon: "success"
      })
      setTimeout(function() {
        wx.navigateBack({
          detal: 1
        })
      }, 500)
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
    console.log(this.data)
    const requestParams = {
      apiUrl: "/Handover/shenbao",
      requestData: {
        type: "gz",
        month:this.data.curMonth
      }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        showPage: true,
        base: res.base,
        list: res.list
      })
    })
  }
})