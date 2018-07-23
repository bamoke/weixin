//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageShow: false,
    sourceUrl: app.globalData.sourceUrl,
    banner: [],
    recommend:[],
    newList:[],
    nav:{},
    keyWord:'',
  },
  setkeywords:function(e){
    var keyWords = e.detail.value;
    this.setData({
      keyWord: keyWords
    })
  },
  gosearch:function(){
    var keyword = this.data.keyWord;
    if(keyword == ''){
      return
    }else {
      wx.navigateTo({
        url: '../search/index?k=' + keyword
      })
    }
  },
  onLoad: function () {
    const apiUrl = "/Index/index"
    var requestResult = app.fetchData(apiUrl);
    requestResult.then(result=>{
      this.setData({
        pageShow:true,
        banner:result.info.banner,
        recommend: result.info.recommend,
        newList:result.info.new,
        ad: result.info.ad,
        nav:{
          isIndex:true,
          list:result.info.nav
        }
      })
    }).catch(reject=>{
      console.log(reject)
    })
  },

})
