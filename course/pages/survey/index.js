// pages/survey/index.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: true,
    showError:false,
    surveyId:1,
    title: "大学生关于服饰消费情况的调查",
    description:"在经济相对自由的学生时代，没有方向的随意消费似乎是当前大学生普遍的消费状况。只有充分进行调查了解，才能帮助建立健康的消费价值观",
    progress:0,
    selectedQuestion:[],
    siglePrecent:51,
    questionList: [
      {
        id: 1,
        question: "请问您的性别是：",
        type: 1,
        selected:false,
        showError:false,
        selectedAnswer: "",
        answerList: [
          {
            id: 1,
            name: "男"
          },
          {
            id: 2,
            name: "女"
          }
        ]
      },
      {
        id: 2,
        question: "您一个月的收入（家庭所给、个人所赚、资助所得等）是：",
        type: 2,
        selected: false,
        selectedAnswer:"",
        answerList: [
          {
            id: 3,
            name: "800元以下"
          },
          {
            id: 4,
            name: "800-1000元"
          },
          {
            id: 5,
            name: "1000-1200元"
          },
          {
            id: 6,
            name: "1200-1500元"
          }
        ]
      }
    ]
  },
  valueChange:function(data){
    var curValue = data.detail.value
    var curQuestionIndex = data.target.dataset.qindex
    var questionList = this.data.questionList;
    var selectedQuestion = this.data.selectedQuestion;
    var progress;
    questionList[curQuestionIndex].selected= true;

    //设置已选择的问题
    var selectedIndex = selectedQuestion.indexOf(curQuestionIndex);
    if (selectedIndex < 0){
      selectedQuestion.push(curQuestionIndex)
    }

    //选取答案
    if(typeof curValue ==='string'){
      questionList[curQuestionIndex].selectedAnswer = curValue;
    }else {
      if (curValue.length === 0 ){
        questionList[curQuestionIndex].selected = false;
        selectedQuestion.splice(selectedIndex,1)

      }
      questionList[curQuestionIndex].selectedAnswer = curValue.toString();
    }

    //ser progress
    progress = selectedQuestion.length * this.data.siglePrecent;
    
    //update data
    this.setData({
      questionList: questionList,
      progress: progress > 100 ? 100 : progress
    })

  },
  submit:function(){
    var selectedQuestion = this.data.selectedQuestion;
    var questionList = this.data.questionList;
    var apiUrl = "/Survey/dopoll";
    var requestData={};
    var allSelectedAnswer="";
    if (selectedQuestion.length != questionList.length){
      this.setData({
        showError:true
      })
      return;
    }
    //
    requestData.id = this.data.surveyId;
    questionList.forEach(function(e){
      allSelectedAnswer += (e.selectedAnswer).toString() + ","
    })
    console.log(allSelectedAnswer);
    requestData.answerid = allSelectedAnswer.slice(0,allSelectedAnswer.length-1);
    var postData = App._getApiData(apiUrl,requestData,"POST")

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})