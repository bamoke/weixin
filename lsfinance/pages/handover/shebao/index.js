// pages/handover/shebao/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    curComInfo:null,
    base:{},
    list:[],
    noData:false
  },



  handleSelectedItem(e){
    const value = e.detail.value[0]
    const index = e.currentTarget.dataset.index
    let list = this.data.list
    list[index].status = typeof value==='undefined'?"不申报":"同意申报"
    list[index].checked = typeof value !=='undefined'
    list[index].style = typeof value === 'undefined' ? "un-agree" : "agree"
    this.setData({list})
  },
  handleSelectAll(e){
    let list = this.data.list
    const value = e.detail.value[0]
    list.forEach(item=>{
      if (typeof value === 'undefined') {
        item.checked = false
        item.status = "不申报"
        item.style = "un-agree"
      }else {
        item.checked = true
        item.status = "同意申报"
        item.style = "agree"
      }
    })
    this.setData({list})
  },
  handleSubmit(){
    let list = this.data.list;
    let base = this.data.base;
    let hasUnSb = list.some(item=>{
      return item.status === "不申报" || item.status === '待处理'
    })
    
    if(hasUnSb) {
      base.status_name = "部分申报"
      this.setData({base})
      wx.showModal({
        content: '有未申报名单，确认不申报？',
        success:res=>{
          if(res.confirm){
            this._sendData()
          }
        }
      })
    }else {
      base.status_name = "全部申报"
      this.setData({ base })
      this._sendData()
    }
  },
  _sendData(){
    const requestParams = {
      apiUrl:"/Handover/shenbao_save",
      requestData:{
        type:"sb",
        base: JSON.stringify(this.data.base),
        list:JSON.stringify(this.data.list)
      },
      requestMethod:"POST"
    }
    app.ajax(requestParams).then(res=>{
      wx.showToast({
        title: '操作成功',
        icon: "success"
      })

      setTimeout(function () {
        wx.navigateBack({
          detal: 1
        })
      }, 500)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({ curComInfo})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const requestParams = {
      apiUrl:"/Handover/shenbao",
      requestData:{comid:this.data.curComInfo.comId,type:"sb"}
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        base:res.base,
        list:res.list,
        noData:false,
        showPage:true
      })
    },reject=>{
      if(reject.code == 13009) {
        this.setData({
          showPage:true,
          noData:true
        })
      }
    })
  }
})