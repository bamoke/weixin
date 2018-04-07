// component/xz-audio/xzaudio.js
import { commonFunc } from "../../static/js/common.js";
var startNum = 0;
var moveStartNum;
var progressWidth = 0;
const innerAudio = wx.getBackgroundAudioManager();
// const innerAudio = wx.createInnerAudioContext();
var ratio = 0;
var duration;
const initialProgressNum = 0;
var canUpdateTime = true;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ""
    },
    title:{
      type:String,
      value:""
    },
    cover:{
      type:String,
      value:""
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    curTime: "00:00",
    timeLong: "00:00",
    canPlay: false,
    audioStatus: 1,//1:播放中;2:暂停中,
    curProgressNum: initialProgressNum
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play: function () {
      if(innerAudio.src == ''){
        innerAudio.src = this.data.src;
      }
      innerAudio.play();
      this.setData({
        audioStatus: 1
      })
    },
    pause: function () {
      innerAudio.pause();
      this.setData({
        audioStatus: 2
      })
    },
    /**
     * Touch start
     */
    btnTouchStart: function (data) {
      //如果没触发获取duration，ratio计算后为0；重新获取duration计算比率
      if (ratio === 0) {
        ratio = progressWidth / innerAudio.duration
      }
      canUpdateTime = false;
      moveStartNum = startNum = data.changedTouches[0].clientX;
    },

    /**
     * Touch move
     */
    btnTouchMove: function (data) {
      var endNum = data.changedTouches[0].clientX
      var oldProgressNum = this.data.curProgressNum;
      var newProgressNum;
      newProgressNum = oldProgressNum + endNum - moveStartNum;
      moveStartNum = endNum;
      if (newProgressNum < initialProgressNum) {
        newProgressNum = initialProgressNum
      }
      if (newProgressNum > progressWidth) {
        newProgressNum = progressWidth
      }
      this.setData({
        curTime: commonFunc.formatTime(parseInt(newProgressNum / ratio)),
        curProgressNum: newProgressNum
      });
    },

    /**
     * Touch end
     */
    btnTouchEnd: function (data) {
      var endNum = data.changedTouches[0].clientX
      var oldProgressNum = this.data.curProgressNum;
      var newProgressNum = oldProgressNum + endNum - moveStartNum;
      if (newProgressNum < initialProgressNum) {
        newProgressNum = initialProgressNum
      }
      if (newProgressNum > progressWidth) {
        newProgressNum = progressWidth
      }
      this.setData({
        curTime: commonFunc.formatTime(parseInt(newProgressNum / ratio)),
        curProgressNum: newProgressNum
      });
      //设置音频播放位置
      innerAudio.seek(newProgressNum / ratio);
      //暂停时间更新
      canUpdateTime = true;
    }
  },
  ready: function () {
    const _that = this;
    var audioSrc = this.data.src;
    var query = wx.createSelectorQuery().in(this);
    var progressDom = query.select('#js-progress').boundingClientRect();

    //audio setting
    // innerAudio.autoplay = false;//for createInnerAudioContext
    innerAudio.src = this.data.src;
    innerAudio.title = this.data.title;
    innerAudio.coverImgUrl = this.data.cover
    
    //设置初始化数据
    // 获取progress width
    query.exec(function (res) {
      console.log(res);
      progressWidth = res[0].width - 14
      console.log(progressWidth)
    })


    setTimeout(function(){
      _that.setData({
        timeLong: commonFunc.formatTime(innerAudio.duration)
      })
      ratio = progressWidth / innerAudio.duration

      var durationNum = parseInt(innerAudio.duration);
      _that.setData({
        canPlay: true,
        audioStatus: 1,
        timeLong: commonFunc.formatTime(durationNum)
      })
      console.log(durationNum)

    },500)
    // audio method
    innerAudio.pause(); 
/*     innerAudio.onPlay(() => {
      _that.setData({
        timeLong: commonFunc.formatTime(innerAudio.duration)
      })
      ratio = progressWidth / innerAudio.duration
      console.log("s" + progressWidth)
    }) */
    // playing
    innerAudio.onTimeUpdate(function (data) {
      var oldProgressNum = _that.data.curProgressNum;
      var currentTime = innerAudio.currentTime;
      if (!canUpdateTime) return;
      _that.setData({
        curProgressNum: (parseInt(currentTime * ratio)) + initialProgressNum,
        curTime: commonFunc.formatTime(parseInt(currentTime))
      })
      // console.log(currentTime)
    })

    //canplay

    innerAudio.onCanplay(function (res) {

    })

    // play end 
    innerAudio.onEnded(function () {
      _that.setData({
        curProgressNum: initialProgressNum,
        audioStatus: 2,
        curTime: "00:00"
      })
    })


  }
})
