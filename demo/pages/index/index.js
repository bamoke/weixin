//index.js
//获取应用实例
var app = getApp();
var assets = '../../assets/';
Page({
  data: {
    motto: 'Hello wld',
    banner: "http://img.zcool.cn/community/01135556d56e2832f875520f4c7f18.jpg",
    pro_list:[
      {
        name:'苹果6plus 玫瑰金 128G',
        price:'3869',
        username:'快乐的小土豆',
        avatar: assets + 'images/avatar-01.jpg',
        addr: '深圳-龙华',
        images:[
          assets + 'images/image-01.jpg',
          assets + 'images/image-02.jpg',
          assets + 'images/image-03.jpg',
          assets + 'images/image-04.jpg',
          assets + 'images/image-05.jpg'
        ]
      },
      {
        name:'日产逍客 2.0L 豪华版',
        price:'122869',
        username:'苦逼的程序猿',
        avatar: assets + 'images/avatar-02.jpg',
        addr: '深圳-宝安',
        images:[
          assets + 'images/image-06.jpg',
          assets + 'images/image-07.jpg',
          assets + 'images/image-08.jpg',
          assets + 'images/image-09.jpg'
        ]
      },
      {
        name:'半包精白沙 送火柴',
        price:'4.5',
        username:'郁闷的印佬',
        avatar: assets + 'images/avatar-03.jpg',
        addr: '珠海-香洲',
        images:[
          assets + 'images/image-10.jpg',
          assets + 'images/image-11.jpg',
          assets + 'images/image-12.jpg'
        ]
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
