// pages/home/childaccount/edit/index.js
import util from '../../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showpage: false,
    curId:null,
    info:{},
    selectedCom: '',
    comList: [],
    isSubmiting: false
  },
  selectCom: function (e) {
    const selectedComArr = e.detail.value
    this.setData({
      selectedCom: selectedComArr.join(",")
    })
  },
  save: function () {
    if (this.data.isSubmiting) return
    if (this.data.selectedCom == '') {
      return this._showError("请选择管理企业")
    }
    const requestParams = {
      apiUrl: "/ChildAccount/update",
      requestData: {id:this.data.curId,comid:this.data.selectedCom},
      requestMethod: "POST"
    }
    this.setData({
      isSubmiting: true
    })
    util.request(requestParams).then(res => {
      wx.showToast({
        title: '修改成功',
        icon: "sucess"
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 500)

    }, reject => {
      this.setData({
        isSubmiting: false
      })
    })
  },

  _showError: function (msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
    return false
  },

  del:function(){
    const _that = this
    wx.showModal({
      content: '确认删除此账号吗？',
      success:function(res){
        if(res.confirm) {
          const requestParams = {
            apiUrl: "/ChildAccount/del",
            requestData: { id: _that.data.curId}
          }
          util.request(requestParams).then(res => {
            wx.showToast({
              title: '账号已删除',
              icon: "sucess"
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 500)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const curId = options.id
    this.setData({curId})
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
      apiUrl: "/ChildAccount/detail",
      requestData:{id:this.data.curId}
    }
    const myComList = wx.getStorageSync("myCom")
    util.request(requestParams).then(res => {
      let userComList = res.info.belong_com.split(",")
      let comList = myComList.map(item=>{
        let newItem = Object.assign({}, item)
        if(userComList.indexOf(item.comId)>=0) {
          newItem.checked =true
        }
        return newItem
      })
      this.setData({
        showPage: true,
        info:res.info,
        selectedCom:res.info.belong_com,
        comList
      })
    })
  }
})