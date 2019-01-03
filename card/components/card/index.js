// component/card/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardInfo:{
      type:Object
    },
    isSelf:{
      type:Boolean,
      value:false
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
      handleEdit:function(){
        wx.navigateTo({
          url: '/pages/mycard/edit/index?id='+this.data.cardInfo.id,
        })
      }
  }
})
