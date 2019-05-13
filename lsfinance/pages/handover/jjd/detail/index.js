// pages/fybx/detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    pageShow:false,
    baseInfo:{},
    detailList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id) {
      return
    }
    const id = options.id
    var orgInfo = wx.getStorageSync("orgInfo");
    const requestParams = {
      apiUrl: "/Expenses/detail",
      requestData: {
        id: options.id
      }
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        showPage:true,
        id,
        baseInfo: data.baseInfo,
        detailList: data.childList
      })
    }).catch(function (msg) {
    })
  },

  /**
   * 切换明细
   */
  switchDeatil:function(opt){
    var index = opt.currentTarget.dataset.index;
    var detailList = this.data.detailList;
    if(detailList[index].display == "hidden"){
      detailList[index].display = "show";
    }else {
      detailList[index].display = "hidden";
    }
    this.setData({
      detailList:detailList
    })
  },

/**
 * delete
 */
handleDel:function(){
  wx.showModal({
    content: '确认删除？',
    success:res=>{
      if (res.confirm) {
        const apiUrl = "/Expenses/dodelete"
        const requestParams = {
          apiUrl,
          requestData: { id: this.data.id }
        }

        app.ajax(requestParams).then((data) => {
          wx.showToast({
            title: '操作成功',
            icon: "success"
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 500)
        }, reject => {
          
        })
      }
    }
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
  
  }






})