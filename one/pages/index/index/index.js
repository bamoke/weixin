//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    circular:true,
    indicatorColor:"#C4C4C4",
    indicatorActiveColor:"#1B7ED5",
    swiperItems:[{'img':'/common/images/banner1.png'},{'img':'/common/images/banner1.png'},{'img':'/common/images/banner1.png'}]
  },
  goPartIndex:function(){
    wx.navigateTo({
      url: '/pages/index/partindex/partindex'
    });
  },
  goheadHunt:function(){
    wx.navigateTo({
      url: '/pages/index/headhuntindex/headhuntindex'
    });
  },
  onLoad: function () {
    wx.setNavigationBarTitle({ title: '首页' });
  }
})
