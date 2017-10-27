// const.js
var config = require('./config.js');

var monthFormatList = [
  { arabic: 1, eng: 'January', simpleEng: 'Jan' },
  { arabic: 2, eng: 'February', simpleEng: 'Feb' },
  { arabic: 3, eng: 'March', simpleEng: 'Mar' },
  { arabic: 4, eng: 'April', simpleEng: 'Apr' },
  { arabic: 5, eng: 'May', simpleEng: 'May' },
  { arabic: 6, eng: 'June', simpleEng: 'Jun' },
  { arabic: 7, eng: 'July', simpleEng: 'Jul' },
  { arabic: 8, eng: 'August', simpleEng: 'Aug' },
  { arabic: 9, eng: 'September', simpleEng: 'Sep' },
  { arabic: 10, eng: 'October', simpleEng: 'Oct' },
  { arabic: 11, eng: 'November', simpleEng: 'Nov' },
  { arabic: 12, eng: 'December', simpleEng: 'Dec' },
];

var dayFormatList = [
  { chi: '周日', eng: 'Sunday', simpleEng: 'Sun' },
  { chi: '周一', eng: 'Monday', simpleEng: 'Mon' },
  { chi: '周二', eng: 'Tuesday', simpleEng: 'Tues' },
  { chi: '周三', eng: 'Wednesday', simpleEng: 'Wed' },
  { chi: '周四', eng: 'Thursday', simpleEng: 'Thur' },
  { chi: '周五', eng: 'Friday', simpleEng: 'Fri' },
  { chi: '周六', eng: 'Saturday', simpleEng: 'Sat' }
];

//var reqHost = 'https://xiaochengxu.im-cc.com';
var reqHost = config.domainPrefix;
//var reqHost = 'http://dev.im-cc.com:38880';

var APIS = {
  GET_NAV_TYPE: '/nav/type',
  GET_NAV_CAMPUS: '/nav/campus',
  GET_NAV_SPOT_LIST: '/nav/spot',
  GET_NAV_SPOT_DETAIL: '/nav/spot/${id}',

  LOGIN: '/activity/login',
  GET_SLIDER_LIST:       '/home/getSliderList', //获取首页轮播列表
  GET_ORDER_LIST:        'order/getOrderList', //获取历史购买商品的订单列表 
  
  GET_EVENT_TYPE_LIST: '/activity/eventType',
  GET_EVENTS_LIST_BY_MONTH: '/activity/getEventListByMonth',
  GET_EVENT_BASE: '/activity/getEventBase',
  GET_EVENT_DETAIL: '/activity/getEventDetail',
  TOGGLE_FOLLOW: '/activity/toggleFollow',
  SIGN_UP: '/activity/signUp',
  GET_VOTE_MODULE: '/activity/getVoteConfig',
  ADD_VOTE: '/activity/addVote',
  GET_TEST_MODULE: '/activity/getTestModule',
  SUBMIT_QUESTION: '/activity/submitQuestion',
  GET_MY_FOLLOW_LIST: '/activity/getMyFollowList',
  GET_MY_SIGNUP_LIST: '/activity/getMySignUpList',
  GET_EVENT_POSTER: '/activity/getEventPoster',
  GET_EVENT_QRCODE: '/activity/getEventQrCode',
  
  GET_NEARBY_CHAINSTORE: '/store/getNearbyChainStore',//获取附近的经销店列表
  GET_ALL_REGULARCHAIN:  '/store/getAllRegularChain',//获取所有专卖店列表
  GET_STORE_DETAIL:      '/sotre/getStoreDetail',//获取店铺详情
  SIGNIN_STORE:          '/store/signinStore',//店铺签到
  GET_STORE_QRCODE:      '/store/getStoreQrCode',//获取店铺小程序码

  TOP_COLUMNS: '/cms/viewOption/topColumns',
  VIEWDATA_POST: '/cms/viewData/post/${id}',
  POST_DETAIL: '/cms/post/detail/${id}',
  VIEWDATA_COLUMN_POSTS: '/cms/viewData/column_posts/${id}',
  POST_LIST: '/cms/post/list',
  VIEWDATA_SUBCOLUMN_POSTS: '/cms/viewData/subcolumn_posts/${id}'
}

for (var i in APIS) {
  if (Object.prototype.hasOwnProperty.call(APIS, i)) { //过滤
    APIS[i] = reqHost + APIS[i];
  }
}

var config = {
  mapkey: '52d76099cd5124c5e891ec8df55cc2d3'
}

module.exports = {
  monthFormatList: monthFormatList,
  dayFormatList: dayFormatList,
  APIS: APIS,
  config: config
}
