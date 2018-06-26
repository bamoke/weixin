// pages/service/zjgl/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    curPage: 1,
    list: []
  },
  /**
   * 切换类别
   */
  changeCate: function (e) {
    var index = parseInt(e.detail.current);
    var callBack = () => {
      console.log(this)
      this.setData({
        curNav: index
      })
    }
    this._getData(index, callBack)
  },
  changeIndex: function (data) {
    var index = parseInt(data.target.dataset.index);

  },
  _getData: function (type, callBack) {
    var apiUrl = "/Service/zjgl/type/" + type;
    var objList = type === 0 ? this.data.ysList : this.data.yfList;
    if (objList.length == 0) {
      util.request(apiUrl)
        .then(function (data) {
          callBack();
        })
        .catch(function (msg) {
          console.log(msg)
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var apiUrl = "/Service/yfk";
    var objList = this.data.list;
    var curCom = wx.getStorageSync("curCom");
    var requestData = {
      comID: curCom.id
    };
/*     if (objList.length == 0) {
      util.request(apiUrl,requestData,"POST").then((data) =>{
        this.setData({
          showPage: true
        })
      }).catch(function (msg) {
        console.log(msg)
      })
    } */
    var dataList = [
      {
        
      }
    ]
    this.setData({
      showPage:true,
      list:dataList
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