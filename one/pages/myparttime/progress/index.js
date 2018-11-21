// pages/myparttime/progress/index.js
const app = getApp()
import util from "../../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    parttimeInfo:{},
    parttimeId: null,
    progressNodes: [],
    memberInfo: {},
    stageNameArr: ["未开始", "进行中", "待审核", "已完成", "未完成"],
    examineResult:[{status:3,name:"审核完成"},{status:4,name:"审核未完成"}],
    examineIndex:0,
  },
  changeStage: function(e) {
    const nodeIndex = e.currentTarget.dataset.itemindex
    let nodeList = this.data.progressNodes
    let curNode = nodeList[nodeIndex]
    let newStatus = parseInt(curNode.status) + 1
    if (curNode.status == 4) {
      newStatus = 1
    }
    const parttimeId = this.data.parttimeId
    const params = {
      apiUrl: "/ParttimeMy/changeprogress",
      requestMethod: "GET",
      requestData: {
        progressid: curNode.id,
        status: newStatus
      }
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
  changeComplete: function(e) {
    const examineResult = this.data.examineResult
    const value = e.detail.value
    const nodeIndex = e.currentTarget.dataset.itemindex
    let nodeList = this.data.progressNodes
    let curNode = nodeList[nodeIndex]
    let newStatus = examineResult[value].status
    const parttimeId = this.data.parttimeId
    const params = {
      apiUrl: "/ParttimeMy/changeprogress",
      requestMethod: "GET",
      requestData: {
        progressid: curNode.id,
        status: newStatus
      }
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
   * 项目完成
   */
  completeProject:function(){
    const parttimeId = this.data.parttimeId
    wx.showModal({
      content: '确认更改项目状态为已完成？',
      success:function(res){
        if(res.confirm){
          const params = {
            apiUrl: "/ParttimeMy/docomplete",
            requestMethod: "GET",
            requestData: {
              parttimeid: parttimeId
            }
          }
          const ajaxRequest = util.request(params)
          ajaxRequest.then(res => {
            wx.showToast({
              title: '操作成功',
              icon:"success"
            })
            setTimeout(function(){
              wx.navigateBack({
                delta:1
              })
            },500)
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const parttimeId = options.parttimeid
    this.setData({
      parttimeId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const parttimeId = this.data.parttimeId
    const params = {
      apiUrl: "/ParttimeMy/progress",
      requestMethod: "GET",
      requestData: {
        parttimeid: parttimeId
      }
    }
    const ajaxRequest = util.request(params)
    ajaxRequest.then(res => {
      this.setData({
        showPage: true,
        progressNodes: res.data.progressInfo,
        parttimeInfo: res.data.parttimeInfo,
        memberInfo: res.data.memberInfo
      })
    })
  }




})