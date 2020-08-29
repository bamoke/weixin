// components/car-operator/car-operator.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object
    },
    index:{
      type:Number
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
      this._computeNum({index,type:"add"})
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
    _computeNum({
      index,
      type
    }) {
      let newItem = Object.assign({},this.data.item)

      if (type === 'add') {
        newItem.buynum = newItem.buynum + 1

      } else {
        newItem.buynum = newItem.buynum - 1
      }
      this._storageCar(newItem)
      this.triggerEvent("update",{newItem,index})

    },
    // 设置购物车缓存
    _storageCar(newItem) {
      let car = wx.getStorageSync('car') || []
      let newCar = car.slice()
      if (newCar.length === 0) {
        newCar.push(newItem)
      } else {
        newCar.forEach(function (item, index, arr) {
          if (item.id === newItem.id) {
            if (newItem.buynum > 0) {
              arr[index] = newItem
            } else {
              arr.splice(index, 1)
            }
          } else {
            if (index === arr.length - 1) {
              arr.push(newItem)
            }
          }
        })
      }

      try {
        wx.setStorageSync('car', newCar)
      } catch (e) {
        console.log(e)
      }
    }
  }
})