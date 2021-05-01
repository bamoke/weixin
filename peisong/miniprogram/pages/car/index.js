// pages/car/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:[],
    amount:0
  },

  /**
   * methods
   */
  updateList(e){
    let {newItem,index} = {...e.detail}
    let list = this.data.proList
    let amount = 0
    if(newItem.buynum == 0){
      list.splice(index,1)
    }else {
      list[index] = newItem
    }
    if(list.length > 0) {
      list.forEach(function(item){
        amount += item.price * 100 * item.buynum
      })
    }
    this.setData({
      proList:list,
      amount: amount / 100
    })
  },

  /**
   * 提交订单
   */
  handleSubmit(){
    var goods = JSON.stringify(this.data.proList)
    App.ajax({
      apiUrl: '/Car/doorder',
      requestData:{goods},
      requestMethod: "post"
    }).then(res => {
      wx.showToast({
        title: '提交成功',
      })
      this.setData({
        proList:[]
      })
      wx.setStorageSync('car', [])
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let carData = wx.getStorageSync('car') || []
    this.setData({
      proList:carData
    })
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






})