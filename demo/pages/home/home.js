// pages/userhome/home.js
var app = getApp();
var assets = '../../assets/';


Page({
  data:{
    home_bg_img : assets + 'images/user-home-bg.jpg',
    userinfo :{}
    
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.login({
      success: function(res){
        // success
        wx.getUserInfo({
          success: function(res){
            // success
            that.setData({
              userinfo:res.userInfo
            })
            
            console.log(that)
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})

