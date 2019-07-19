// pages/handover/jjd/new/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actype: 1,//1:新建;2:编辑;3:通过草稿新建
    draftId:null,//草稿id,编辑过程中保存草稿返回的
    isDraftPostIng:false,
    isPostIng: false,
    endMonth :null,
    detailList: [{
      "no": 0,
      "cate_name": "",
      "cate_code": "",
      "num": "",
      "description":"",
      "display": "block"
    }],
    curDetailListIndex: 0, //当前操作的明细索引
  },
  switchDeatil: function(opt) {
    var index = opt.currentTarget.dataset.index;
    var detailList = [].concat(this.data.detailList);
    if (detailList[index].display == "hidden") {
      detailList[index].display = "show";
    } else {
      detailList[index].display = "hidden";
    }
    this.setData({
      detailList: detailList
    })
  },


  selectedDate(e){
    const month = e.detail.value
    let baseData = this.data.base
    baseData.date = month
    this.setData({base:baseData})
  },





  /**
   * showSubject
   */
  showCate: function(e) {
    this.setData({
      curDetailListIndex: e.target.dataset.index
    })
    wx.navigateTo({
      url: '../cate/index',
    })
  },
 
  /**
   * 设置数量
   */
  setNum: function(e) {
    var detailListIndex = e.target.dataset.index;
    var num = e.detail.value;
    var detailList = this.data.detailList;

    var item;
    detailList[detailListIndex].num = num;
    this.setData({
      detailList
    })

  },


  /**
   * 明细描述
   */
  setDescription: function(e) {
    var detailListIndex = e.target.dataset.index;
    var description = e.detail.value;
    var detailList = this.data.detailList;
    detailList[detailListIndex].description = description;
    this.setData({
      detailList
    })
  },

  /***
   * 添加明细
   */
  addDetail: function() {
    var curIndex = this.data.detailList.length;
    var detailList = this.data.detailList;
    var newList = {
      "no": curIndex,
      "cate_name": "",
      "cate_code": "",
      "num": "",
      "description": "",
      "display": "block"
    }
    detailList.push(newList);
    this.setData({
      detailList: detailList
    })
  },
  /**
   * 删除明细
   */
  delDetail: function(e) {
    var index = e.target.dataset.index
    var oldList = this.data.detailList;
    var _that = this;
    if (index == 0) return;
    wx.showModal({
      content: '确认删除该明细？',
      success: function(res) {
        if (res.confirm) {
          oldList.splice(index, 1);
          _that.setData({
            detailList: oldList
          })

        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })

  },


  showError: function(tips) {
    wx.showToast({
      title: tips,
      image: "/static/images/error.png?v=4",
    })
  },

  /**
   * 存草稿
   */
  handleSaveDraft: function() {

    const _that = this;
    var hasError = false;
    var detailList = this.data.detailList;
    var baseData = this.data.base


    const comInfo = wx.getStorageSync("curComInfo")
    const apiUrl = "/Draft/save"
    baseData.description = "所属月份：" + baseData.date
    const requestParams = {
      apiUrl,
      requestData: {
        id:this.data.draftId === null ? '':this.data.draftId,
        type:3,
        comid:comInfo.comId,
        base: JSON.stringify(baseData),
        detail: JSON.stringify(detailList)
      },
      requestMethod: "POST"
    }

    this.setData({
      isDraftPostIng: true
    })
    app.ajax(requestParams).then((res) => {
      this.setData({
        draftId:res.id,
        isDraftPostIng: false
      })

    }, reject => {
      this.setData({
        isDraftPostIng: false
      })
    })
  },
  /**
   * 提交数据
   */
  submitContent: function() {
    const _that = this;
    var hasError = false;
    var detailList = this.data.detailList;
    var baseData = this.data.base
    if (this.data.isPostIng) return;

    for (var i = 0; i < detailList.length; i++) {
      if (detailList[i].cate_code == '') {
        this.showError("请选择单据类型");
        hasError = true;
        break;
      }
      if (detailList[i].num == '' || detailList[i].num == 0) {
        this.showError("请填写数量");
        hasError = true;
        break;
      }
      if (isNaN(detailList[i].num)) {
        this.showError("数量必须为数字");
        hasError = true;
        break;
      }
      if (detailList[i].description == '') {
        this.showError("请填写备注说明");
        hasError = true;
        break;
      }
    }
    if (hasError) return;

    this.setData({
      isPostIng: true
    })

    const apiUrl = this.data.actype == 2 ? "/Voucher/doupdate" :"/Voucher/doadd"
    const requestParams = {
      apiUrl: apiUrl + "/comid/" + baseData.comId,
      requestData: {
        draftid: this.data.draftId ? this.data.draftId:'',
        base: JSON.stringify(baseData),
        detail: JSON.stringify(detailList)
      },
      requestMethod: "POST"
    }
    app.ajax(requestParams).then((data) => {
      wx.showToast({
        title: '操作成功',
        icon: "success"
      })
      this.setData({
        isPostIng: false
      })
      setTimeout(function() {
        wx.redirectTo({
          url: '../index/index',
        })
      }, 500)
    }, reject => {
      this.setData({
        isPostIng: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() 
    var prevMonth;
    if (month == 0){
      prevMonth = year-1 +"-"+ 11;
    }else {
      month = month < 10 ? "0" + month.toString() : month
      prevMonth = [year,month].join("-")
    }
    

    // 
    const curComInfo = wx.getStorageSync("curComInfo")
    this.setData({ endMonth: prevMonth })

    if (options.actype == 2) {
      // 编辑修改
      const id = options.id
      const requestParams = {
        apiUrl: "/Voucher/edit",
        requestData: {
          id: options.id,
          comid:curComInfo.comId
        }
      }
      app.ajax(requestParams).then((data) => {
        this.setData({
          showPage: true,
          actype: options.actype,
          base: data.baseInfo,
          detailList: data.childList
        })
      }).catch(function(msg) {})
    }else if(options.actype==3){
      // 通过草稿箱新建
      const draftId = options.draftid
      const requestParams = {
        apiUrl: "/Draft/detail",
        requestData: {
          draftid: draftId
        }
      }
      app.ajax(requestParams).then((res) => {
        this.setData({
          showPage: true,
          actype: options.actype,
          draftId,
          total: res.total,
          base: JSON.parse(res.base),
          detailList: JSON.parse(res.detail)
        })

        console.log(this.data)
      }).catch(function (msg) { })
      
    }else {
      this.setData({
        base:{
          date:prevMonth,
          comId:curComInfo.comId,
          comShortName:curComInfo.comShortName,
          comFullName: curComInfo.comName
        }
      })
    } 

  },

  /**
   * onShow
   */
  onShow: function() {
    if (!wx.getStorageSync("curSelectedRwdjCate")) return
    const curSelectedCate = Object.assign({}, wx.getStorageSync("curSelectedRwdjCate"))

    const curDetailIndex = this.data.curDetailListIndex;
    var detailLists = this.data.detailList;

    // 检测是否已经选择了此科目
    let isHave = false
    isHave = detailLists.some(function(item) {
      return item.cate_code == curSelectedCate.code
    })
    if (isHave) {
      this.showError("不能重复选择单据类型")
      return
    }
    detailLists[curDetailIndex].cate_code = curSelectedCate.code;
    detailLists[curDetailIndex].cate_name = curSelectedCate.name;
    this.setData({
      detailList: detailLists
    })
    wx.removeStorageSync("curSelectedRwdjCate")

  }

})