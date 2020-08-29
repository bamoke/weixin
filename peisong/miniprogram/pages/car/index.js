// pages/car/index.js
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let carData = wx.getStorageSync('car') || []
    let amount = 0
    if(carData.length) {
      carData.forEach(function(item){
        amount += item.price * 100 * item.buynum
      })
    }
    this.setData({
      proList:carData,
      amount: amount / 100
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