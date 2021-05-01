// components/zhuanpan/zhuanpan.js
const colorArr = [
  '#EE534F',
  '#FF7F50',
  '#FFC928',
  '#66BB6A',
  '#42A5F6',
  '#5C6BC0',
  '#AA47BC',
  '#EC407A',
  '#FFB6C1',
  '#FFA827'
]
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    awardConfig: {
      type: Array,
      value: []
    },
    selectedIndex: {
      type: Number,
      value: -1
    },
    size: {
      type: Number,
      value: 660
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    awardArr: [],
    myawaedIndex: -1,
    animationData: {},
    runStage: 0 //0:未执行1:执行中;2:执行完毕
  },
  observers: {
    'awardConfig': function (newValue) {
      if (!newValue) {
        return
      }
      let award = newValue,
        awardLength = award.length,
        newAward = []
      newAward = award.map((item, index) => {
        var a, base;
        base = 360 / awardLength
        item.bg = colorArr[index]
        if (awardLength == 4) {
          item.skew = 0
          item.rotate = base * index
        } else if (awardLength < 4) {
          a = (base - 90)
          item.skew = a
          item.rotate = (base) * index
        } else {
          a = (base - 90)
          item.skew = a
          item.rotate = (base) * index
        }

        item.fontRotate = base * index + base / 2
        return item
      })
      this.setData({
        awardArr: newAward,
        runStage: 0
      })

    },
    'selectedIndex': function (newValue, oldValue) {

      if (newValue < 0) return
      this.setData({
        runStage: 1
      })
      const index = newValue
      var baseDeg = 360 / this.data.awardArr.length;
      var baseTime = 1000 / 360
      var rotate = 360 - ((this.data.awardArr[index].rotate) + (baseDeg / 2)) //中奖的选项旋转度，加本身的弧度取中间值


      var limitTime = 10 //转多少次
      var duration = 1000 * limitTime + rotate * baseTime // 动画执行时长
      var animation = wx.createAnimation({
        duration,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.rotate(360 * limitTime + rotate).step()
      this.setData({
        animationData: animation.export()
      })
      setTimeout(function () {
        this.setData({
          myawaedIndex: index,
          runStage: 2
        })
        this.triggerEvent('on-completed')
      }.bind(this), duration)
    }
  },
  lifetimes: {
    // 生命周期函数
    attached: function () {

    },
    ready: function () {
      console.log("component ready")
    },
    moved: function () {},
    detached: function () {},
  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      console.log("pageShow")
    }

  },
  /**
   * 组件的方法列表
   */
  methods: {
    //初始化

    handleStart() {
      if (this.data.runStage == 0) {
        this.triggerEvent('on-start')
      } else if (this.data.runStage == 2) {
        this.animation.rotate().step({duration:100,timingFunction:'step-start'})
        this.setData({
          runStage: 0,
          animationData: this.animation.export()
        })
      }

    }

  }
})