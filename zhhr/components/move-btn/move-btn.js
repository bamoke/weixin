// components/move-btn/move-btn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    borderColor: {
      type: String,
      value: '#1296db'
    },
    icon:{
      type:String,
      value: '/static/images/icon-kf.png'
    },
    url:{
      type: String,
      value: '/pages/customer/index/index'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    x:100,
    y:100
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * move 
     */

    /**
     * 导航到某个页面
     */
    showPage(){
      wx.navigateTo({
        url: this.data.url
      })
    }
  },
  /**
   * 生命周期
   */
  lifetimes:{
    attached(){
      try {
        const res = wx.getSystemInfoSync()
        this.setData({ windowWidth: res.windowWidth, windowHeight: res.windowHeight})
      } catch (e) {
        // Do something when catch error
      }
    }
  }
})
