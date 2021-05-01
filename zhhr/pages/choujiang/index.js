// pages/choujiang/index.js
import * as WxParse from '../../wxParse/wxParse.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    curId: null,
    choujiangInfo: {},
    awardInfo: [],
    myAwardIndex: -1,
    winUser:[],
    talentInfo:{},
    showModal:false,
    modalContent:'',//modal content type
    gainAward:{},//抽奖信息结果
    formData:{},
    userInfo:{},
    myLogList:[],//我的抽奖记录
    rules: [{
      name: 'realname',
      rules: {
        required: true,
        message: '请填写您的姓名或称呼'
      },
    },{
      name: 'phone',
      rules: {
        required: true,
        message: '请填写您的手机号码'
      },
    },{
      name: 'addr',
      rules: {
        required: true,
        message: '请填写您的收件地址'
      },
    }]
    
  },

  /**
   * 
   * @param {*} options 
   */
  handleDoAward() {
    // 检查活动状态
    if(this.data.choujiangInfo.stageError) {
      wx.showModal({
        content:`对不起！${this.data.choujiangInfo.stageError}`,
        showCancel: false
      })
      return false
    }
    
    // 检查是否有人才卡
  if(!this.data.talentInfo.id) {
    wx.showModal({
      content:`很抱歉！${this.data.talentInfo.msg}`,
      showCancel: false
    })
    return false
  }
    
    // 检查剩余次数
    if(this.data.choujiangInfo.remainingTime ==0 ){
      wx.showModal({
        content:"很抱歉!您今天的抽奖次数用完了，或者您已经中过一次奖品",
        showCancel: false
      })
      return false
    } 
    var requestParams = {
      apiUrl: "/Choujiang/doaward",
      requestData: {
        cid: this.data.curId
      },
      showLoading: false
    }
    app.ajax(requestParams).then(res => {
      var myAwardIndex,gainAward = res.data.awardInfo
      var awardArr = this.data.awardInfo
      for (var i = 0; i < awardArr.length; i++) {
        if (awardArr[i].id == gainAward.award_id) {
          myAwardIndex = i;
          break;
        }
      }
      this.setData({
        myAwardIndex,
        gainAward
      })
    })
  },
  /**
   * 动画结束
   */
  handleAnimationEnd(){
      var choujiangInfo = this.data.choujiangInfo
      choujiangInfo.remainingTime -= 1
      this.setData({
        choujiangInfo,
        showModal:true,
        modalContent:"result"
      })
  },
  /**
   * 表单公用事件
   */
  handleInput(e) {
    const value = e.detail.value
    const fieldName = e.currentTarget.dataset.name
    let newFormData = this.data.formData
    newFormData[fieldName] = value
    this.setData({
      formData: newFormData
    })
  },
  /**
   * 表单提交
   */
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        app.ajax({
          apiUrl: '/Choujiang/doform',
          requestData: {
            id:this.data.gainAward.id,
            ...this.data.formData
          },
          requestMethod: "POST"
        }).then(res => {
          var gainAward = this.data.gainAward
          gainAward.infoCompleted = true
          this.setData({
            gainAward
          })
        })
      }
    })
  },
  /**
   * 
   */
  handleShowLog(){
    app.ajax({
      apiUrl: '/Choujiang/mylog',
      requestData: {cid:this.data.curId}
    }).then(res => {
      this.setData({
        showModal:true,
        modalContent:'log',
        myLogList: res.data.list
      })
    })
  },
  /**
   * 
   */
  handleShowMyprize(){
    app.ajax({
      apiUrl: '/Choujiang/myaward',
      requestData: {cid:this.data.curId}
    }).then(res => {
      this.setData({
        showModal:true,
        modalContent:'result',
        gainAward: res.data.info
      })
    })
  },
  /**
   * 
   */
  handleCloseResult(){
    this.setData({
      showModal:false,
      modalContent:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.id) {
      app.errorBack({
        tips: "参数错误"
      })
      return false
    }
    this.setData({
      curId: options.id
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
    let requestParams = {
      apiUrl: "/Choujiang/detail",
      requestData: {
        id: this.data.curId
      }
    }
    app.ajax(requestParams).then(res => {
      var fullUser = res.data.winUser
      var winUser = []
      
      if (res.data.choujiangInfo.content) {
        WxParse.wxParse('wxparse_content', 'html', res.data.choujiangInfo.content, this)
      }

      this.setData({
        showPage: true,
        choujiangInfo: res.data.choujiangInfo,
        awardInfo: res.data.awardInfo,
        talentInfo:res.data.talentInfo,
        userInfo: res.data.userInfo,
        winUser:res.data.winUser
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
  onShareAppMessage: function () {

  }
})