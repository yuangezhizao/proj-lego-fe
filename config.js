// config
module.exports = {
	caseName: 'default',
	themeName: 'default',
	//domainPrefix:'https://microcloudtech.com/gateway/lego/api',
	domainPrefix:'https://test.microcloudtech.com/service/lego/api', //测试专用
	//domainPrefix:'https://legominiprogram.teown.com/service/api',
	//domainPrefix:'http://192.168.31.202:8080/service/api',
	syncGlob: ['base/**/*', '!base/config.js', '!base/resources/*']
};
