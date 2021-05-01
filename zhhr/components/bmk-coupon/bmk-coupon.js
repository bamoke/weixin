// components/bmk-coupon/bamk-coupon.js
const App = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    welfareId: {
      type: Number,
      value: null,
      observer: "_idChange"
    },
    hide: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _idChange: function (id) {
      if(!id) return
      const requestParams = {
        apiUrl: "/Coupon/welfareCoupon",
        requestData: {
          welfareid: id
        },
        showLoading: false
      }
      App.ajax(requestParams).then(res => {
        this.setData({
          list: res.data.list
        })
      })
    },
    /**
     * 领取操作
     */
    reciveCoupon(e) {
      let index = e.currentTarget.dataset.index
      let curItem = {
        ...this.data.list[index]
      }
      
      if (curItem.ishas ==1) return false
      App.ajax({
        apiUrl: '/Coupon/receive',
        requestData: {
          couponid: curItem.coupon_id
        },
        showLoading: false
      }).then(res => {
  
        curItem.ishas = 1
        let newList = this.data.list
        newList[index] = curItem
        this.setData({
          list: newList
        })
      })
  
    },
    handleClose() {
      this.setData({
        hide: true,
        welfareId:null
      })
    }
  }
})