// compenents/answer/answer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    question:{
      type:Object,
      observer:function(){
        this.setData({
          answerResult: '',
          isSelected: false,
          curSelected: ''
        })
      }
    },
    index:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    symbolArr: ['A', 'B', 'C', "D", 'E', 'F', 'G'],
    answerResult: '',
    isSelected: false,
    curSelected: ''
  },

  /**
   * 组件的生命周期
   */
  ready: function () {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {

    //选择答案
    selectAnswer:function(e){
      const value = e.detail.value
      const questionType = this.data.question.type
      const correctStr = this.data.question.correct
      var answerResult;
      if(questionType !== 2) {
        answerResult = correctStr == value.join(",") ? 'correct' : "error",
        this.setData({
          isSelected:true,
          answerResult,
          curSeleted:value.join(",")
        })
        this.triggerEvent("confirm-answer", answerResult)
      }else {
        this.setData({
          curSeleted: value.join(",")
        })
      }
    },
    // 多选确认答案
    confirmAnswer:function(e){
      if (this.data.curSeleted.length === 0) {
        wx.showToast({
          title: '请选择答案',
          image: '/static/images/icon-error.png'
        })
        return
      }
      var seletctedValue = this.data.curSeleted
      const correctStr = this.data.question.correct 
      var answerResult = correctStr === seletctedValue ?'correct':"error"
      this.setData({ isSelected: true, answerResult})
      this.triggerEvent("confirm-answer", answerResult)
    }
  }
})
