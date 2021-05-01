// pages/adviser/myquestion/index.js
const app = getApp()
const cateArr = [
  {
    type:'all',
    name:'全部'
  },
  {
    type:1,
    name:'已解决'
  },
  {
    type:0,
    name:'未解决'
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:true,
    cateArr: cateArr,
    curNavIndex:0,
    pageInfo:{},
    list:[]
  },

  /***
   * 
   */
  changeCate(e){
    const index = e.detail.index
    const curTab = cateArr[index]
    let requestParams = {
      apiUrl: '/AdviserQuestion/myquestion',
      requestData: {type: curTab.type}
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: res.data.list,
        curNavIndex: index
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.ajax({
      apiUrl:"/AdviserQuestion/myquestion"
    }).then(res=>{
      this.setData({
        showPage:true,
        list:res.data.list,
        pageInfo:res.data.pageInfo
      })
    })
  },





  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const pageInfo = this.data.pageInfo
    if (pageInfo.total <= pageInfo.pageSize * pageInfo.page) return
    const type = cateArr[this.data.curNavIndex].type
    let requestParams = {
      apiUrl: '/AdviserQuestion/myquestion',
      requestData: {page: parseInt(pageInfo.page) + 1,type }
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        pageInfo:res.data.pageInfo,
        list: this.data.list.concat(res.data.list)
      })
    })
  }


})