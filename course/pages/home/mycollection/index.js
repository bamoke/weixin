// pages/home/mycollection/index.js
import { siteConf } from '../../../static/js/common';
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    currentTab: 0,
    curType: 1,
    curPage: 1,
    hasMoreColumn: false,
    hasMoreCourse: false,
    columnList: [],
    courseList: []
  },
  /**
   * Change type
   */
  changeType: function (data) {
    var type = data.currentTarget.dataset.type;
    var index = data.currentTarget.dataset.index;
    var oldType = this.data.curType;
    if (type == oldType) return;
    this.setData({
      curType: type,
      curTab: index
    })
    if (type == 1 && this.data.columnList.length > 0) return;
    if (type == 2 && this.data.courseList.length > 0) return;
    this._fetchData();

  },
  /**
   * fetch data
   */
  _fetchData: function () {
    const apiUrl = '/Collection/mycollection'
    var requestData = { type: this.data.curType, page: this.data.curPage };
    var HttpRquest = App._getApiData(apiUrl, requestData);
    var updateData = {};
    HttpRquest.then(data => {
      if (requestData.type == 1) {
        updateData.columnList = this.data.columnList.concat(data.list)
        updateData.hasMoreColumn = data.hasMore
      } else {
        updateData.courseList = this.data.courseList.concat(data.list);
        updateData.hasMoreCourse = data.hasMore
      }
      this.setData(updateData);
    }, reject => {
      wx.showToast({
        title: reject,
        icon: "none"
      })
    })
  },
  /**
   * cancel collection
   */
  cancelCollection: function (data) {
    var index = data.currentTarget.dataset.index;
    var apiUrl = "/Collection/index"
    var requestData = { type: this.data.curType };
    var HttpResult;
    var listObject;
    if (this.data.curType == 1) {
      listObject = this.data.columnList
    } else {
      listObject = this.data.courseList
    }
    requestData.proid = listObject[index].pro_id;
    console.log(requestData);
    HttpResult = App._getApiData(apiUrl, requestData, 'GET', 1);
    HttpResult.then(data => {
      wx.showToast({
        title: '已取消',
        icon:"none"
      })
      listObject.splice(index,1);
      if (this.data.curType == 1) {
        this.setData({
          columnList: listObject
        })
      } else {
        this.setData({
          courseList: listObject
        })
      }
    }, reject => {

    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._fetchData();
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