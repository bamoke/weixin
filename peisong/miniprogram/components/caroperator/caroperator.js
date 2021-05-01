// components/car-operator/car-operator.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object
    },
    index: {
      type: Number
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
    handleAddCar(e) {
      const index = this.data.index
      this._computeNum({
        index,
        type: "add"
      })
    },
    handleMinusNum(e) {
      const index = this.data.index
      this._computeNum({
        index,
        type: 'minus'
      })
    },
    handleAddNum(e) {
      const index = this.data.index
      this._computeNum({
        index,
        type: 'add'
      })
    },
    handleInput (e) {
     
      let num = e.detail.value
      const index = this.data.index
      let newItem = Object.assign({}, this.data.item)

      if(num == '')  return

      num = parseInt(num)

      console.log(num)
      if(isNaN(num) || num < 1) {
        num = 1
      }
      newItem.buynum = num
      this._storageCar(newItem)
      this.triggerEvent("update", {
        newItem,
        index
      })
    },
    handleCheckInput(e){
      let num = e.detail.value
      const index = this.data.index
      if(num == '') {
        wx.showToast({
          title: "购买数量不能为空",
          image: "/images/icon-error.png"
        })
      }
    },
    _computeNum({
      index,
      type
    }) {
      let newItem = Object.assign({}, this.data.item)

      if (type === 'add') {
        newItem.buynum = newItem.buynum + 1

      } else {
        newItem.buynum = newItem.buynum - 1
      }
      this._storageCar(newItem)
      this.triggerEvent("update", {
        newItem,
        index
      })

    },
    // 设置购物车缓存
    _storageCar(newItem) {
      let car = wx.getStorageSync('car') || []
      let newCar = car.slice()
      const carNum = newCar.length
      if (newCar.length === 0) {
        newCar.push(newItem)
      } else {
        for (var i = 0; i < newCar.length; i++) {
          if (newCar[i].id == newItem.id) {
            if (newItem.buynum > 0) {
              newCar[i] = newItem
            } else {
              newCar.splice(i, 1)
            }
            break
          }
          // 如果没有相同的物品，在最后一次加入物品
          if(i == newCar.length-1) {
            newCar.push(newItem)
            break
          }
        }
      }
      try {
        wx.setStorageSync('car', newCar)
      } catch (e) {
        console.log(e)
      }
    }
  }
})