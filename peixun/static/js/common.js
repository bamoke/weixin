var siteConf = {
  staticUrl:"http://ojpuy4nsw.bkt.clouddn.com/",
  apiBaseUrl:'https://www.xinzhinetwork.com/api.php',
  sourceUrl:'https://www.xinzhinetwork.com/Upload/',
  ossUrl:"https://wesource.oss-cn-shenzhen.aliyuncs.com"
};
var commonFunc = {
  formatTime:function(time){
    var newTime = parseInt(time);
    var minite = Math.floor(newTime/60);
    var second = (newTime % 60) > 9 ? (newTime % 60) : "0" + (newTime % 60);
    minite = minite > 9 ?minite:"0"+minite;
    return minite +":"+ second
  }
}
export { siteConf, commonFunc}