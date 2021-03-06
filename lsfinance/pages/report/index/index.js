// pages/report/index/index.js
import * as echarts from '../../../components/ec-canvas/echarts';

const app = getApp()

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: 'bsssa',
      subtext:"尼玛",
      textAlign:"left"
    },
    tooltip: {},
    xAxis: {
      data: ["2018-01", "2019-02", "2019-03", "2019-04", "2019-05", "2019-06", "2019-07", "2019-08", "2019-09", "2019-10", "2019-11", "2019-12"]
    },
    yAxis: {},
    series: [{
      name: 'dd',
      type: 'line',
      data: [15, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
    }]
  };


  chart.setOption(option);
  return chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carTab: 0,
    reportType: [
      {
        name: "单据量",
        action: "bill"
      },
      {
        name: "员工数",
        action: "staff"
      }
    ],
    ec: {
      onInit: initChart
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    app.ajax({
      apiUrl:"/Report/index"
    }).then(res=>{
      console.log(res)
    })
  }

})