// pages/handover/shebao/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    curComInfo:null,
    base:{},
    list:[]
  },

  handleSb(e){
    if(typeof e.target.dataset.type === 'undefined') return;
    let index = e.currentTarget.dataset.index;
    let type = e.target.dataset.type
    let list = this.data.list
    // let typeName = type==1?"同意申报":"不申报"
    list[index].status = type == 1 ? "同意申报" : "不申报"
    list[index].style = type == 1 ? "agree" : "un-agree"
    this.setData({list})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    const base = {
      date:"2019-04",
      total:"9384",
      person_nu:3,
      status:"未操作"
    }
    const list = [
      {
        name:"王昂因",
        total:"2934.93",
        sb_nu:"19834",
        dw_amount:'2938.09',
        gr_amount:'223.40',
        status:"待处理",
        style:"default"
      },
      {
        name: "刘以上",
        total: "2934.93",
        sb_nu: "19834",
        dw_amount: '2938.09',
        gr_amount: '223.40',
        status: "待处理",
        style: "default"
      }
    ]
    this.setData({ curComInfo,base,list})
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
    console.log(this.data)
    const requestParams = {
      apiUrl:"/Handover/shebao",
      requestData:{comid:this.data.curComInfo.comId}
    }
/*     app.ajax(requestParams).then(res=>{

    }) */
  }
})