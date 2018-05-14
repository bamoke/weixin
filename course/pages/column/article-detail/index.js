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
import { siteConf } from "../../../static/js/common";
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()


Page({
  data: {
    sourceUrl: siteConf.sourceUrl,
    ossUrl: siteConf.ossUrl,
    showPage: false,
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
    var id = options.id;
    var _that = this;
    var apiUrl = '/Columnist/articledetail'
    var requestData = { id: id }
    var myPromise;
    this.setData({
      articleId: id
    })
    myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      //标签转换
      if (data.articleInfo.content) {
        WxParse.wxParse('wxparse_content', 'html', data.articleInfo.content, _that)
      }
      //Update bar title
      wx.setNavigationBarTitle({
        title: data.articleInfo.title
      })
      //设置audio
      if (data.articleInfo.type == 2) {
        _that.setData({
          audioSrc: siteConf.ossUrl + "/audio/" +encodeURI(data.articleInfo.source)
        })
      }

      // Update page data
      _that.setData({
        showPage: true,
        article: data.articleInfo,
        commentList: data.commentList
      })
    });


  },
  onReady: function () {
    // 页面渲染完成
    // this.videoContext = wx.createVideoContext('js-video');

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})