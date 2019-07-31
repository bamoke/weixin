// pages/fybx/new/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actype: 1, //1:新建;2:编辑;3:通过草稿新建
    draftId: null, //草稿id,编辑过程中保存草稿返回的
    isDraftPostIng: false,
    dataDepartment: [], //部门数据
    dataStaff: [], // 员工数据
    dataCapital: [], // 帐户数据
    isPostIng: false,
    base: {
      date: "",
      department: '',
      operator: '请选择',
      description: '',
      total_amount: "0.00",
      capital_name: "请选择",
      capital_nu:"",
      capital_bank:"",
      capital_currency:""
    },
    total: "0.00",
    detailList: [{
      "no": 0,
      "subject_name": "请选择",
      "subject_title": '',
      "subject_code": "",
      "department": '请选择',
      "amount": "",
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

  /**
   * 选择日期
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
   * 选择部门
   */
  selectedDepartment: function(e) {
    const index = e.detail.value
    const baseInfo = this.data.base
    const curItem = this.data.dataDepartment[index]
    baseInfo.department = curItem.name
    this.setData({
      base: baseInfo
    })
    this._setDescription()
  },
  /**
   * 选择帐户
   */
  selectedCapital: function(e) {
    const index = e.detail.value
    const baseInfo = this.data.base
    const curItem = this.data.dataCapital[index]
    baseInfo.capital_nu = curItem.nu
    baseInfo.capital_name = curItem.name
    baseInfo.capital_bank = curItem.bank
    baseInfo.capital_currency = curItem.currency
    this.setData({
      base: baseInfo
    })
  },
  /**
   * 选择经手人
   */
  selectedOperator: function(e) {
    const index = e.detail.value
    let baseInfo = this.data.base
    const curItem = this.data.dataStaff[index]
    baseInfo.operator = curItem.name
    this.setData({
      base: baseInfo
    })
  },
  /**
   * 明细栏选择部门
   */
  selectedChildDepartment: function(e) {
    const departmentInfo = this.data.dataDepartment
    const index = e.detail.value
    const detailIndex = e.target.dataset.index
    const baseInfo = this.data.base
    let detailList = this.data.detailList
    detailList[detailIndex].department = departmentInfo[index].name
    this.setData({
      detailList
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


  /***设置支出说明 */
  _setDescription: function() {
    let baseInfo = this.data.base
    if (!baseInfo.department || !baseInfo.date) return
    baseInfo.description = baseInfo.department + baseInfo.date + "的支出单"
    this.setData({
      base: baseInfo
    })
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
      "subject_name": "",
      "department": "",
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
  /**
   * 提交
   */
  showError: function(tips) {
    wx.showToast({
      title: tips,
      image: "/static/images/error.png?v=4",
    })
  },
  handleSaveDraft: function() {
    const _that = this;
    if (this.data.isDraftPostIng) return;
    var baseData = this.data.base;
    var detailList = this.data.detailList;
    if (baseData.description == '') {
      this.showError("请填写备注说明")
      return;
    }
    const apiUrl = "/Draft/save"
    const requestParams = {
      apiUrl,
      requestData: {
        id: this.data.draftId === null ? '' : this.data.draftId,
        type: 2,
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
        draftId: res.id,
        isDraftPostIng: false
      })

    }, reject => {
      this.setData({
        isDraftPostIng: false
      })
    })
  },

  submitContent: function() {
    const _that = this;
    var hasError = false;
    var baseData = this.data.base;
    var detailList = this.data.detailList;
    if (this.data.isPostIng) return;
    if (baseData.date == '') {
      this.showError("请选择报销日期")
      return;
    }
    if (baseData.department == '') {
      this.showError("请选择部门")
      return;
    }
    if (baseData.capital_name == '请选择') {
      this.showError("请选择资金帐户")
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
    if (!hasError) {
      this.setData({
        isPostIng: true
      })

      const apiUrl = this.data.actype == 2 ? "/Expend/doupdate" : "/Expend/doadd"
      const requestParams = {
        apiUrl: apiUrl,
        requestData: {
          draftid: this.data.draftId ? this.data.draftId : '',
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const staffData = wx.getStorageSync("staffData")
    const departmentData = wx.getStorageSync("departmentData")
    const capitalData = wx.getStorageSync("capitalData")
    if ( !staffData || !departmentData || !capitalData) {
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


    if (options.actype == 2) {
      const id = options.id
      const requestParams = {
        apiUrl: "/Expend/edit",
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
          dataDepartment: departmentData,
          dataCapital: capitalData,
          dataStaff: staffData,
        })
      }).catch(function(msg) {})
    } else if (options.actype == 3) {
      let draftId = options.draftid
      let requestParams = {
        apiUrl: "/Draft/detail",
        requestData: {
          draftid: draftId
        }
      }
      app.ajax(requestParams).then(res => {
        this.setData({
          showPage: true,
          actype: options.actype,
          draftId,
          base: JSON.parse(res.base),
          detailList: JSON.parse(res.detail),
          dataDepartment: departmentData,
          dataCapital: capitalData,
          dataStaff: staffData,
        })
        console.log(this.data)
      })

    } else {
      var baseInfo = this.data.base
      this.setData({
        dataDepartment: departmentData,
        dataCapital: capitalData,
        dataStaff: staffData,
        base: baseInfo
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

    // 检测是否已经选择了此科目
    let isHave = false
    isHave = detailLists.some(function(item) {
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