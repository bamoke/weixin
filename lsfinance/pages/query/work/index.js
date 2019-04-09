// pages/query/work/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curCate:"month",
    cate: [{
        key: "month",
        name: "每月工作"
      },
      {
        key: "quarter",
        name: "季度工作"
      },
      {
        key: "year",
        name: "年度工作"
      },
      {
        key: "advise",
        name: "顾问服务"
      }
    ],
    content: {}
  },
  handleSwithTab(e){
    this.setData({
      curCate:e.currentTarget.dataset.key
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    let requestParams = {
      apiUrl: "/ServerQuery/work",
      requestData: {
        comid: curComInfo.comId
      }
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        showPage:true,
        content:res
      })
    })
  }


})