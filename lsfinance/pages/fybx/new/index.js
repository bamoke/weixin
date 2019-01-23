// pages/fybx/new/index.js
import util from '../../../utils/util';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataPerson: [],
    personIndex: 0,
    isPostIng: false,
    base: {
      date: "请选择",
      person: "请选择",
      department: '',
      description: '',
      orgid: null,
      com_name: '',
      com_short_name: ''
    },
    total: "0.00",
    detailList: [{
      "no": 0,
      "subject_name": "请选择",
      "subject_title": '',
      "subject_code": "",
      "amount": "",
      "display": "block"
    }],
    showBottomSeletor: false, //是否显示底部选择器
    curDetailListIndex: 0, //当前操作的明细索引
    subject: []
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
   * 选择报销日期
   */
  selectedDate: function(e) {
    // console.log(e)
    var value = e.detail.value;
    var baseData = this.data.base;

    /*     var userName = "王祥印";
        var date = new Date(value);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var fyExplain = userName + "_" + year + "年" + month + '月' + day + '日报销'; */
    baseData.date = value;
    this.setData({
      base: baseData
    })
  },
  /**
   * 选择报销人
   */
  selectedPerson: function(e) {
    const index = e.detail.value
    const baseInfo = this.data.base
    const curItem = this.data.dataPerson[index]
    baseInfo.person = curItem.name
    baseInfo.department = curItem.department
    this.setData({
      base: baseInfo
    })
  },
  /**
   * 费用说明
   */
  enterBaseDescription: function(e) {
    var value = e.detail.value;
    const baseInfo = this.data.base
    baseInfo.description = value
    this.setData({
      base: baseInfo
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
   * showSubject
   */
  showSubject: function(e) {
    this.setData({
      curDetailListIndex: e.target.dataset.index
    })
    wx.navigateTo({
      url: '/pages/fiscal/subject/index',
    })
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

    // 检测是否已经选择了此科目
    let isHave = false
    isHave = detailLists.some(function(item) {
      return item.subject_code == subject[curSelectedIndex].subject_code
    })
    if (isHave) {
      this.showError("不能重复选择所属科目")
      return
    }
    detailLists[curDetailIndex].subject_code = subject[curSelectedIndex].subject_code;
    detailLists[curDetailIndex].subject_name = subject[curSelectedIndex].subject_name;
    detailLists[curDetailIndex].subject_title = subject[curSelectedIndex].subject_title;
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
    this.setData({
      detailList
    })
    this._computeTotalAmount()
  },

  /**
   * 计算报销总额
   */
  _computeTotalAmount: function() {
    var totalAmount = 0
    var detailList = this.data.detailList;
    for (var i = 0; i < detailList.length; i++) {
      var curMount = detailList[i].amount
      totalAmount += parseInt(curMount * 100)
    }
    this.setData({
      total: totalAmount / 100
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
          // 冲洗计算总额
          _that._computeTotalAmount()
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
    if (this.data.isPostIng) return;
    if (baseData.date == '请选择') {
      this.showError("请选择报销日期")
      return;
    }
    if (baseData.person == '请选择') {
      this.showError("请选择报销人")
      return;
    }

    for (var i = 0; i < detailList.length; i++) {
      if (detailList[i].subject_code == '') {
        this.showError("请选择科目");
        hasError = true;
        break;
      }
      if (detailList[i].amount == '' || detailList[i].amount == 0) {
        this.showError("请填写金额");
        hasError = true;
        break;
      }
      if (isNaN(detailList[i].amount)) {
        this.showError("金额必须为数字");
        hasError = true;
        break;
      }
    }
    baseData.total_amount = this.data.total
    if (!hasError) {
      this.setData({
        isPostIng: true
      })


      const requestParams = {
        apiUrl: "/Expenses/doadd",
        requestData: {
          base: JSON.stringify(baseData),
          detail: JSON.stringify(detailList)
        },
        requestMethod: "POST"
      }
      util.request(requestParams).then((data) => {
        wx.showToast({
          title: '操作成功',
          icon: "success"
        })
        this.setData({
          isPostIng: false
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 500)
      }, reject => {
        this.setData({
          isPostIng: false
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const orgInfo = wx.getStorageSync("orgInfo")
    if (!orgInfo) {
      wx.showToast({
        title: '访问数据错误',
        image: "/static/images/icon-error.png"
      })
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }

    var baseInfo = this.data.base
    baseInfo.orgid = orgInfo.orgid
    baseInfo.com_short_name = orgInfo.short_name
    baseInfo.com_name = orgInfo.com_name
    this.setData({
      base:baseInfo,
      dataPerson:wx.getStorageSync("staffData")
    })
  },

  /**
   * onShow
   */
  onShow:function(){
    if (!wx.getStorageSync("curSelectedSubject")) return
    const curSelectedSubject = Object.assign({},wx.getStorageSync("curSelectedSubject"))

    const curDetailIndex = this.data.curDetailListIndex;
    var detailLists = this.data.detailList;

    // 检测是否已经选择了此科目
    let isHave = false
    isHave = detailLists.some(function (item) {
      return item.subject_code == curSelectedSubject.subject_code
    })
    if (isHave) {
      this.showError("不能重复选择所属科目")
      return
    }
    detailLists[curDetailIndex].subject_code = curSelectedSubject.subject_code;
    detailLists[curDetailIndex].subject_name = curSelectedSubject.subject_name;
    detailLists[curDetailIndex].subject_title = curSelectedSubject.subject_title;
    this.setData({
      detailList: detailLists
    })
    wx.removeStorageSync("curSelectedSubject")

  }

})