// pages/service/fwjs/index.js
import util from '../../../utils/util';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curPage: 1,
    total:'0.00',
    selectedYsNo:[],
    canPayment:false,
    list: []
  },
  /**
   * selectItem
   */
  selectItem:function(data){
    var curIndex = data.currentTarget.dataset.index;
    var dataList = this.data.list;
    var total = this.data.total;
    var selectedYsNo = this.data.selectedYsNo;
    var curAmount = dataList[curIndex].amount;
    var curYsNo = dataList[curIndex].ysNo;
    
    if (typeof dataList[curIndex].isSelected !== 'undefined' && dataList[curIndex].isSelected === true){
      dataList[curIndex].isSelected = false
      total = parseFloat(total) - parseFloat(curAmount);
      selectedYsNo.splice(selectedYsNo.indexOf(curYsNo),1)
    }else {
      dataList[curIndex].isSelected = true
      total = parseFloat(total) + parseFloat(curAmount);
      selectedYsNo.push(curYsNo);
    }
    console.log(selectedYsNo)
    this.setData({
      list:dataList,
      total:total == 0 ?"0.00":total,
      selectedYsNo: selectedYsNo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiUrl = "/Service/fwjs";
    var objList = this.data.list;
    var curCom = wx.getStorageSync("curCom");
    var requestData = {
      comId: curCom.comId
    };
 /*    this.setData({
      showPage: true,
      list: [
        {
        "ysNO":1,
        "name":"5月代理费",
        "amount":2800,
        "time":'2018-03-17'
        },
        {
          "ysNO": 2,
          "name": "6月代理费",
          "amount": 4800,
          "time": '2018-04-17'
        },
        {
          "ysNO": 3,
          "name": "7月代理费",
          "amount": 1800,
          "time": '2018-05-17'
        },
        {
          "ysNO": 4,
          "name": "8月代理费",
          "amount": 3800,
          "time": '2018-06-17'
        }
      ]
    })
    return; */
      util.request(apiUrl,requestData,"POST").then((data) =>{
        this.setData({
          showPage: true,
          list:data.list==null?[]:data.list
        })
      }).catch(function (msg) {
        console.log(msg)
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