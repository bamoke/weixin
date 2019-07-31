// pages/prepay/log/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curMonth:"2019-01",
    selectedMonth: "2019-01",
    logsList:[],
    page:1,
    hasMOre:false
  },
  bindDateChange:function(e){
    const month = e.detail.value
    this.setData({
      selectedMonth:month
    })
    this._fetchData();
  },
  
  // fetchData
  _fetchData:function(){
    const requestParams = {
      apiUrl: "/Recharge/index",
      requestData: {
        page:this.data.page,
        month:this.data.selectedMonth
      }
    }
    app.ajax(requestParams).then((data) => {
      this.setData({
        showPage: true,
        logsList: data.list,
        page: data.page,
        hasMore: data.hasMore
      })
    }).catch(function (msg) {
      console.log(msg)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const myDate = new Date();
    const year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    if(month < 10) {
      month = "0"+month
    }
    let yearMonth = year+"-"+month
    this.setData({
      curMonth: yearMonth,
      selectedMonth:yearMonth
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
    this._fetchData()
  }


 
})