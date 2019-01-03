// components/total/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardId:{
      type:Number
    },
    viewTotal:{
      type:Number,
      value:0
    },
    collectedTotal: {
      type: Number,
      value: 0
    },
    likeTotal: {
      type: Number,
      value: 0
    },
    isLike:{
      type:Boolean,
      value:false
    },
    isCollected: {
      type: Boolean,
      value: false
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
    doCollecte:function(){
      if(this.data.isCollected) return
      const requestParams = {
        apiUrl: "/Collection/docollect",
        requestData: {
          cardid: this.data.cardId
        }
      }
      app.ajax(requestParams).then(res => {
        this.setData({
          isCollected:true,
          collectedTotal:this.data.collectedTotal +1
        })
      })
    },
    doLike:function(){
      if(this.data.isLike) return
      const requestParams = {
        apiUrl: "/Like/dolike",
        requestData: {
          cardid: this.data.cardId
        }
      }
      app.ajax(requestParams).then(res => {
        this.setData({
          isLike: true,
          likeTotal: this.data.likeTotal + 1
        })
      })
    }
  }
})
