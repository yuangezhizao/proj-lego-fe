const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["全部订单", "待付款", "待收货"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        getOrderList:[],
        pageNum:1,
        pageSize:10,
        hasMore: true,
        productOrderList:[],
        unPayEdList:[],
        payEdList:[]
    },
    onLoad: function () {
      wx.showLoading({
        title:'数据加载中'
      })
        var that = this;
        that.getOrderList();
        that.getData({pageSize:that.data.pageSize,pageNum:that.data.pageNum,orderStatus:'PAYED'});
        that.getData({ pageSize:that.data.pageSize,pageNum:that.data.pageNum,orderStatus:'UNPAYED'});
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    getData:function(data){
      const that = this;
      wx.showLoading({
        title:'数据加载中'
      })
      request({
        url: APIS.GET_ORDER_LIST,
        method:'GET',
        header: {
          auth: wx.getStorageSync('token')
        },
        data:data,
        realSuccess: (res) => {
          console.log(res.list);
          if(res.list[0].orderStatus=="UNPAYED"){
            that.setData({
              unPayEdList:res.list
            })
          }else if(res.list[0].orderStatus=='PAYED'){
            that.setData({
              payEdList:res.list
            })
          }
        },realFail:(res)=>{
          wx.showToast({
            title: res.message
        });
        }
      }, true, this)
    },
    getOrderList: function(data){
      var that = this;
      wx.showLoading({
        title:'数据加载中'
      })
      request({
        url: APIS.GET_ORDER_LIST,
        method:'GET',
        header: {
          auth: wx.getStorageSync('token')
        },
        data:{ pageSize:that.data.pageSize,
               pageNum:that.data.pageNum
        },
        realSuccess: (res) => {
          console.log(res.list);
          if(res.list){
            wx.hideLoading();
          }
         that.setData({
          productOrderList:res.list
         })
        },realFail:(res)=>{
          wx.showToast({
            title: res.message
        });
        }
      }, true, this)
    },
    onReachBottom: function () {
          console.log(13213);
          wx.showLoading({title:'数据加载中..'})
          
            if(this.data.hasMore){
              this.getOrderList();
            }else{
              wx.showToast({
                title:'没有更多数据了'
              })
            }
          
        }
});