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
    showProgress: false
  },
  /**
   * methods
   */
  showThumb(e){
    console.log(e)
    const index = e.currentTarget.dataset.index
    var imgList = this.data.imgList
    var imgUrl = e.currentTarget.dataset.url
    var urlList = imgList.map(item=>{
      return item.url
    })
    var curItem = imgList[index]
    wx.previewImage({
      current: curItem.url, // 当前显示图片的http链接
      urls: urlList // 需要预览的图片http链接列表
    })
  },
  deleteImg(e){
    const index = e.currentTarget.dataset.index
    const _that = this
    var imgList = this.data.imgList
    var curItem = imgList[index]
    wx.showModal({
      content: '确定删除此图片？',
      success:function(result){
        if(result.confirm){
          let requestParams = {
            apiUrl: "/Resume/attachment_delete",
            requestData:{img:curItem.name}
          }
          app.ajax(requestParams).then(res => {
            imgList.splice(index,1)
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
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        _that.setData({
          showProgress: true
        })

        // 上传
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
      url: 'https://www.bamoke.com/hnyc/api.php/Uploads/save_img',
      filePath: files[0],
      name: 'img',
      formData: {
        'user': 'test'
      },
      success(res) {
        const data = res.data
        //do something
        console.log(data)
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {
    var requestParams = {
      apiUrl:"/Resume/attachment"
    }
    app.ajax(requestParams).then(res=>{
      this.setData({
        imgList:res.data.list
      })
    })
  },





})