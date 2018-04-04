// component/xz-audio/xzaudio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src:{
      type:String,
      value:""
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    curTime:"00:00",
    timeLong:"00:00",
    canPlay:false,
    audioStatus:1//0:不可播放;1:播放中;2:暂停中
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play:function(){
      console.log("play")
    }
  },
  ready:function(){
    var audioSrc = this.data.src;
    var myAudio = wx.getBackgroundAudioManager();
    myAudio.src= audioSrc;
    myAudio.onCanplay(function(e){
console.log("ss");
    })

/*     this.setData({
      timeLong: myAudio.duration
    }) */
    // console.log(myAudio);
/*     wx.playBackgroundAudio({
      dataUrl: audioSrc,
      title: 'test',
      coverImgUrl: ''
    }) */
    // console.log(myAudio.duration)
  }
})
