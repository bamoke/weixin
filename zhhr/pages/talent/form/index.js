// pages/talent/form/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyId: '',
    papersTypeIndex: 0,
    papersTypeArr: ["请选择", "身份证", "护照", "通行证(港澳台)"],
    talentTypeIndex: 1,
    talentTypeArr: ["请选择","产业类","农技类","党政类","社工类","教育类","卫生类"],
    imgList: [],
    formData: {},
    showProgress: false
  },

  /**
   * methods
   */
  handlePapersTypeChange(e) {
    var index = e.detail.value
    this.setData({
      papersTypeIndex: index
    })
  },
  handleTalentTypeChange(e) {
    var index = e.detail.value
    this.setData({
      talentTypeIndex: index
    })
  },
  formSubmit(e) {
    var phoneRe = /^[1][3578]{1}([0-9]{9})$/;
    var requestParams
    let formData = e.detail.value
    let papersImg = this.data.imgList.map(item => {
      return item.name
    })
    if(this.data.talentId) {
      formData.id = this.data.talentId
    }
    formData.papers_img = papersImg.join(",")
    formData.papers_type = this.data.papersTypeIndex
    formData.talent_type = this.data.talentTypeIndex
    requestParams = {
      apiUrl: "/Talent/apply",
      requestMethod: "POST",
      requestData: formData
    }

    //validate
    if (formData.talent_type == 0) {
      this._showError("请选择人才类型")
      return
    }
    if (formData.realname == '') {
      this._showError("请填写真实姓名")
      return
    }
    if (formData.phone == '') {
      this._showError("请填写手机号")
      return
    }
    if (!phoneRe.test(formData.phone)) {
      return this._showError("手机号格式不正确")
    }
    if (formData.papers_type == 0) {
      this._showError("请选择证件类别")
      return
    }
    if (formData.papers_no == 0) {
      this._showError("请填写证件号码")
      return
    }
    if (formData.papers_img == "") {
      this._showError("请选择证件照片")
      return
    }
    app.ajax(requestParams).then(res => {
      wx.redirectTo({
        url: '../result/index',
      })
    })
  },
  showThumb(e) {
    const index = e.currentTarget.dataset.index
    var imgList = this.data.imgList
    var imgUrl = e.currentTarget.dataset.url
    var urlList = imgList.map(item => {
      return item.url
    })
    var curItem = imgList[index]
    wx.previewImage({
      current: curItem.url, // 当前显示图片的http链接
      urls: urlList // 需要预览的图片http链接列表
    })
  },
  deleteImg(e) {
    const index = e.currentTarget.dataset.index
    const _that = this
    var imgList = this.data.imgList
    var curItem = imgList[index]
    var applyId = this.data.applyId
    wx.showModal({
      content: '确定删除此图片？',
      success: function(result) {
        if (result.confirm) {
          let requestParams = {
            apiUrl: "/Uploads/img_delete",
            requestData: {
              img: curItem.name,
              applyid: applyId
            }
          }
          app.ajax(requestParams).then(res => {
            imgList.splice(index, 1)
            _that.setData({
              imgList
            })
          })
        }
      }
    })
  },
  addImg() {
    var canChooseNum = 1
    var _that = this
    wx.chooseImage({
      count: canChooseNum,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        _that.setData({
          showProgress: true
        })
        _that._upload(res.tempFilePaths)
      }
    })
  },
  /***
   * 上传
   */
  _upload(files) {
    const _that = this
    const uploadTask = wx.uploadFile({
      header: {
        'x-access-token': wx.getStorageSync('accessToken')
      },
      url: 'https://www.bamoke.com/jygw/api.php/Uploads/save_img',
      filePath: files[0],
      name: 'img',
      success(res) {
        const data = JSON.parse(res.data)
        //do something
        if (data.code != 200) {
          _that._showError(data.msg)
          _that.setData({
            showProgress: false
          })
          return
        }
        var oldList = _that.data.imgList
        var newList = {
          name: data.img,
          url: files[0],
        }
        _that.setData({
          imgList: oldList.concat(newList)
        })
      }
    })

    uploadTask.onProgressUpdate((res) => {
      _that.setData({
        percent: res.progress
      })
      // console.log('上传进度', res.progress)
      // console.log('已经上传的数据长度', res.totalBytesSent)
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

    // uploadTask.abort()


  },
  _showError: function(msg) {
    wx.showToast({
      title: msg,
      image: "/static/images/icon-error.png"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var imgList=[], requestParams,talentId,requestData = {}
      if(typeof options.id !== 'undefined') {
        requestData.id = options.id
        talentId = options.id
      }
      requestParams = {
        apiUrl: "/Talent/apply_detail",
        requestData
      }
    app.ajax(requestParams).then(res => {
      const info = res.data.info
      let newFormData = {}
      if (info) {
        newFormData.realname = info.realname
        newFormData.phone = info.phone
        newFormData.papers_no = info.papers_no
        if (info.papers_img) {
          imgList = info.papers_img.split(",").map(item => {
            return {
              name: item,
              url: res.data.imgbaseurl + "/" + item
            }
          })
        }
        this.setData({
          applyId: info.id,
          formData: newFormData,
          papersTypeIndex: info.papers_type,
          talentTypeIndex:info.type,
          imgList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },





})