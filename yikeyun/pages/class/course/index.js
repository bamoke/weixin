// pages/class/course/index.js
const app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    courseList:[],
    pageInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(typeof options.id === 'undefined') {
      app.errorBack()
      return false
    }
    this.setData({
      classId:options.id
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
    const params = {
      apiUrl: "/Index/course",
      requestData: {classid:this.data.classId},
      requestMethod: "GET"
    }
    const ajaxRequest = app.ajax(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        courseList: res.data.list,
        pageInfo: res.data.pageInfo
      })
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    const pageInfo = this.data.pageInfo
    var oldList = this.data.courseList
    let requestParams = {
      apiUrl: '/Index/course',
      requestData: {
        classid: this.data.classId,
        page: parseInt(pageInfo.page) + 1
      }
    }
    if (pageInfo.total > pageInfo.page * pageInfo.pageSize) {
      app.ajax(requestParams).then(res => {
        this.setData({
          pageInfo: res.data.pageInfo,
          courseList: oldList.concat(res.data.list)
        })
      })
    }
  }


})