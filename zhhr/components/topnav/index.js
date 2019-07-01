// template/nav/index.js
Component({
  properties: {
    items: {
      type: Array
    },
    curTab: {
      type: Number,
      value: 0
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  methods:{
    switch: function (e) {
      const detail = { index: e.currentTarget.dataset.index }
      this.triggerEvent('switch', detail)
    }
  }
})