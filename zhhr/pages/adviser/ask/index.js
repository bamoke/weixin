// pages/adviser/ask/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    isCompleted:false,
    curContentLength:0,
    radioItems: [{
        name: '所有人可见',
        value: '1',
        checked: true
      },
      {
        name: '仅自己可见',
        value: '0'
      }
    ],




    formData: {
      isopen: 1
    },
    rules: [{
      name: 'isopen',
      rules: {
        required: true,
        message: '单选列表是必选项'
      },
    }, {
      name: 'title',
      rules: {
        required: true,
        message: '请输入问题标题'
      },
    }]
  },
  handleInput(e) {
    const value = e.detail.value
    const fieldName = e.currentTarget.dataset.name
    let newFormData = this.data.formData
    let curContentLength = this.data.curContentLength
    newFormData[fieldName] = value
    if(fieldName == 'content'){
      curContentLength = value.length
    }
    this.setData({
      formData: newFormData,
      curContentLength
    })
  },
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.isopen`]: e.detail.value
    });
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })

        }
      } else {
        app.ajax({
          apiUrl:'/AdviserQuestion/doadd',
          requestData:{...this.data.formData},
          requestMethod:"POST"
        }).then(res=>{
          this.setData({
            isCompleted:true
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var formData = {
      isopen: 1
    }
    if (options.cateid) {
      formData.cate_id = options.cateid
    }
    if (options.to) {
      formData.touser = options.to
    }
    this.setData({
      formData
    })
  }


})