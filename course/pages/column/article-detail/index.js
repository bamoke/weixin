// pages/video/video.js
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
import util from "../../../utils/util"
import { siteConf } from "../../../static/js/common";
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()


Page({
  data: {
    sourceUrl: siteConf.sourceUrl,
    ossUrl: siteConf.ossUrl,
    showPage: false,
    curId: null,//当前章节id
    columnId: null,//专栏id
    authStatus: 0,
    articleId: null,
    commentPage: 1,//当前评论页码
    hasMoreComment: false,//是否还有更多评论
    article: {},
    commentList: []

  },
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },


  /**
    * 发表评论
   */
  createComment: function () {
    wx.navigateTo({
      url: '../../common/comment/index?proid=' + this.data.articleId + '&type=1&title=' + this.data.article.title
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      curId: options.id,
      columnId:options.cid
    })
  },
  onReady: function () {
    // 页面渲染完成
    // this.videoContext = wx.createVideoContext('js-video');

  },
  onShow: function () {
    const requestParams = {
      apiUrl: '/Columnist/articledetail',
      requestData:{id:this.data.curId,cid:this.data.columnId},
      isShowLoad:false
    }
    const myPromise = util.request(requestParams);
    // 头部Bar加载动画
    wx.showNavigationBarLoading()
    myPromise.then(data => {
      // hide NavigationBarLoading
      wx.hideNavigationBarLoading()
      
      //标签转换
      if (data.articleInfo.content) {
        WxParse.wxParse('wxparse_content', 'html', data.articleInfo.content, this)
      }
      //Update bar title
      wx.setNavigationBarTitle({
        title: data.articleInfo.title
      })
      //设置audio
      if (data.articleInfo.type == 2) {
        this.setData({
          audioSrc: siteConf.ossUrl + "/audio/" + encodeURI(data.articleInfo.source)
        })
      }

      // Update page data
      this.setData({
        showPage: true,
        article: data.articleInfo,
        commentList: data.commentList
      })
    });

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})