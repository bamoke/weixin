// pages/demo/index.js
const app = getApp()

Page({
data:{
title:"ceshi",
price:"19.88"
},
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
    this.buyconfirm = this.selectComponent("#buyconfirm")
    this.sharemodal = this.selectComponent("#shareModal")
    console.log(this.buyconfirm)
    console.log(this.buyconfirm)
    console.log(this.sharemodal)
  },

  showDialog() {
    this.dialog.showDialog();
  },
  showShare() {
    this.sharemodal.show();
  },
  showBuyconfirm:function(){
    this.buyconfirm.show()
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  }

})