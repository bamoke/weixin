// pages/discuss/detail/index.js
const app = getApp()
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    discussId:null,
    discussInfo:{},
    memberInfo:{},
    nodes:[]
  },

  /**
   * methods
   */
  addNode:function(){
    if(this.data.nodes.length > 9) {
      wx.showToast({
        title: '最多添加10个分栏',
        image:"/static/images/icon-error.png"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/discuss/node/add/index?discussid='+this.data.discussId,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      discussId:options.id
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
    const params = {
      apiUrl: "/Discuss/detail",
      requestData: {
        id: this.data.discussId
      },
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        discussInfo: res.data.discuss,
        nodes: res.data.nodes,
        memberInfo: res.data.memberInfo
      })
    }, reject => {
      if (reject.code == 14001) {
        wx.showModal({
          content: reject.msg,
          confirmText: "返回",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta:1
              })
            }
          }
        })
      }
    })
  }

  
})