// pages/work/fybx/index.js
const app = getApp();
const curDate = new Date();
const year = curDate.getFullYear();
var month = curDate.getMonth() + 1;
month = month < 10 ? "0" + month : month
var curMonth = [year, month].join("-")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comId:null,
    showPage: false,
    pageInfo: 1,
    list: [],
    toMonth: curMonth,
    curStaff:"",
    curMonth: "",
    spStatusArr:["全部","待审批","通过","未通过"],
    curSpStatus:""
  },

  /**
   * Methods
   */
  handleStatusChange(e){
    const index = e.detail.value
    var curSpStatus = index == 0 ? "" : this.data.spStatusArr[index]
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
        comid: this.data.comId,
        month: this.data.curMonth,
        staff: this.data.curStaff,
        sp_status:curSpStatus
      }
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        curSpStatus,
        list: res.list
      })
    })
  },
  handleMonthChange: function (e) {
    const curMonth = e.detail.value
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
        comid: this.data.comId,
        month: curMonth,
        staff: this.data.curStaff,
        sp_status: this.data.curSpStatus
      }
    }

    app.ajax(requestParams).then(res => {
      this.setData({
        curMonth,
        list: res.list
      })
    }, reject => {

    })
  },

  handleStaffChange(e){
    var value = e.detail.value
    const staffArr = this.data.staffArr
    var curStaff = value == 0 ? '' : staffArr[value].name

    const curMonth = e.detail.value
    var requestData = {
      comid: this.data.comId
    }
    if(this.data.curMonth) {
      requestData.month = this.data.curMonth
    }
    if (this.data.curMonth) {
      requestData.sp_status = this.data.curSpStatus
    }
    if(curStaff) {
      requestData.staff = curStaff
    }
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        curStaff,
        list: res.list
      })
    }, reject => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    const staffArr = wx.getStorageSync("staffData")
    if (!curComInfo) {
      app.errorBack("访问参数错误")
    }else {
      this.setData({
        comId: curComInfo.comId,
        staffArr : [{name:'全部'}].concat(staffArr)
      })
    }
   

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData: {
        comid: this.data.comId
      }
    }
  app.ajax(requestParams).then((res) => {
      this.setData({
        showPage:true,
        list:res.list,
        pageInfo:res.pageInfo
      })
    }).catch(function(msg) {
/*       setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000) */
    })

  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    const navIndex = this.data.curNavIndex
    var requestData = {
      comid: this.data.comId
    }

    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData
    }
    app.ajax(requestParams).then((data) => {
      wx.stopPullDownRefresh();
      this.setData({
        list: data.list,
        pageInfo: data.pageInfo,
        curMonth: "",
        curStaff: "",
        curSpStatus: ""
      })
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var oldList = this.data.list
    var pageInfo = this.data.pageInfo
    if (pageInfo.total <= (pageInfo.pageSize * pageInfo.page)) {
      return
    }

    var requestData = {
      comid: this.data.comId,
      page: parseInt(pageInfo.page) + 1
    }
    if (this.data.curMonth) {
      requestData.month = this.data.curMonth
    }
    if (this.data.curStaff) {
      requestData.staff = this.data.curStaff
    } 
    if (this.data.curSpStatus) {
      requestData.sp_status = this.data.curSpStatus
    }

    const requestParams = {
      apiUrl: "/Expenses/vlist",
      requestData
    }
    app.ajax(requestParams).then((res) => {
      this.setData({
        list: oldList.concat(res.list),
        pageInfo: res.pageInfo
      })
    }).catch(function (msg) {
      /*       setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1000) */
    })
  }

})