// pages/talent/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    info: null,
    industrialTalentTips: false,
    talentRights:[]
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
    let info = {
      id: 1,
      realname: "金英助手",
      card_no: "1909002",
      start_date: "2019-09-01",
      end_date: "2020-09-01",
      expired: 0
    }
    var requestParams = {
      apiUrl: "/Talent/index"
    }
    app.ajax(requestParams).then(res => {
      if (res.data.info) {
        if (res.data.info.card_no) {
          this.setData({
            info: res.data.info,
            talentRights: res.data.talentRights,
            showPage: true
          })
        } else {
          wx.redirectTo({
            url: '../result/index',
          })
        }
      } else {
        wx.redirectTo({
          url: '../form/index',
        })
      }
    }, reject => {
      if (reject.code === 13009) {
        // 产业人才查询结果为不存在
        this.setData({
          industrialTalentTips: true,
          showPage: true
        })
      }
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

  }


})