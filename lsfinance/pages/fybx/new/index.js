// pages/fybx/new/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comId:null,
    actype: 1,//1:新建;2:编辑;3:通过草稿新建
    draftId:null,//草稿id,编辑过程中保存草稿返回的
    isDraftPostIng:false,
    dataPerson: [],
    personIndex: 0,
    isPostIng: false,
    base: {
      date: "",
      person: "",
      work_nu: '',
      department: '',
      description: '',
      com_name: '',
      com_short_name: '',
      total_amount:"0.00"
    },
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

    baseData.date = value;
    this.setData({
      base: baseData
    })
    this._setDescription()

  },
  /**
   * 选择报销人
   */
  selectedPerson: function(e) {
    const index = e.detail.value
    const baseInfo = this.data.base
    const curItem = this.data.dataPerson[index]
    baseInfo.person = curItem.name
    baseInfo.work_nu = curItem.nu
    baseInfo.department = curItem.department
    this.setData({
      base: baseInfo
    })
    this._setDescription()
  },

  /***设置报销说明 */
  _setDescription: function() {
    let baseInfo = this.data.base
    if (!baseInfo.person) return
    baseInfo.description = baseInfo.person + baseInfo.date + "的报销单"
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
 /*    let isHave = false
    isHave = detailLists.some(function(item) {
      return item.subject_code == subject[curSelectedIndex].subject_code
    })
    if (isHave) {
      this.showError("不能重复选择所属科目")
      return
    } */
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
    detailList[detailListIndex].amount = amount;
    this.setData({
      detailList
    })
    this._computeTotalAmount()
  },

  /**
   * 小数转正整数
   */
  _accMul: function (arg1){
    var m = 0, s1=arg1.toString();
    var ratio;
    var b =s1.split(".")
    if(b[1]) {
      if(b[1].length == 1) {
        ratio = 10
      }else if(b[1].length == 2) {
        ratio = 1
      }
    }else {
      ratio =100
    }
    return Number(s1.replace(".","")) * ratio

  }, 
  /**
   * 计算报销总额
   */
  _computeTotalAmount: function() {
    var totalAmount = 0
    var detailList = this.data.detailList;
    for (var i = 0; i < detailList.length; i++) {
      var curMount = detailList[i].amount
      console.log(curMount)
      totalAmount += this._accMul(curMount)
    }
    console.log(totalAmount)
    const base = this.data.base
    base.total_amount = totalAmount / 100
    this.setData({
      base
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
    var baseData = this.data.base;
    var detailList = this.data.detailList;
    if (this.data.isDraftPostIng) return;
    // 验证
    if (baseData.date == '') {
      this.showError("请选择报销日期")
      return;
    }
    if (baseData.person == '') {
      this.showError("请选择报销人")
      return;
    }
    if (baseData.description == '') {
      this.showError("请填写报销说明")
      return;
    }

    const apiUrl = "/Draft/save"
    const requestParams = {
      apiUrl,
      requestData: {
        id:this.data.draftId === null ? '':this.data.draftId,
        type:1,
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
    var baseData = this.data.base;
    var detailList = this.data.detailList;
    if (this.data.isPostIng) return;
    // 验证
    if (baseData.date == '') {
      this.showError("请选择报销日期")
      return;
    }
    if (baseData.person == '') {
      this.showError("请选择报销人")
      return;
    }
    if (baseData.description == '') {
      this.showError("请填写报销说明")
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
    if (hasError) return;

    this.setData({
      isPostIng: true
    })

    const apiUrl = this.data.actype == 2 ? "/Expenses/doupdate" :"/Expenses/doadd"
    const requestParams = {
      apiUrl: apiUrl,
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

    const staffArr = wx.getStorageSync("staffData")
    if (options.actype == 2) {
      const id = options.id
      const requestParams = {
        apiUrl: "/Expenses/edit",
        requestData: {
          id: options.id
        }
      }
      app.ajax(requestParams).then((data) => {
        this.setData({
          showPage: true,
          actype: options.actype,
          base: data.baseInfo,
          detailList: data.childList,
          dataPerson: staffArr
        })
      })
    }else if(options.actype==3){
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
          detailList: JSON.parse(res.detail),
          dataPerson: staffArr
        })

      })
      
    } else {
      var baseInfo = this.data.base
      this.setData({
        base: baseInfo,
        dataPerson: staffArr
      })
    }

  },

  /**
   * onShow
   */
  onShow: function() {
    if (!wx.getStorageSync("curSelectedSubject")) return
    const curSelectedSubject = Object.assign({}, wx.getStorageSync("curSelectedSubject"))

    const curDetailIndex = this.data.curDetailListIndex;
    var detailLists = this.data.detailList;

/*     // 检测是否已经选择了此科目
    let isHave = false
    isHave = detailLists.some(function(item) {
      return item.subject_code == curSelectedSubject.subject_code
    })
    if (isHave) {
      this.showError("不能重复选择所属科目")
      return
    } */
    detailLists[curDetailIndex].subject_code = curSelectedSubject.subject_code;
    detailLists[curDetailIndex].subject_name = curSelectedSubject.subject_name;
    detailLists[curDetailIndex].subject_title = curSelectedSubject.subject_title;
    this.setData({
      detailList: detailLists
    })
    wx.removeStorageSync("curSelectedSubject")

  }

})