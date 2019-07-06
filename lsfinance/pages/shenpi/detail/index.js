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
   * verify
   */
  handleVerify(e){
    const acType = e.target.dataset.type
    const requestParams = {
      apiUrl: "/Shenpi/doverify",
      requestData: {
        id: this.data.id,
        type: acType
      }
    }
    app.ajax(requestParams).then(res=>{
      wx.showToast({
        title: res.msg,
        icon: "success"
      })
      setTimeout(function(){
        wx.navigateBack({
          detal: 1
        })
      },1000)
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
      apiUrl: "/Shenpi/detail",
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