// pages/myparttime/progress/index.js
const app = getApp()
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage:false,
    parttimeId:null,
    progressNodes:[],
    memberInfo:{},
    stageNameArr:["未开始","进行中","待审核","已完成","未完成"]
  },
  changeStage:function(e){
    const nodeIndex = e.currentTarget.dataset.itemindex
    let nodeList = this.data.progressNodes
    let curNode = nodeList[nodeIndex]  
    let newStatus = parseInt(curNode.status) + 1
    const parttimeId = this.data.parttimeId
    const params = {
      apiUrl: "/ParttimeMy/changeprogress",
      requestMethod: "GET",
      requestData: { progressid: curNode.id, status: newStatus }
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      nodeList[nodeIndex].status = newStatus
      this.setData({
        progressNodes: nodeList
      })
    }).catch(reject => {
      console.log("s")
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const parttimeId = options.parttimeid
    this.setData({ parttimeId})
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
    const parttimeId = this.data.parttimeId
    const params = {
      apiUrl: "/ParttimeMy/progress",
      requestMethod: "GET",
      requestData: { parttimeid: parttimeId }
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        progressNodes: res.data.progressInfo,
        memberInfo:res.data.memberInfo
      })
    }).catch(reject => {
      console.log("s")
    })
  }



 
})