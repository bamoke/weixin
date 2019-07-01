// pages/home/staff/staff-form/staff-form.js
const app = getApp()
var getToday = function() {
  var curDate = new Date();
  var year = curDate.getFullYear();
  var month = curDate.getMonth() + 1;
  var day = curDate.getDate();
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  return [year, month, day].join("-")
}
var toDay = getToday()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    objid: {
      type: Number,
      value: null,
      observer: function(newValue, oldValue) {
        this.setData({
          id: newValue
        })
      }
    },

    /**
     * 
     */
    initFormData: {
      type: Object,
      value: {},
      observer: function(newValue, oldValue) {
        console.log(newValue)
        this.setData({
          formData: newValue,
          curDepartment: newValue.department,
          curEntrytime: newValue.entry_time || toDay,
          curWorktype: newValue.work_type,
          curStafftype: newValue.staff_type
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: null,
    formData: {},
    department: [],
    curDepartment: '',
    curEntrytime: '',
    curWorktype: '',
    curStafftype: '',
    workTypeArr: ["全职", "兼职", "已离职"],
    staffTypeArr: ["正式员工", "试用员工", "实习生"],
    toDay: toDay
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChangeEntrytime(e) {

      this.setData({
        curEntrytime: e.detail.value
      })
    },
    handleChangeWorktype(e) {
      const worktypeArr = this.data.workTypeArr
      this.setData({
        curWorktype: worktypeArr[e.detail.value]
      })
    },
    handleChangeStafftype(e) {
      const staffTypeArr = this.data.staffTypeArr
      this.setData({
        curStafftype: staffTypeArr[e.detail.value]
      })
    },
    handleChangeDepartment(e) {
      var formData = this.data.formData
      const departmentList = this.data.department
      this.setData({
        curDepartment: departmentList[e.detail.value].name
      })
    },
    handleDel() {
      wx.showModal({
        content: '确认删除此员工？',
        success: res=> {
          if (res.confirm) {
            this._doDelete()
          }
        }
      })

    },
    _doDelete() {
      const requestParams = {
        apiUrl: "/Team/del",
        requestData: {
          comid: this.data.curComInfo.comId,
          id: this.data.id
        }
      }
      app.ajax(requestParams).then(res => {
        wx.showToast({
          title: '已删除',
          icon: "success"
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      })
    },
    formSubmit(e) {
      var newFormData = e.detail.value
      var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
      var apiUrl = this.data.id === null ? "/Team/save/comid/" + this.data.curComInfo.comId : "/Team/save/comid/" + this.data.curComInfo.comId + "/objid/" + this.data.id
      var requestParams = {
        apiUrl,
        requestMethod: "POST"
      }
      newFormData.department = this.data.curDepartment
      newFormData.comname = this.data.curComInfo.comShortName
      newFormData.entry_time = this.data.curEntrytime
      newFormData.work_type = this.data.curWorktype
      newFormData.staff_type = this.data.curStafftype
      // validate
      if (newFormData.name == '') {
        return this._showError("请输入员工姓名")
      }
      if (newFormData.worknu == '') {
        return this._showError("请输入员工工号")
      }
      var phone = newFormData.phone;
      if (!phone) {
        return this._showError("请输入手机号码")
      }
      if (!phoneRe.test(phone)) {
        return this._showError("手机号格式不正确")
      }

      // submit
      requestParams.requestData = {
        data: JSON.stringify(newFormData)
      }
      app.ajax(requestParams).then(res => {
        wx.showModal({
          content: '操作成功',
          showCancel: false,
          success: function(result) {
            if (result.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      })
    },
    _showError(msg) {
      wx.showToast({
        title: msg,
        image: "/static/images/error.png?v=4",
      })
      return false
    },
  },
  created: function() {
    // get partment info
    const comInfo = wx.getStorageSync("curComInfo")
    const requestParams = {
      apiUrl: "/Team/getdepartment",
      requestData: {
        comid: comInfo.comId
      },
      method: "get"
    }
    app.ajax(requestParams).then(res => {
      this.setData({
        department: res.list,
        curComInfo: comInfo
      })
    })
  }
})