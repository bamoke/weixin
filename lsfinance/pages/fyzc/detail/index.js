// pages/fybx/detail/index.js
import util from '../../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageShow:false,
    baseInfo:{},
    detailList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const requestParams = {
      apiUrl: "/Expend/detail",
      requestData: {
        id: options.id
      }
    }
    util.request(requestParams).then((data) => {
      this.setData({
        showPage:true,
        baseInfo: data.baseInfo,
        detailList: data.childList
      })
    }).catch(function (msg) {
    })
  },

  /**
   * 切换明细
   */
  switchDeatil:function(opt){
    var index = opt.currentTarget.dataset.index;
    var detailList = this.data.detailList;
    if(detailList[index].display == "hidden"){
      detailList[index].display = "show";
    }else {
      detailList[index].display = "hidden";
    }
    this.setData({
      detailList:detailList
    })
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
  
  }

  
})