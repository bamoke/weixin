// pages/video/video.js
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

var assets = "/assets/";
Page({
  inputValue: '',
    data: {
      title: "奋达春晚彩排-白蛇传",
      desc: '奋达科技2017春晚第一次彩排，奋达智能参演节目《白蛇传》,不一样的试听享受。',
      create_time: '2017-01-15',
      userinfo: {
        avatar: assets + 'images/avatar-01.jpg',
        name: '快乐的小土豆'
      },
        src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }]
    },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
    console.log(this.inputValue)
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    this.videoContext = wx.createVideoContext('js-video');
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