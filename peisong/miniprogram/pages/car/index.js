// pages/car/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList:[],
    amount:0,
    curRemarks:'',
    curRemarksIndex:null,
    showRemarksBox:false
  },

  /**
   * 添加备注
   */
  handleShowRemarks(e){
    const index = e.target.dataset.index
    let proList = this.data.proList

    this.setData({
      curRemarksIndex:index,
      curRemarks:proList[index].remarks || '',
      showRemarksBox:true
    })


  },
  /**
   * 
   */
  handleInputRemarks(e){
    this.setData({
      curRemarks:e.detail.value
    })
  },
/**
 * 
 */
  confirmRemarks(){
    let proList = this.data.proList
    let index = this.data.curRemarksIndex
    let newItem = proList[index]
    console.log(this.data.curRemarks)
    newItem.remarks = this.data.curRemarks
    this.updateList({detail:{newItem,index}})
    this.storageCar(newItem)
    this.closeRemarksBox()
  },

  /**
   * 
   */
  closeRemarksBox(){
    this.setData({
      showRemarksBox:false
    })
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
  storageCar(newItem) {
    let car = wx.getStorageSync('car') || []
    let newCar = car.slice()
    const carNum = newCar.length
    if (newCar.length === 0) {
      newCar.push(newItem)
    } else {
      for (var i = 0; i < newCar.length; i++) {
        if (newCar[i].id == newItem.id) {
          if (newItem.buynum > 0) {
            newCar[i] = newItem
          } else {
            newCar.splice(i, 1)
          }
          break
        }
        // 如果没有相同的物品，在最后一次加入物品
        if(i == newCar.length-1) {
          newCar.push(newItem)
          break
        }
      }
    }
    try {
      wx.setStorageSync('car', newCar)
    } catch (e) {
      console.log(e)
    }
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
    },reject=>{
      console.log(reject)
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