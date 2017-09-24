let API = require('../../utils/api')
let Util = require('../../utils/util') 
let app = getApp()

Page({

  data: {
  },

  onUpper(e){
  },


  onShow () {
  },

  onLoad (options){
    var _this = this
    if(app.globalData.weather){
      _this.setData({weather: app.globalData.weather})
      return
    }
    
    API.getLocation()
      .then(API.getCityId)
      .then(API.getNowWeather)
      .then((weather)=>{
        weather.format_last_update = Util.formatTime(weather.last_update)
        weather.bg = Util.getBackground(weather.now.code)
        _this.setData({weather})
        app.globalData.weather = weather
      }).catch(_this.onError)
  },

  onError(err){
    wx.showToast({
      title: err.msg,
      duration: 2000
    })
  }


})