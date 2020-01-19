// pages/headhunter/recommend/index.js
const app = getApp()
import util from "../../../utils/util"
import * as WxParse from '../../../wxParse/wxParse.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    tel:'',
    email:'',
    contacts:'',
    content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const params = {
      apiUrl: "/Headhunter/contact",
      requestMethod: "GET"
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      var info = res.data.info
      if (info.content) {
        WxParse.wxParse('wxparse_content', 'html', info.content, this)
      }
      this.setData({
        showPage: true,
        tel: info.tel,
        email: info.email,
        contacts: info.contacts
      })
    })
  }

 
})