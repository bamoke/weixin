// pages/course/detail/index.js
import { siteConf } from '../../../static/js/common';
var WxParse = require('../../../wxParse/wxParse.js');
//获取应用实例
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sourceUrl: siteConf.sourceUrl,
    showPage: false,
    courseId: null,//课程ID
    currentTab: 0,//当前tab's index
    sectionPage: 1,//当前章节页
    commentPage: 1,//当前评论页
    openVideo: false,//是否开始播放课程视频
    videoSource: null,//视频地址,
    hasCourse: false,//是否已购买此课程
    showShare:true,
    giftKey:null,//礼品包激活码
    wxparse_content: null,
    introduce: {},
    section: [],
    commentList: []
  },
  /**
   * 转发
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '送你一个课程礼品包',
      path: '/pages/gift/index?key='+this.data.giftKey,
      imageUrl: sourceUrl+"thumb/"+this.data.introduce.thumb,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * tab
   */
  swichNav: function (e) {
    var index = parseInt(e.target.dataset.index);
    var myPromise, curApiUrl, curModule;
    var curRequestData = { cid: this.data.courseId, page: 1 };
    var _that = this;
    var updateData = { currentTab: index }
    if (index == 1) {
      //查看目录
      if (this.data.section.length > 0) {
        _that.setData(updateData)
        return;
      }
      curApiUrl = '/Course/section';
      curRequestData.page = this.data.sectionPage;
    } else if (index == 2) {
      //查看评论
      if (this.data.commentList.length > 0) {
        _that.setData(updateData)
        return;
      }
      curApiUrl = '/Comment/getlist';
      curRequestData.page = this.data.commentPage;
      curRequestData.type = 2;
      curRequestData.proid = this.data.courseId;
    } else {
      _that.setData(updateData)
      return;
    }
    //2.1 get data and then to update

    myPromise = app._getApiData(curApiUrl, curRequestData);
    myPromise.then(data => {
      wx.hideLoading();
      if (index == 1) {
        updateData.section = data.sectionList
      } else if (index == 2) {
        updateData.commentList = data.list
      }
      _that.setData(updateData)
    })
  },
  /**
   * 开始学习课程
   */
  studyStart: function (data) {
    var index = data.currentTarget.dataset.index;
    var sectionId = this.data.section[index].id;
    var sectionType = this.data.section[index].type;
    var source = this.data.section[index].source;
    var _that = this;
    if (!this.data.hasCourse && this.data.introduce.isfree == 0) {
      wx.showModal({
        title: '提示',
        content: '你还未购买此课程，现在购买？',
        success: function (res) {
          if (res.confirm) {
            _that.buyCourse();
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })

    } else {
      wx.navigateTo({
        url: '../section/index?id=' + sectionId
      })

    }

  },

  /**
   * 购买课程
   */
  buyCourse: function () {
    var apiUrl = '/Orders/create';
    var requestData = { type: 2, proid: this.data.introduce.id }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      var nonceStr = data.info.nonceStr;
      var pkg = data.info.package;
      var timeStamp = data.info.timeStamp;
      var paySign = data.info.sign;
      wx.requestPayment({
        timeStamp: timeStamp,
        nonceStr: nonceStr,
        package: pkg,
        signType: 'MD5',
        paySign: paySign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/home/mycourse/index',
          })
        },
        fail: function (res) {
          wx.redirectTo({
            url: '/pages/home/orders/index',
          })
        }
      })
    }, err => {
      console.log(err)
    })
  },

  /**
   * 送好友
   */
  sendGift: function () {
    var courseId = this.data.courseId;
    var type = 2;
    this.buyconfirm.show();
  },

  /**
   * giftBuyConfirm
   */
  giftBuyConfirm: function () {

    var apiUrl = '/Orders/buypresent';
    var courseId = this.data.courseId;
    var proType = 2;
    var requestData = { proid: courseId, protype: proType }
    var myPromise = app._getApiData(apiUrl, requestData, "POST");
    myPromise.then(data => {
      wx.hideLoading();
      this.buyconfirm.hide();
      this.setData({
        showShare:true,
        giftKey:data.key
      })
    }, reject => {
      console.log(reject)
    })
  },
  /**
   * 发表评论
  */
  createComment: function () {
    wx.navigateTo({
      url: '../../common/comment/index?proid=' + this.data.courseId + '&type=2&title=' + this.data.introduce.title
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (typeof options.id == 'undefined') return;
    var _that = this;
    var apiUrl = '/Course/detail'
    var requestData = { id: options.id }
    var myPromise = app._getApiData(apiUrl, requestData);
    myPromise.then(data => {
      wx.hideLoading();
      //标签转换
      if (data.courseDetail.content) {
        WxParse.wxParse('wxparse_content', 'html', data.courseDetail.content, _that)
      }

      _that.setData({
        courseId: options.id,
        showPage: true,
        introduce: data.courseDetail,
        hasCourse: data.hasCourse
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.buyconfirm = this.selectComponent("#buyconfirm")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})