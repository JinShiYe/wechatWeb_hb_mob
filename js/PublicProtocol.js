//

//获取界面需要的config参数
var getConfigParameter = function(callback) {
	var url = window.location.href;
	var cncodeUrl = encodeURIComponent(url);
	jQuery.post('https://jsypay.jiaobaowang.net/wxth/jssdkapi.aspx', {
		reuri: cncodeUrl
	}, function(data) {
		callback(JSON.parse(data));
	});
}

//发送微信的config协议
var sendConfigPro = function(configmsg, apiList) {
	wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: configmsg.appId, // 必填，公众号的唯一标识
		timestamp: configmsg.timestamp, // 必填，生成签名的时间戳
		nonceStr: configmsg.nonceStr, // 必填，生成签名的随机串
		signature: configmsg.signature, // 必填，签名
		jsApiList: apiList // 必填，需要使用的JS接口列表
	});
}

//发送对应的网站协议，根据页面传送的data
var unitWebsitePro = function(data0, callback) {
	xhrPost('https://jsypay.jiaobaowang.net/wxth/appschweb/schwebapi.aspx', JSON.stringify(data0), callback);
}

/**
 * 发送 jQuery ajax post 的请求
 * @param {Object} url 路径
 * @param {Object} data 数据
 * @param {Object} callback 回调
 */
var jQAjaxPost = function(url, data, callback) {
	console.log('jQAP-Url:', url);
	console.log('jQAP-Data:', data);
	jQuery.ajax({
		url: url,
		type: "POST",
		data: data,
		timeout: 30000,
		dataType: "json",
		async: true,
		success: function(success_data) { //请求成功的回调
			console.log('jQAP-Success:', success_data);
			callback(success_data);
		},
		error: function(xhr, type, errorThrown) {
			console.log('jQAP-Error:', xhr, type);
			callback({
				RspCode: 404,
				RspData: null,
				RspTxt: "网络连接失败,请重新尝试一下"
			});
		}
	});
}

/**
 * 发送 XMLHttpRequest post 的请求
 * @param {Object} url 路径
 * @param {Object} data 数据
 * @param {Object} callback 回调
 */
var xhrPost = function(url, data, callback) {
	console.log('XHRP-Url:', url);
	console.log('XHRP-Data:', data);
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.timeout = 30000; //10秒超时
	xhr.onload = function(e) {
		console.log("XHRP:onload:", e);
		if(this.readyState === 4 && this.status === 200) {
			var success_data = JSON.parse(this.responseText);
			console.log('XHRP-Success:', success_data);
			if(success_data.RspCode == 0013) {
				callback({
					RspCode: 404,
					RspData: null,
					RspTxt: "用户没有登录或超时,关闭当前页,重新从企业管理端登录."
				});
			} else {
				callback(success_data);
			}
		} else {
			callback({
				RspCode: 404,
				RspData: null,
				RspTxt: "网络连接失败,请重新尝试一下"
			});
		}
	}
	xhr.ontimeout = function(e) {
		console.log("XHRP:ontimeout:", e);
		callback({
			RspCode: 404,
			RspData: null,
			RspTxt: "网络连接失败,请重新尝试一下"
		});
	};
	xhr.onerror = function(e) {
		console.log("XHRP:onerror:", e);
		callback({
			RspCode: 404,
			RspData: null,
			RspTxt: "网络连接失败,请重新尝试一下"
		});
	};
	xhr.send(data);
}

//考勤协议
var tempAttendUrl = 'https://jbyj.jiaobaowang.net/AttendanceService/';

//合并参数
var extendParameter = function(data0) {
	var tempData = {
		uuid: '',
		appid: '',
		token: '',
		sign: ''
	}
	return $.extend(data0, tempData);
}

//1.新增考勤类型
var addAttendTypePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'addAttendType', JSON.stringify(data0), callback);
}

//2.修改考勤类型
var setAttendTypePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'setAttendType', JSON.stringify(data0), callback);
}

//3.删除考勤类型
var delAttendTypePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'delAttendType ', JSON.stringify(data0), callback);
}

//12.获取考勤类型
var getAttendTypePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getAttendType', JSON.stringify(data0), callback);
}

//4.新增考勤时间段
var addAttendTimePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'addAttendTime', JSON.stringify(data0), callback);
}

//5.修改考勤时间段
var setAttendTimePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'setAttendTime', JSON.stringify(data0), callback);
}

//6.删除考勤时间段
var delAttendTimePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'delAttendTime', JSON.stringify(data0), callback);
}

//7.新增考勤地点
var addAttendAreaPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'addAttendArea', JSON.stringify(data0), callback);
}

//8.修改考勤地点
var setAttendAreaPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'setAttendArea', JSON.stringify(data0), callback);
}

//9.删除考勤地点
var delAttendAreaPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'delAttendArea', JSON.stringify(data0), callback);
}

//10.新增考勤记录
var addAttendPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'addAttend', JSON.stringify(data0), callback);
}

//11.删除考勤记录
var delAttendPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'delAttend', JSON.stringify(data0), callback);
}

//13.获取考勤时间段
var getAttendTimePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getAttendTime', JSON.stringify(data0), callback);
}

//14.获取考勤地点
var getAttendAreaPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getAttendArea', JSON.stringify(data0), callback);
}

//15.获取考勤记录
var getAttendPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getAttend', JSON.stringify(data0), callback);
}

//16.获取考勤统计
var getAttendStatPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getAttendStat', JSON.stringify(data0), callback);
}

//17.获取选择用考勤类型
var getAttendTypeForSelPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getAttendTypeForSel', JSON.stringify(data0), callback);
}

//18.获取请假记录
var getLeavePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempAttendUrl + 'getLeave', JSON.stringify(data0), callback);
}

//学生成长轨迹接口
var tempEvaluationUrl = 'https://jbyj.jiaobaowang.net/EvaluationService/';

//1.新增点评模板
var addEvalTemplatePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'addEvalTemplate', JSON.stringify(data0), callback);
}

//2.删除点评模板
var delEvalTemplatePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'delEvalTemplate', JSON.stringify(data0), callback);
}

//3.获取点评模板
var getEvalTemplatePro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'getEvalTemplate', JSON.stringify(data0), callback);
}

//4.新增点评
var addEvaluationPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'addEvaluation', JSON.stringify(data0), callback);
}

//5.获取点评
var getEvaluationPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'getEvaluation', JSON.stringify(data0), callback);
}

//6.获取班级列表
var getDeptsByUserPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'getDeptsByUser', JSON.stringify(data0), callback);
}

//7.获取本周点评情况
var getWeekEvalPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'getWeekEval', JSON.stringify(data0), callback);
}

//8.获取多人点评统计
var getEvalStatByUsersPro = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'getEvalStatByUsers', JSON.stringify(data0), callback);
}
//9.删除点评
var delEvaluation = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'delEvaluation', JSON.stringify(data0), callback);
}
//10.获取多部门点评统计
var getEvalStatByDepts = function(data0, callback) {
	data0 = extendParameter(data0);
	xhrPost(tempEvaluationUrl + 'getEvalStatByDepts', JSON.stringify(data0), callback);
}
