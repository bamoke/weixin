// pages/qjcc/new/index.js
const typeArr = ["调休", "事假", "病假", "年假"];
const myName = '王祥印';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      type: typeArr[0],
      title:"",
      startDate:"请选择日期",
      startTime:"08:00",
      endDate: "请选择日期",
      endTime: "09:00",
      description:""
    },
    typeArr,
    isPostIng:false,
    initStartDate:'',
    initEndDate:''
  },

  /**
   * form data set
   */
  typeChange:function(e){
    const index = e.detail.value;
    const formData = this.data.formData;
    formData.type = typeArr[index];
    formData.title = typeArr[index] + '_' + myName + '_' + formData.startDate;//自动更新标题
    this.setData({formData})
  },
  titleChange:function(e){
    const formData = this.data.formData;
    formData.title = e.detail.value;
    this.setData({ formData })
  },
  valueChange:function(e){
    const value = e.detail.value;
    const key = e.currentTarget.dataset.type;
    const formData = this.data.formData;
    formData[key] = value;
    if(key == 'startDate') {
      let endDate = new Date(formData.endDate);
      let startDate = new Date(formData.startDate);
      if (endDate - startDate < 0 ){
        formData.endDate = value;
        console.log("s")
      }
      formData.title = formData.type + '_' + myName + '_' + value; 
    }
    this.setData({formData})
  },
  /**
   * form post
   */
  showError: function (tips) {
    this.setData({
      errorStatus:true,
      errorMsg:tips
    })
/*     wx.showToast({
      title: tips,
      image: "/static/images/error.png?v=4",
    }) */
  },
  submitContent:function(){
    if(this.data.isPostIng) return;
    const formData = this.data.formData;
    // validate form data
    const startDateTime = new Date(formData.startDate + ' ' + formData.startTime);
    const endDateTime = new Date(formData.endDate + ' ' + formData.endTime);
    if (formData.type == '请选择') {
      this.showError('请选择类型')
      return;
    }
    if (formData.title.trim() == '') {
      this.showError('请填写标题')
      return;
    }
    if (formData.title.trim() == '') {
      this.showError('请填写标题')
      return;
    }
    console.log(endDateTime,endDateTime - startDateTime)
    if (endDateTime - startDateTime <= 0) {
      this.showError('结束时间必须大于开始时间')
      return;
    }
    
    //update status
    this.setData({
      isPostIng:true,
      errorStatus:false
    })

    // post data
    console.log("post data")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date().toLocaleDateString();
    date = date.replace(/\//g, "-");
    const formData = this.data.formData;
    formData.startDate = date;
    formData.endDate = date;
    formData.title = formData.type + '_' + myName + '_' + date;
    this.setData({formData})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

})