// pages/adviser/questiondetail/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId:null,
    showPage:false,
    questionInfo:{},
    answerList:[]
  },

  handleOperation(e){
    const {index,type} = e.currentTarget.dataset
    const newList = this.data.answerList
    let typeVal = newList[index]['l_'+type]
    console.log('l_'+type)
    if(typeVal == 1) return false
    newList[index]['l_'+type] = 1
    newList[index][type + '_num'] = parseInt(newList[index][type + '_num']) + 1
    this.setData({
      answerList:newList
    })
    app.ajax({
      apiUrl:"/AdviserOperation/dooperation",
      requestData:{questionid:this.data.questionId,answerid:newList[index].id,checked:type},
      requestMethod:"get",
      showLoading:false
    }).then(res=>{

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!options.id) {
      app.errorBack({tips:"参数错误"})
      return
    }
    const questionId = options.id
    app.ajax({
      apiUrl:"/AdviserQuestion/detail",
      requestData:{id:questionId}
    }).then(res=>{
      this.setData({
        questionId,
        questionInfo:res.data.questionInfo,
        answerList:res.data.answerList,
        showPage:true
      })
    }) 
  }
})