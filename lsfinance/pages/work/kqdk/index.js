// pages/work/kqdk/index.js
const events = ['2018-08-01', '2018-08-03', '2018-08-12', '2018-08-17', '2018-08-23', '2018-08-28']
const events2 = ['2018-10-09', '2018-10-28']
function formatLocalDate(date){
  // console.log(typeof date)
  var dateObj;
  if(typeof date === 'undefined'){
    dateObj = new Date();
  }else {
    dateObj = new Date(date)
  }
  const weekDayArr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  let dateDay = dateObj.getDate();
  let weekDay = dateObj.getDay();
  return (month + 1) + '月' + dateDay + '日' + weekDayArr[weekDay]
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initDate: {yearMonth:'2018-08',events},
    formatDate: formatLocalDate(),
    curDate:'',
    isSigned:false
  },
  selectDate: function(e) {
    console.log(e)
  },
  switchMonth: function(e) {
    var curYearMonth = e.detail.date;
    var updateData = { yearMonth: curYearMonth,events:[]}
    if (curYearMonth == '2018-10'){
      updateData.events = events2
    } else if (curYearMonth == '2018-08') {
      updateData.events = events
    }
    this.setData({
      initDate: updateData
    })
  },
  /**
   * Handle sign
   */
  handleSign:function(){
    this.setData({
      isSigned:true
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})