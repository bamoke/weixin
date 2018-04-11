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
const audioTestSrc ="http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46";

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
    },
    next:{
      type:null,
      value:null
    },
    prev:{
      type:null,
      value:null
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    playModel:1,//1:默认,顺序播放,2:单节循环
    curTime: "00:00",
    timeLong: "00:00",
    canPlay: false,
    audioStatus: 1,//1:播放中;2:暂停中,
    curProgressNum: initialProgressNum//当前播放进度条
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play: function () {
      if(innerAudio.src == ''){
        innerAudio.src = this.data.src;
        innerAudio.title = this.data.title;
        innerAudio.coverImgUrl = this.data.cover
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
     * play prev
     */
    playPrev:function(){
      var myEventDetail = {
        curAudio:innerAudio
      }
      this.triggerEvent("playprev",myEventDetail)
    },
    /**
     * play next
     */
    playNext:function(){
      this.triggerEvent("playnext", {curAudio: innerAudio})
    },
    /**
     * Change play model
     */
    changePlayModel:function(){
      var curModel = this.data.playModel
      this.setData({
        playModel: curModel==1?2:1
      })
      wx.showToast({
        title: curModel == 1 ? "单节循环" : "顺序播放",
        icon:"none"
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

    //Audio setting
    // innerAudio.autoplay = false;//for createInnerAudioContext
    innerAudio.src = this.data.src;
    innerAudio.title = this.data.title;
    innerAudio.coverImgUrl = this.data.cover
    if (typeof audioStorageSeek !== 'undefined') {
      innerAudio.seek(audioStorageSeek);
      console.log("storage:" + audioStorageSeek)
    } 
    
    //设置初始化数据
    // 获取progress width
    query.exec(function (res) {
      progressWidth = res[0].width - 14
      // console.log(progressWidth)
    })




    /**
     * Audio method
     */

    /**
     * Event on play
     * set storage
     */
     innerAudio.onPlay(() => {
       var pages = getCurrentPages();
       var curPage = pages[pages.length - 1];
       var pageParam="?";
       var curUrl;
       for (var item in curPage.options){
         pageParam += item + "=" + curPage.options[item]+"&";
       }
       curUrl = "/"+curPage.route + pageParam.slice(0,-1);
       //set storage
       wx.setStorage({
         key: "audioPage",
         data: curUrl
       })
       
    }) 
    
     //Canplay The callback function 
     innerAudio.onCanplay(function (res) {
       var audioStorageSeek = wx.getStorageSync("audioSeek");
       setTimeout(function () {
         var durationNum = parseInt(innerAudio.duration);
         _that.setData({
           timeLong: commonFunc.formatTime(innerAudio.duration)
         })
         ratio = progressWidth / innerAudio.duration
         _that.setData({
           canPlay: true,
           audioStatus: 1,
           timeLong: commonFunc.formatTime(durationNum)
         })
         // reset seek
         if (typeof audioStorageSeek !== 'undefined') {
           innerAudio.seek(audioStorageSeek);
         }
       }, 500)
     })

    // playing
    innerAudio.onTimeUpdate(function (data) {
      var oldProgressNum = _that.data.curProgressNum;
      var currentTime = innerAudio.currentTime;
      if (!canUpdateTime) return;
      _that.setData({
        curProgressNum: (parseInt(currentTime * ratio)) + initialProgressNum,
        curTime: commonFunc.formatTime(parseInt(currentTime))
      })
      //update audio storage
      wx.setStorageSync("audioSeek", currentTime)
    })

  

    // play end 
    innerAudio.onEnded(function () {
      _that.setData({
        curProgressNum: initialProgressNum,
        audioStatus: 2,
        curTime: "00:00"
      })
      _that.data.playModel === 2 && _that.play();
      if(_that.data.playModel === 1){
          _that.playNext();//顺序播放
      }else {
        _that.play();//单节循环
      }
      // destroy audio storage
      wx.removeStorageSync('audioPage')
      wx.removeStorageSync('audioSeek')
    })

    //innerAudio paused
    innerAudio.onPause(function(){
      // destroy audio storage
      wx.removeStorageSync('audioPage')
      wx.removeStorageSync('audioSeek')
    })

    // innerAudio stop
    innerAudio.onStop(function(){
      wx.removeStorageSync('audioPage')
      wx.removeStorageSync('audioSeek')
    })
    // innerAudio onError
    innerAudio.onError(function(res){
      console.log(res)
    })

    // innerAudio onWaiting
    innerAudio.onWaiting(function(){
      console.log("waiting")
    })


  }
})
