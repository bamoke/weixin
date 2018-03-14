// component/buyconfirm/buyconfirm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    price: {
      type: String,
      value: ""
    }
  },

  /**
   * 
   * 组件的初始数据
   */
  data: {
    isHide: true

  },

  /** 
   * 组件的方法列表
   */
  methods: {
    show() {
      this.setData({
        isHide: !this.data.isHide
      })
    },
    hide() {
      this.setData({
        isHide: !this.data.isHide
      })
    },
    confirmEvent(){
      this.triggerEvent("confirm")
    }

  }
})
