// pages/map/map.js
var assets = '../../assets/';
Page({
  data: {
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
    ],
    longitude: 113.3245211,
    latitude: 23.10229,
    scale: 17,
    markers: [{
      iconPath: "/assets/images/i-addr-2.png",
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 24,
      height: 24,
      title: '转让帅气男友'
    }],
    // polyline: [{
    //   points: [{
    //     longitude: 113.903504,
    //     latitude: 22.676873
    //   }, {
    //     longitude: 113.324520,
    //     latitude: 23.21229
    //   }],
    //   color:"#FF0000DD",
    //   width: 2,
    //   dottedLine: true
    // }],
    // controls: [{
    //   id: 1,
    //   iconPath: '/assets/images/i-addr-2.png',
    //   position: {
    //     left: 0,
    //     top: 300 - 50,
    //     width: 24,
    //     height: 24
    //   },
    //   clickable: true
    // }]
    
  },

  /* ====map event==== */
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /* ===page event=== */
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getLocation({
      //获取坐标
      type: 'wgs84',
      success: function(res) {
        //定义新数据
        var newMarkers = that.data.markers;
        newMarkers[0].latitude = res.latitude;
        newMarkers[0].longitude = res.longitude;
        newMarkers[1] = {
          iconPath: "/assets/images/i-addr-2.png",
          id: 1,
          latitude: 22.671462,
          longitude: 113.896723,
          width: 24,
          height: 24
        };
        newMarkers[2] = {
          iconPath: "/assets/images/i-addr-2.png",
          id: 2,
          latitude: 22.672254,
          longitude: 113.899577,
          width: 24,
          height: 24
        }
        //更新数据
        that.setData({
          latitude : res.latitude,
          longitude : res.longitude,
          markers : newMarkers
        })
        console.log(res.latitude+";"+res.longitude)
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