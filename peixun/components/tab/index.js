// components/tab/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items:{
      type:Array
    },
    curTab:{
      type:Number,
      value:0
    }
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
    switch:function(e){
      const detail = { index: e.currentTarget.dataset.index}
      this.triggerEvent('switch', detail)
    }
  }
})
