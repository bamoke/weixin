// pages/fybx/detail/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow:false,
    baseInfo:{},
    detailList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageShow:true,
      baseInfo:{
        "num": "BX0001",
        "title": "6月伙食费5w44酒啊就开始网站备案域名核验要求通知",
        "status": "未审核",
        "time": "2018-07-01",
        "amount": "20158.47"
      },
      detailList:[
        {
          "no":1,
          "name":"560107_销售费用_客户招待费",
          "description":"2018年五月国税局来访接待晚宴、酒店住宿安排、行程交通费用",
          "amount":"2514.65",
          "display":"hidden"
        },
        {
          "no": 2,
          "name": "560107_销售费用_客户招待费",
          "description": "2018年五月国税局来访接待晚宴、酒店住宿安排、行程交通费用",
          "amount": "2514.65",
          "display": "hidden"
        }
      ]
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})