// components/upload-progress/progress.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:false
    },
    percent:{
      type:Number,
      value:0
    }
  },

  /**
   * 
   */
  observers:{

  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    endProgress:function(){
      this.setData({
        isShow:false,
        percent:0
      })
    }
  }
})
