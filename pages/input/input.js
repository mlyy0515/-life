

var app = getApp();
var amap = require("../../utils/amap-wx.js");
var key = "6696b996a26b88d5f38c537c2e989eed";
Page({
  data: {
    aroundList: [
      {
        name: '汽车服务',
        id: '010000'
      },
      {
        name: '汽车销售',
        id: '020000'
      },
      {
        name: '汽车维修',
        id: '030000'
      },
      {
        name: '摩托车',
        id: '040000'
      },
      {
        name: '餐饮',
        id: '050000'
      },
      {
        name: '购物',
        id: '060000'
      },
      {
        name: '生活',
        id: '070000'
      },
      {
        name: '体育休闲',
        id: '080000'
      },
      {
        name: '医疗保健',
        id: '090000'
      },
      {
        name: '住宿',
        id: '100000'
      },
      {
        name: '风景名胜',
        id: '110000'
      },
      {
        name: '商务住宅',
        id: '120000'
      }
    ],
    status: null,
    latitude: null,
    longitude: null,
    isShow: false,
    markers: [],
    points: [],
    location: '',
    name: '',
    address: ''
  },
  onLoad: function () {
    // 页面加载获取当前定位位置为地图的中心坐标
    var _this = this;
    wx.getLocation({
      success(data) {
        if (data) {
          _this.setData({
            latitude: data.latitude,
            longitude: data.longitude,
            markers: [{
              id: 0,
              latitude: data.latitude,
              longitude: data.longitude,
              iconPath: '../../images/ding.png',
              width: 16,
              height: 16
            }]
          });
        }
      }
    });
  },
  getType(e) {//获取选择的附近关键词，同时更新状态
    this.setData({ status: e.currentTarget.dataset.type })
    this.getAround(e.currentTarget.dataset.keywords, e.currentTarget.dataset.type);
  },
  getAround(keywords, types) {//通过关键词获取附近的点，只取前十个，同时保证十个点在地图中显示
    var _this = this;
    var myAmap = new amap.AMapWX({ key: key });
    myAmap.getPoiAround({
      iconPath: '../../images/blue.png',
      iconPathSelected: '../../images/ding.png',
      querykeywords: keywords,
      querytypes: types,
      location: _this.data.location,
      success(data) {
        if (data.markers) {
          var markers = [], points = [];
          for (var value of data.markers) {
            if (value.id > 9) break;
            if (value.id == 0) {
              _this.setData({
                name: value.name,
                address: value.address,
                isShow: true
              })
            }
            markers.push({
              id: value.id,
              latitude: value.latitude,
              longitude: value.longitude,
              title: value.name,
              iconPath: value.iconPath,
              width: 32,
              height: 32,
              anchor: { x: .5, y: 1 },
              label: {
                content: value.name,
                color: 'green',
                fontSize: 12,
                borderRadius: 10,
                bgColor: '#fff',
                padding: 3,
                x: 0,
                y: -50,
                textAlign: 'center'
              }
            });
            points.push({
              latitude: value.latitude,
              longitude: value.longitude
            })
          }
          _this.setData({
            markers: markers,
            points: points
          })
        }
      },
      fail: function (info) {
        wx.showToast({ title: info })
      }
    })
  }
});