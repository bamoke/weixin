// pages/customer/index/index.js

// 语音
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotList: [],
    recorDduration: 15000,
    recordActive: false,
    canUseRecord: true
  },

  /**
   * Methods
   */
  handleCall(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  goSearch() {
    wx.navigateTo({
      url: '../search/index'
    })
  },
  startRecord(e) {
    if (!this.data.canUseRecord) {
      this._goSetAuth()
      return
    }
    manager.start({
      duration: this.data.recorDduration,
      lang: "zh_CN"
    })
  },
  stopRecord() {
    if (this.data.recordActive) {
      wx.showLoading({
        title: '识别中…'
      })
      manager.stop()
    }
    this.setData({
      recordActive: false
    })
  },
  // 提示用户授权
  _goSetAuth(){
    const _that = this
    wx.showModal({
      title: '录音功能未授权',
      content: '如要使用语音请先授权',
      confirmText: '现在授权',
      success:function(result){
        if(result.confirm) {
          wx.openSetting({
            success(res){
              if(res.authSetting['scope.record']) {
                _that.setData({
                  canUseRecord: true
                })
              }else {
                wx.showToast({
                  title: '授权失败',
                  icon: 'none'
                })
                _that.setData({
                  canUseRecord: false
                })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const _that = this
  
    // 注册语音事件

    manager.onRecognize = function(res) {
      // console.log("current result", res.result)
    }
    manager.onStop = function(res) {
      // console.log("record file path", res.tempFilePath)
      wx.hideLoading()
      var keyword = res.result.trim();
      keyword = keyword.substr(0, keyword.length - 1)

      if (keyword.length <= 1) {
        wx.showToast({
          title: "您说的太少了",
          icon: 'none'
        })
        return
      }
      wx.navigateTo({
        url: '../voicesearch/index?keyword=' + keyword
      })
    }
    manager.onStart = function(res) {
      // console.log("成功开始录音识别", res)
      _that.setData({
        recordActive: true
      })
    }
    manager.onError = function(res) {
      console.error("error msg", res)
      const errText ={
        '-30003':'时间太短无法识别',
        '-30011':'正在识别'
      }
      wx.showToast({
        title: errText[res.retcode] || res.msg,
        icon: 'none'
      })
      // manager.stop()
      _that.setData({
        recordActive: false
      })
    }

    var requestParams = {
      apiUrl: "/CustomerService/index"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        hotList: res.data.list
      })
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function() {
    const _that =this
    // 获取授权数据
    wx.getSetting({
      success(res) {
        // console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              _that.setData({
                canUseRecord: true
              })
            },
            fail() {
              _that.setData({
                canUseRecord: false
              })
            }
          })

        }
      }
    })
  },





  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})