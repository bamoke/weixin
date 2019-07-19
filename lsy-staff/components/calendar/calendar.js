// components/calendar/calendar.js

/**
 * 转换为带0字符串
 */
function formatNumber(numb) {
  var n = numb.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取当月所有日及对应星期
 */
function monthAllDays(year, month, events) {
  var year = parseInt(year);
  var now = new Date();
  var dates = [];
  var monthDaysArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  //计算闰年
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    monthDaysArr.splice(1, 1, 29)
  }
  //生成当月所有天的对象
  for (let i = 1; i <= monthDaysArr[month]; i++) {
    let fullDay = [year, formatNumber(month + 1), formatNumber(i)].join('-');
    let dateObj = {
      date: i,
      fullDay: fullDay,
      weekDay: new Date(year, month, i).getDay()
    }
    //计算是否是当前
    if (year == now.getFullYear() && month == now.getMonth() && i == now.getDate()) {
      dateObj.isToday = true;
    }
    //判断是否有事件
    if (events.indexOf(fullDay) > -1) {
      dateObj.hasEvent = true
    }

    dates.push(dateObj);
  }
  return dates;
}


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: null,
      value: '',
      observer: function (newVal, oldVal, changedPath) {
        var dateObj = new Date(newVal.yearMonth)
        var curYear = dateObj.getFullYear();
        var curMonth = dateObj.getMonth();
        var events = newVal.events ? newVal.events:[]

        //
        var offsetDate = new Date(curYear, curMonth, 1);
        var offsetDay = offsetDate.getDay();

        let monthDays = monthAllDays(curYear, curMonth, events)
        this.setData({
          year: curYear,
          month: curMonth,
          monthDays,
          today: dateObj.getDate(),
          offsetDay: offsetDay
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: "",
    month: "",
    monthDays: [],
    today: "",
    offsetDay: 0 //对应星期偏移量
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selecte: function (e) {
      var monthDays = this.data.monthDays;
      let curIndex = e.currentTarget.dataset.index;
      monthDays.forEach(function(item,index,arr){
        if(index == curIndex){
          item.active = true
        }else {
          item.active = false
        }
      })
      var eventOpt = {
      };
      var eventDetail = {
        year: this.data.year,
        month: this.data.month,
        weekDay: monthDays[curIndex].weekDay,
        date: e.currentTarget.dataset.date
      }
      this.setData({ monthDays: monthDays})
      this.triggerEvent('selecte', eventDetail, eventOpt)
    },
    // handle switch month 
    _handleSwitchMonth: function (type) {
      var curYear = parseInt(this.data.year)
      var curMonth = parseInt(this.data.month)
      var newMonth = type == 'prev' ? curMonth - 1 : curMonth + 1;
      if (newMonth < 0) {
        newMonth = 11
        curYear -= 1
      } else if (newMonth > 11) {
        newMonth = 0
        curYear += 1
      }
      var myEventDetail = {
        handleType: type,
        date: [curYear, formatNumber(newMonth + 1)].join('-')
      }
      var myEventOption = {}
      this.triggerEvent('switch-month', myEventDetail, myEventOption)
    },
    switchPrevMonth: function () {
      this._handleSwitchMonth('prev')
    },
    switchNextMonth: function () {
      this._handleSwitchMonth('next')
    }
  },


  created: function () {
    console.log("component created")
  },
  /**
   * ready
   */
  ready: function () {
    console.log("conponent ready")
  }
})