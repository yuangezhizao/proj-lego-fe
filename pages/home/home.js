// pages/home/home.js
const { APIS } = require('../../const');
const { request } = require('../../libs/request');
const util = require('../../utils/util');
const user = require('../../libs/user');
const config = require('../../config')
const app = getApp();
Page({
  data: {
    pictureUrl: [],
    indicatorDots: true,
    circular:true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    navigateUrl: '',
    reserveImg:'',
    giftImg:'',
    list:'',
    shareImg:'',
    spuListTop:'',
    cacheDataUrl:''
  },
  onLoad: function (options) {
    this.getCacheData();
  },
  getIndexResource:function(){
    wx.request({
      url: APIS.GET_INDEX_RESOURCE,
      method: 'GET', 
      success:res=>{
        console.log(res.data.data);
        const datas = res.data.data;
        this.setData({
          pictureUrl:datas.indexTop,
          reserveImg:datas.indexSeckill.pictureUrl,
          giftImg:datas.indexGift.pictureUrl,
          shareImg:datas.indexSharedImage.pictureUrl,
          spuListTop:datas.spuListTop  
        })
        //首页跳转传的图片
        const navigateUrl =this.data.spuListTop.navigateUrl;
        const pictureUrl = this.data.spuListTop.pictureUrl;
        app.globalData.navigateUrl = navigateUrl;
        app.globalData.pictureUrl = pictureUrl;
      },
      fail:(res)=> {
        wx.showToast({
          title: res
      });
      }
    })
  },
  getCacheData:function(){
    if(config.domainPrefix=='https://legominiprogram.teown.com/service/api'){
    this.setData({
      cacheDataUrl:'https://legostatic.teown.com/index_option.json'
    })
    }else{
      this.setData({
        cacheDataUrl:'https://legostatic.teown.com/index_option_test.json'
      })
    }
    request({
      url:this.data.cacheDataUrl,
      method: 'GET',
      realSuccess: res=>{
        console.log(res)
        if(res){
          const datas = res;
          this.setData({
            pictureUrl:datas.indexTop,
            reserveImg:datas.indexSeckill.pictureUrl,
            giftImg:datas.indexGift.pictureUrl,
            shareImg:datas.indexSharedImage.pictureUrl,
            spuListTop:datas.spuListTop 
          })
          //首页跳转传的图片
          const navigateUrl =this.data.spuListTop.navigateUrl;
          const pictureUrl = this.data.spuListTop.pictureUrl;
          app.globalData.navigateUrl = navigateUrl;
          app.globalData.pictureUrl = pictureUrl;
        }
      },
      realFail:res=> {
        this.getIndexResource();
      },
    },false,this)
  },
  toProductList:function(){
    const navigateUrl =this.data.spuListTop.navigateUrl;
    const pictureUrl = this.data.spuListTop.pictureUrl;
    app.globalData.navigateUrl = navigateUrl;
    app.globalData.pictureUrl = pictureUrl;
    wx.navigateTo({
      url: '../productList/productList'
  })
}
, //跳转小程序
  openProgram: () => {
    //打开礼品卡小程序
    // wx.navigateToMiniProgram({
    //   appId: 'wx36f3e821949ce24b',
    //   path: 'pages/index/index',
    //   extraData: {},
    //   envVersion: 'release',
    //   success(res) {
    //     console.log('跳转小程序成功');
    //   }
    // })
  wx.showModal({
    title:'提示',
    content:'礼品店暂时关闭！',
    showCancel:false
  })
  },
  onShareAppMessage: function (res) {
    return {
      title: '玩的快乐',
      path: '/pages/home/home',
      imageUrl:this.data.shareImg,
      success: function(res) {
        console.log('转发成功')
      },
      fail: function(res) {
        console.log("转发失败")
      }
    }
  }
})