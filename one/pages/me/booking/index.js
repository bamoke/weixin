// pages/home/record/index.js
import util from '../../../utils/util'
const stageNameArr = [
  {
    name: '不通过',
    className: 'text-error'
  },
  {
    name: '审核中',
    className: 'text-info'
  },
  {
    name: '预约成功',
    className: 'text-success'
  }
  ]

  Page({

    /**
     * 页面的初始数据
     */
    data: {
      showPage: false,
      stageNameArr,
      curPage: 1,
      curStage: null,
      isLoading: false,
      list: [],
      hasMore: false
    },

    /***
     * Action
     */
    swichTab: function(data) {
      const index = data.currentTarget.dataset.index;
      var stageData;
      if (index === undefined) {
        this.setData({
          curPage: 1,
          curStage: null
        })
        stageData = {}
      } else {
        this.setData({
          curPage: 1,
          curStage: parseInt(index)
        })
        stageData = {
          status: parseInt(index)
        }
      }
      const requestParams = {
        apiUrl: "/Home/bookinglog",
        requestMethod: "GET",
        requestData: stageData
      }
      const ajaxRequest = util.request(requestParams)
      ajaxRequest.then(res => {
        this.setData({
          hasMore: res.data.hasMore,
          list: res.data.list,
          curPage:res.data.page
        })
      })
    },
    // 加载更多
    _loadMore: function() {
      if (this.data.isLoading || !this.data.hasMore) return
      this.setData({
        isLoading: true
      })
      let requestData = {
        p: parseInt(this.data.curPage) + 1
      }
      if (this.data.curStage !== null) {
        requestData.status = this.data.curStage
      }
      const requestParams = {
        apiUrl: "/Home/bookinglog",
        requestData,
        requestMethod: "GET"
      }
      const ajaxRequest = util.request(requestParams)
      ajaxRequest.then(res => {
        let newList = this.data.list.concat(res.data.list)
        let updateData = {
          list: newList,
          curPage: res.data.page,
          hasMore: res.data.hasMore
        }
        this.setData({
          isLoading: false,
          ...updateData
        })
      })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
      const requestParams = {
        apiUrl: "/Home/bookinglog",
        requestMethod: "GET",
        requestData: {
          p: this.data.curPage
        }
      }
      const ajaxRequest = util.request(requestParams)
      ajaxRequest.then(res => {
        this.setData({
          showPage: true,
          hasMore: res.data.hasMore,
          list: res.data.list
        })
      })
    },



    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
      this._loadMore()
    }


  })