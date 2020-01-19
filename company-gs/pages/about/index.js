//index.js
//获取应用实例
const app = getApp()
import * as WxParse from '../../wxParse/wxParse.js'

Page({
  data: {
    showPage:false,
    banner:"",
    companyInfo: ''
  },

  onLoad: function () {
    app.ajax({
      apiUrl: '/Index/index'
    }).then(res=>{
      if(res.data.companyInfo.content) {
        WxParse.wxParse('wxparse_company_content', 'html', res.data.companyInfo.content, this,12)
      }
      if (res.data.teamInfo.content) {
        WxParse.wxParse('wxparse_team_content', 'html', res.data.teamInfo.content, this,12)
      }
      this.setData({
        showPage:true,
        banner:res.data.banner
      })
    })
  },

})
