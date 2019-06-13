var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js

Page({
  data: {
    tips: {}
  },
  onLoad: function () {

  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = "6696b996a26b88d5f38c537c2e989eed";
    var myAmapFun = new amapFile.AMapWX({ key: '6696b996a26b88d5f38c537c2e989eed' });
    myAmapFun.getInputtips({
      keywords: keywords,
      location: '',
      success: function (data) {
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }

      }
    })
  },
  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var url = '../poi/poi?keywords=' + keywords;
    console.log(url)
    wx.redirectTo({
      url: url
    })
  }
})