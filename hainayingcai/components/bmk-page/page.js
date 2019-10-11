// components/bmk-page/page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    total:{
      type:Number
    },
    current:{
      type:Number
    },
    pageSize:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pageNum:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    pageNum:function(){
      return [1,2,3]
    }
  },
  ready:function(){
    console.log("s")
  }
})
