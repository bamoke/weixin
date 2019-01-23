// pages/course/detail/index.js
import { siteConf } from '../../../static/js/common';
var WxParse = require('../../../wxParse/wxParse.js');
import util from "../../../utils/util"
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
    isCollection:false,//是否已收藏
    showShare: false,
    giftKey: null,//礼品包激活码
    wxparse_content: null,
    introduce: {},
    section: [],
    commentList: [],
    orderInfo:{},//订单内容
    operatorType:'',//订单类型，直接购买或是赠送
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
        this.setData(updateData)
        return;
      }
      curApiUrl = '/Course/section';
      curRequestData.page = this.data.sectionPage;
    } else if (index == 2) {
      //查看评论
      if (this.data.commentList.length > 0) {
        this.setData(updateData)
        return;
      }
      curApiUrl = '/Comment/getlist';
      curRequestData.page = this.data.commentPage;
      curRequestData.type = 2;
      curRequestData.proid = this.data.courseId;
    } else {
      this.setData(updateData)
      return;
    }
    //2.1 get data and then to update
    const requestParams = {
      apiUrl:curApiUrl,
      requestData: curRequestData
    }
    myPromise = util.request(requestParams);
    myPromise.then(data => {
      if (index == 1) {
        updateData.section = data.sectionList
      } else if (index == 2) {
        updateData.commentList = data.list
      }
      this.setData(updateData)
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
    var sectionUrl = '../section/index?id=' + sectionId;
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
        url: sectionUrl
      })

    }

  },

  /**
   * 购买课程
   */
  buyCourse: function () {
    const requestParams = {
      apiUrl:'/Orders/create',
      requestData : { type: 2, proid: this.data.introduce.id }
    }
    var myPromise = util.request(requestParams);
    myPromise.then(data => {
      wx.requestPayment({
        timeStamp: data.timeStamp,
        nonceStr: data.nonceStr,
        package: data.package,
        signType: 'MD5',
        paySign: data.sign,
        success: function (res) {
          wx.redirectTo({
            url: '/pages/home/mycourse/index',
          })
        },
        fail: function (res) {
          // wx.hideLoading();
/*           wx.redirectTo({
            url: '/pages/home/orders/index',
          }) */
        }
      })
    }, err => {
      console.log(err)
    })
  },

  /**
   * 确认订单
   */
  confirmOrder: function (e) {
    var courseId = this.data.courseId;
    var type = e.currentTarget.dataset.type;
    this.buyconfirm.show();
    this.setData({
      operatorType:type
    })
  },
  /**
   * 确认支付
  */
  orderPay:function(){
    const operatorType = this.data.operatorType
    if (operatorType == 'gift') {
      this.giftBuyConfirm()
    } else{
      this.buyCourse()
    }
  },
  /**
   * 课程收藏
   */
  collectionCourse:function(){
    const courseId=this.data.courseId
    const requestParams = {
      apiUrl: '/Collection/docollect',
      requestData: { proid: courseId, type: 2},
      requestMethod:"POST"
    }
    var myPromise = util.request(requestParams);
    myPromise.then(res=>{
      this.setData({
        isCollection:!this.data.isCollection
      })
    })
  },
  /**
   * giftBuyConfirm
   */
  giftBuyConfirm: function () {
    const _that = this
    var courseId = this.data.courseId;
    const requestParams = {
      apiUrl : '/Orders/buypresent',
      requestData : { proid: courseId, protype: 2, type: 5 },
      requestMethod:"post"
    }
    var myPromise = util.request(requestParams);
    myPromise.then(data => {
      this.buyconfirm.hide();
      this.setData({
        giftKey:data.key
      })
      if (typeof data.payMent !=='undefined'){
        wx.requestPayment({
          timeStamp: data.payMent.timeStamp,
          nonceStr: data.payMent.nonceStr,
          package: data.payMent.package,
          signType: 'MD5',
          paySign: data.payMent.sign,
          success: function (res) {
            _that.sharemodal.show()
          },
          fail: function (res) {
            console.log(res)
          }
        })
      }else {
        _that.sharemodal.show();
      }
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
    this.setData({
      courseId:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.buyconfirm = this.selectComponent("#buyconfirm")
    this.sharemodal = this.selectComponent("#shareModal")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const requestParams = {
      apiUrl : '/Course/detail',
      requestData: { id: this.data.courseId }
    }
    var myPromise = util.request(requestParams);
    myPromise.then(data => {
      //标签转换
      if (data.courseDetail.content) {
        WxParse.wxParse('wxparse_content', 'html', data.courseDetail.content, this)
      }

      //update data
      this.setData({
        showPage: true,
        introduce: data.courseDetail,
        hasCourse: data.hasCourse,
        isCollection:data.isCollection
      })
      //update bar title
      wx.setNavigationBarTitle({
        title: data.courseDetail.title
      })
    })
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
  onShareAppMessage: function (res) {
    var _that = this;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      if (res.target.id == 'gift') {
        return {
          title: '送你一个课程礼品包',
          path: '/pages/gift/index?key=' + this.data.giftKey,
          imageUrl: siteConf.sourceUrl + "thumb/" + this.data.introduce.thumb,
          success: function (res) {
            // 转发成功
            _that.sharemodal.hide()
          },
          fail: function (res) {
            // 转发失败
          }
        }
      }
    }
    return {
      title: this.data.introduce.title,
      imageUrl: siteConf.sourceUrl + "thumb/" + this.data.introduce.thumb
    }

  }
})