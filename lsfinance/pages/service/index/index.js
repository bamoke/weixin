 // pages/service/index/index.js
 import util from '../../../utils/util';
 const app = getApp();
 Page({

   /**
    * 页面的初始数据
    */
   data: {
     comList: [],//经理人名下所有公司
     curComInfo:{}//当前选择的公司
   },
   /**
    * 切换公司
    */
   bindComChange: function(e) {
     var index = e.detail.value;
     var comList = this.data.comList;
     var curComInfo = wx.getStorageSync("curComInfo");
     if (comList[index].comId != curComInfo.comId) {
       wx.setStorageSync("curComInfo", comList[index]);
       this.setData({
         curComInfo: comList[index]
       })
     }
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

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

 })