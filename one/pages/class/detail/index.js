//index.js
//获取应用实例
const app = getApp()
import util from "../../../utils/util"

Page({
  data: {
    showPage: false,
    hasMore:false,
    courseId:null,
    curPage:1,
    banner: "",
    dynamicList: []
  },

  onLoad: function(options) {
    const courseId = options.courseid
    const params = {
      apiUrl: "/Myclass/detail",
      requestData: {
        courseid: courseId
      },
      requestMethod: "GET"
    }
    this.setData({
      courseId
    })
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        courseName:res.data.title,
        dynamicList: res.data.list,
        hasMore:res.data.hasMore
      })
    },reject=>{
      if (reject.code == 14001) {
        wx.showModal({
          content: reject.msg,
          confirmText:"返回",
          showCancel:false,
          success:function(res){
            if(res.confirm){
              wx.switchTab({
                url: '/pages/course/index/index',
              })
            }
          }
        })
      }
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    if (!this.data.hasMore) return;
    let postData = {
      courseid:this.data.courseId,
      p: this.data.curPage + 1
    }
    console.log(postData)
    const requestParams = { 
      apiUrl: "/Myclass/vlist",
      requestMethod: "GET",
      requestData: postData
    }
    const ajaxRequest = util.request(requestParams)
    ajaxRequest.then(res => {
      this.setData({
        hasMore: res.data.hasMore,
        dynamicList: this.data.dynamicList.concat(res.data.list),
        curPage: res.data.page
      })
    })
  }


})