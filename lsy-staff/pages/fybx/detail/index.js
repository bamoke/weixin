// pages/fybx/detail/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    pageShow: false,
    baseInfo: {},
    detailList: []
  },



  /**
   * 切换明细
   */
  switchDeatil: function(opt) {
    var index = opt.currentTarget.dataset.index;
    var detailList = this.data.detailList;
    if (detailList[index].display == "hidden") {
      detailList[index].display = "show";
    } else {
      detailList[index].display = "hidden";
    }
    this.setData({
      detailList: detailList
    })
  },

  /**
   * delete
   */
  handleDel: function() {
    const id = this.data.id
    wx.showModal({
      content: '确认删除？',
      success: res => {
        if (res.confirm) {
          const requestParams = {
            apiUrl: "/Expenses/dodelete",
            requestData: {
              id
            }
          }

          app.ajax(requestParams).then((data) => {
            wx.showToast({
              title: '操作成功',
              icon: "success"
            })
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }, reject => {

          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) {
      app.errorBack("参数错误")
    }
    this.setData({id:options.id})

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: "/Expenses/detail",
      requestData: {
        id: this.data.id
      }
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        showPage: true,
        info: res.info,
        baseInfo: res.info.base,
        detailList: res.info.detail
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  }






})