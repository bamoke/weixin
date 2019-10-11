// pages/resume/upload/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    showBig: false, //显示大图
    curImg: null, //当前显示的大图
  },
  /**
   * methods
   */
  addImg() {
    var canChooseNum = 1
    var _that = this
    wx.chooseImage({
      count: canChooseNum,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _that._upload(tempFilePaths)


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
      url: 'https://www.bamoke/hnyc/api.php/Upload/save',
      filePath: files[0],
      name: 'img',
      formData: {
        'user': 'test'
      },
      success(res) {
        const data = res.data
        console.log(data)
        //do something
        /*         var oldList = _that.data.imgList
                var newList = tempFilePaths.map(item => {
                  return {
                    name: "",
                    url: item,
                    progress: 0
                  }
                })
                _that.setData({
                  imgList: oldList.concat(newList)
                }) */
      }
    })

    uploadTask.onProgressUpdate((res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    })

    // uploadTask.abort()
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





})