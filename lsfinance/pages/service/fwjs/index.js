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
    totalInfo:{},//服务器返回的总计信息
    total: '0.00',//选择项目的计算总计
    canPayment: false,
    list: [],
    selectedItem:[]//已选择项目的index值
  },
  /** 
   * selectItem
   */
  selectItem: function(data) {
    var curIndex = data.currentTarget.dataset.index;
    var dataList = this.data.list;
    var total = Math.round(this.data.total*100);
    var selectedItem = this.data.selectedItem;
    var curAmount = Math.round(dataList[curIndex].mp_amount*100);

    if (typeof dataList[curIndex].isSelected !== 'undefined' && dataList[curIndex].isSelected === true) {
      dataList[curIndex].isSelected = false
      total = total - curAmount;
      selectedItem.splice(selectedItem.indexOf(curIndex), 1)
    } else {
      dataList[curIndex].isSelected = true
      total = total + curAmount;
      selectedItem.push(curIndex);
    }
    this.setData({
      list: dataList,
      total: total == 0 ? "0.00" : total/100,
      selectedItem,
      canPayment: !!selectedItem.length
    })
  },

  settlement:function(){
/*     const testRequestParams = {
      apiUrl: "/Service/testinsert",
    }
    var testPromise = util.request(testRequestParams);
    return; */
    const _that = this;
    if (!this.data.canPayment) return
    let curSeletedItem = this.data.list.filter((item, index) => {
      return this.data.selectedItem.indexOf(index) >= 0
    })
    const curComInfo = wx.getStorageSync('curComInfo')
    const requestParams = {
      apiUrl: "/Orders/yfjs",
      requestData: {
        amount: this.data.total,
        comid: curComInfo.comId,
        content: JSON.stringify(curSeletedItem)
      },
      requestMethod:"POST"
    }
    console.log(requestParams.requestData.content)
    var myPromise = util.request(requestParams);
    myPromise.then(data=>{
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.sign,
        success: function (res) {
          _that._loadData()
        },
        fail: function (res) {

        }
      })
    })
  },
  _loadData:function(){
    var objList = this.data.list;
    var curComInfo = wx.getStorageSync("curComInfo");
    const requestParams = {
      apiUrl: "/Service/fwjs",
      requestData: {
        comid: curComInfo.comId
      }
    }
    util.request(requestParams).then((data) => {
      this.setData({
        showPage: true,
        list: data.list == null ? [] : data.list,
        totalInfo: data.totalInfo,
        total: '0.00',
        canPayment: false,
        selectedItem: []
      })
    }).catch(function (msg) {
      console.log(msg)
    })
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
    this._loadData();
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