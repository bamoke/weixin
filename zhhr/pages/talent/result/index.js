// pages/talent/result/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stage: 0,
    zlStageStyle:"",
    ptStageStyle:"",
    zfStageStyle:"",
    stageDescription: "",
    reason: "",
    hasError:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let requestParams = {
      apiUrl: "/Talent/result"
    }
    app.ajax(requestParams).then(res => {
      var status = parseInt(res.data.info.verify_status)
      var zlStageStyle = '',
        ptStageStyle = '',
        zfStageStyle = '',
        stageDescription = '',
        stage = 1,
        hasError = false
      switch (status) {
        case 1:
          zlStageStyle = "success"
          ptStageStyle = "cur"
          stageDescription = '资料已提交,请耐心等待平台初审！'
          break;
        case 2:
          zlStageStyle = "success"
          ptStageStyle = "error"
          stageDescription = '平台初审未通过，未通过原因：' + res.data.info.reason
          hasError = true
          break;
        case 3:
        case 4:
          zlStageStyle = "success"
          ptStageStyle = "success"
          zfStageStyle = "cur"
          stageDescription = '平台审核已通过,请等待政府单位认证'
          break;
        case 5:
          zlStageStyle = "success"
          ptStageStyle = "success"
          zfStageStyle = "error"
          stageDescription = '政府单位认证未通过，未通过原因：' + res.data.info.reason
          hasError = true
          break;
        case 6:
          zlStageStyle = "success"
          ptStageStyle = "success"
          zfStageStyle = "success"
          stageDescription = '认证成功'
          break;
      }
      this.setData({
        id:res.data.info.id,zlStageStyle, ptStageStyle, zfStageStyle, stageDescription,hasError
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },


})