// pages/fybx/new/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPostIng: false,
    base: {
      curDate: "请选择",
      explain: "",
    },
    total: "0.00",
    detailList: [{
      "no": 0,
      "subject_name": "请选择",
      "subject_code": "",
      "amount": "",
      "display": "block"
    }],
    showBottomSeletor: false, //是否显示底部选择器
    curDetailListIndex: 0, //当前操作的明细索引
    subject: [{
        "subj_code": "53010103",
        "title": "53010103_基本支出_社会保障缴费"
      },
      {
        "subj_code": "5301010503",
        "title": "5301010503_绩效工资_奖励性绩效工资"
      },
      {
        "subj_code": "5301010504",
        "title": "5301010503_绩效工资_奖励性绩效工"
      },
      {
        "subj_code": "5301010505",
        "title": "5301010503_绩效工资_奖励性绩效"
      }, {
        "subj_code": "5301010506",
        "title": "5301010503_绩效工资_奖励性绩"
      }
    ]
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
  /**
   * 
   */
  bindChange: function(e) {
    console.log(e)
  },
  /**
   * 选择报销日期
   */
  selectedDate: function(e) {
    // console.log(e)
    var value = e.detail.value;
    var baseData = this.data.base;

    var userName = "王祥印";
    var date = new Date(value);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var fyExplain = userName + "_" + year + "年" + month + '月' + day + '日报销';
    baseData.curDate = value;
    baseData.explain = fyExplain;
    this.setData({
      base: baseData
    })
  },
  /**
   * 费用说明
   */
  enterBaseDescription: function(e) {
    var value = e.detail.value;
    this.setData({
      description: value
    })
  },
  /**
   * 打开底部选择器
   */
  openBottomSeletor: function(e) {
    if (this.data.showBottomSeletor) {
      this.setData({
        showBottomSeletor: false
      })
    } else {
      this.setData({
        showBottomSeletor: true,
        curDetailListIndex: e.target.dataset.index
      })
    }
  },
  /**
   * 选择科目
   */
  subjectChange: function(e) {
    console.log(e)
    var curDetailIndex = this.data.curDetailListIndex;
    var curSelectedIndex = e.target.dataset.index;
    var subject = this.data.subject;
    var detailLists = this.data.detailList;
    detailLists[curDetailIndex].subject_name = subject[curSelectedIndex].title;
    detailLists[curDetailIndex].subject_code = subject[curSelectedIndex].subj_code;
    this.setData({
      detailList: detailLists,
      showBottomSeletor: false
    })

  },
  /**
   * 明细金额
   */
  setAmount: function(e) {
    var detailListIndex = e.target.dataset.index;
    var amount = e.detail.value;
    var detailList = this.data.detailList;
    var totalAmount = 0;
    var item;
    detailList[detailListIndex].amount = amount;
    for (item in detailList) {
      var curMount = detailList[item].amount == '' ? 0 : isNaN(detailList[item].amount) ? 0 : detailList[item].amount;
      totalAmount += parseFloat(curMount)
    }
    this.setData({
      detailList,
      total: totalAmount == 0 ? "0.00" : totalAmount
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
      "subject_name": "请选择",
      "subject_code": "",
      "amount": "",
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
  pageTouch: function() {
    this.setData({
      showBottomSeletor: false
    })
  },
  /**
   * 提交
   */
  showError: function(tips) {
    wx.showToast({
      title: tips,
      image: "/static/images/error.png?v=4",
    })
  },
  submitContent: function() {
    const _that = this;
    var hasError = false;
    var baseData = this.data.base;
    var detailList = this.data.detailList;
    if(this.data.isPostIng) return;
    if (baseData.curDate == '请选择') {
      this.showError("请选择报销日期")
      return;
    }

    for (var i = 0; i < detailList.length; i++) {
      if (detailList[i].subject_code == '') {
        this.showError("请选择科目");
        hasError = true;
        break;
      }
      if (detailList[i].amount == '') {
        this.showError("请填写金额");
        hasError = true;
        break;
      }
      if (isNaN(detailList[i].amount)) {
        this.showError("金额必须为数字");
        hasError = true;
        break;
      }

      if(!hasError){
        this.setData({
          isPostIng:true
        })
      }
    }
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})