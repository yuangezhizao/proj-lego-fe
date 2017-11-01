// pages/userCenter/userCenter.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
Page({
  data: {
    star: 0,
    notice: {
      text: '',
      link: ''
    },
    revieceCardList: [],
    myCouponList: [1],
    cardOrderList: [],
    productOrderList: [],
    nickName:'',
    avatarUrl:'',
    personCenterBg:'../../images/personCenterBg.png',
    couponType:'现金抵用券',
    couponDate:'2017年2月30日-6月30日',
    giftCardType:'伦敦巴士礼品卡',
    receivepeople:'',
    price:'199',
    pageNum:1,
    pageSize:6,
    hasMore: true,
    contentlist: []
  },
  onLoad: function (options) {
    user.login(this.getOrderList,true,this);
    this.getMyCouponList();
    const userInfo = wx.getStorageSync('userInfo');
    this.setData({
      nickName:userInfo.nickName,
      avatarUrl:userInfo.avatarUrl
    })
  },
  getOrderList: function(){
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
      data: {
        pageSize:that.data.pageSize,
        pageNum:that.data.pageNum
      },
      realSuccess: (res) => {
        console.log(res.list);
        var orderListItem = that.data.productOrderList;
        var productOrderList = res.list;
        console.log(productOrderList)
        if(productOrderList.length<that.data.pageSize){
          that.setData({
            productOrderList:orderListItem.concat(productOrderList),
            hasMore:false,
          })
        }else{
          that.setData({
            productOrderList:orderListItem.concat(productOrderList),
            hasMore:true,
            pageNum:that.data.pageNum +1
          })
        }
        wx.hideLoading();
      },realFail:(res)=>{
        wx.showToast({
          title: res.message
      });
      }
    }, true, this)
  },
  getMyCouponList:function(){
    request({
      url: APIS.GET_MY_COUPON_LIST,
      method:'GET',
      header: {
        auth: wx.getStorageSync('token')
      },
      realSuccess: (res) => {
        console.log(res);
        this.setData({
          myCouponList:res.data
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
  },

})