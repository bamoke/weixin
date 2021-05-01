//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
  },
  config: {
    apiBase_mock: 'https://www.fastmock.site/mock/77a0672b6327571cdcdc79752f2ccbc9/peisong',
    apiBase: 'https://www.bamoke.com/peisong/index.php'
  },
  ajaxLoaded: true,
  ajax:function({apiUrl,requestMethod,requestData,showLoading=true}){
       // before send
       var _that = this;
       if (!this.ajaxLoaded) {
         return
       }
       if (showLoading) {
         wx.showLoading({
           title: '加载中',
         })
       }
       this.ajaxLoaded = false;
   
       // send
       var myPromise = new Promise(function(resolve, reject) {
         wx.request({
           url: _that.config.apiBase + apiUrl,
           data: requestData,
           method: requestMethod,
           dataType: "json",
           header: {
             'content-type': 'application/x-www-form-urlencoded',
             'x-access-token': wx.getStorageSync('accessToken')
           },
           success: function(res) {
            //  console.log(res)
             if (showLoading) {
               wx.hideLoading();
             }
             if (res && res.data.code == 200) {
               resolve(res.data)
             } else {
              const routes = getCurrentPages();
              const curPage = routes[routes.length - 1]
              const routeOpt = curPage.options
              var fullPath = "/" + curPage.route
              let routeOptKeys = Object.keys(routeOpt);
              var paramsArr = [];
              var pageParams = ""
              if (routeOptKeys.length) {
                paramsArr = routeOptKeys.map(item => {
                  return item + "=" + routeOpt[item]
                })
                pageParams = "?" + paramsArr.join("&")
              }
              fullPath += pageParams

               if (res.data.code == 11002 || res.data.code == 11001) {
 
                 wx.navigateTo({
                   url: '/pages/mplogin/index?back=' + encodeURIComponent(fullPath),
                 })
   
   
               }else if(res.data.code == 11003){
                 wx.navigateTo({
                   url: '/pages/bind/index?back=' + encodeURIComponent(fullPath),
                 })
               } else if(res.data.code == 13009){
   
               } else {
                 wx.showToast({
                   title: res.data.msg,
                   image: "/images/icon-error.png"
                 })
               }
               reject(res.data)
             }
           },
           fail: function() {
             wx.showToast({
               title: "网络连接错误",
               image: "/images/icon-error.png"
             })
             
             reject("连接错误")
           },
           complete:function(){
            _that.ajaxLoaded = true
           }
         })
       })
       return myPromise;
  },
  /**
   * 比较产品是否存在于购物车
   */
  compare:function(proList){
    const carData = wx.getStorageSync('car')
    if(proList.length === 0) return []
    if(carData.length === 0 ) return proList
    proList.forEach((el,index) => {
      for(let i=0;i<carData.length;i++) {
        if(el.id == carData[i].id) {
          proList[index].buynum = carData[i].buynum
          break
        }
      }
    });
    return proList

  },
  errorBack: function ({
    tips,
    deltaNu = 1,
    delay = 1000
  }) {
    wx.showToast({
      title: tips,
      image: "/images/error.png?v=4",
    })
    setTimeout(function () {
      wx.navigateBack({
        delta: deltaNu
      })
    }, delay)
  }
})
