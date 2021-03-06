//出错的监听
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
	console.log("---ERROR---start---");
	console.log("错误信息-0:" + JSON.stringify(errorMessage.detail));
	console.log("错误信息-1:" + errorMessage);
	console.log("出错文件:" + scriptURI);
	console.log("出错行号:" + lineNumber);
	console.log("出错列号:" + columnNumber);
	console.log("错误详情:" + errorObj);
	console.log("---ERROR---end---");
}

//公共方法
var utils = (function(mod) {

	/**
	 * 获取url中的数据
	 * @param {String} url
	 */
	mod.getDataFromUrl = function(url) {
		var data = {};
		var index = url.indexOf("&");
		if(index != -1) {
			var dataStr = url.substring(index + 6, url.length);
			console.log("getDataFromUrl dataStr " + dataStr);
			data = JSON.parse(decodeURIComponent(dataStr));
		}
		console.log("getDataFromUrl url " + url);
		console.log("getDataFromUrl data " + JSON.stringify(data));
		return data;
	}

	/**
	 * 用mui打开一个页面，通过url传递数据
	 * @param {String} url 路径
	 * @param {Object} data 数据对象
	 */
	mod.mOpenWithData = function(url, data) {
		data = data || {};
		var ids = url.split("/");
		var dataStr = JSON.stringify(data);
		console.log("mOpen " + url + ' ' + dataStr);
		mui.openWindow(url + "?v=" + Math.random() + "&data=" + encodeURIComponent(dataStr), ids[ids.length - 1]);
	}

	/**
	 * 用window打开一个页面，通过url传递数据
	 * @param {String} url 路径
	 * @param {Object} data 数据对象
	 */
	mod.wOpenWithData = function(url, data) {
		data = data || {};
		var ids = url.split("/");
		var dataStr = JSON.stringify(data);
		console.log("wOpen " + url + ' ' + dataStr);
		window.open(url + "?v=" + Math.random() + "&data=" + encodeURIComponent(dataStr), ids[ids.length - 1]);
	}

	/**
	 *初始化mui的scrollY
	 * @param {Object} muiString
	 */
	mod.muiInitScrollY = function(muiString) {
		muiString = muiString || ".mui-scroll-wrapper";
		mui(muiString).scroll({
			scrollY: true, //是否竖向滚动
			scrollX: false, //是否横向滚动
			indicators: true, //是否显示滚动条
			deceleration: 0.003, //阻尼系数,系数越小滑动越灵敏
			bounce: true, //是否启用回弹
		});
	}

	/**
	 * 判断数据是否是undefined，null,""
	 * @param {Object} data
	 */
	mod.checkData = function(data) {
		if(data !== undefined && data !== null && data !== "") {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 给头像添加默认值
	 * @param {Object} string 传过来的头像url
	 * @param {Object} flag 当前调用界面对于默认头像的层级关系
	 */
	mod.updateHeadImage = function(string, flag) {
		var tempStr = '';
		//判断img是否为null，或者空
		if(string == '' || string == null || string == 'null' || string == undefined) { //赋值
			switch(flag) {
				case 0:
					tempStr = 'image/utils/default_personalimage.png';
					break;
				case 1:
					tempStr = '../image/utils/default_personalimage.png';
					break;
				case 2:
				default:
					tempStr = '../../image/utils/default_personalimage.png';
					break;
				case 3:
					tempStr = '../../image/utils/default_personalimage.png';
					break;
			}
		} else {
			tempStr = string;
		}
		return tempStr;
	}

	/**
	 * 获取时间 YYYY-MM-DD HH-MM-SS(2017-9-8 11:56:40)
	 */
	mod.getCurentTime = function() {
		var myDate = new Date();
		var year = myDate.getFullYear(); //年
		var month = myDate.getMonth() + 1; //月
		var day = myDate.getDate(); //日
		var hh = myDate.getHours(); //时
		var mm = myDate.getMinutes(); //分
		var ss = myDate.getSeconds(); //秒
		var clock = year + "-";
		if(month < 10) {
			clock += "0";
		}
		clock += month + "-";
		if(day < 10) {
			clock += "0";
		}
		clock += day + " ";
		if(hh < 10) {
			clock += "0";
		}
		clock += hh + ":";
		if(mm < 10) {
			clock += '0';
		}
		clock += mm + ":";
		if(ss < 10) {
			clock += '0';
		}
		clock += ss;
		return clock;
	}

	/**
	 * 格式化时间
	 * @param {String} data 201712061523
	 * @return {String} data 2017-12-06 15:23
	 */
	mod.initTime = function(data) {
		var year = data.substring(0, data.length - 8);
		var month = data.substring(data.length - 8, data.length - 6);
		var day = data.substring(data.length - 6, data.length - 4);
		var hour = data.substring(data.length - 4, data.length - 2);
		var minute = data.substring(data.length - 2);
		return year + "-" + month + "-" + day + " " + hour + ":" + minute;
	}

	/**
	 * 自定义actions，在jQuery-weui的基础上进行修改
	 * 1.增加:点击遮罩,点击取消按钮触发onClose
	 * 2.取消:点击传入的选项触发onClose
	 *
	 * @author 莫尚霖
	 * @param {Object} params
	 *
	 */
	mod.actions = function(params) {
		//用法示例:
		/*utils.actions({
			actions: [{
				text: "回复",
				onClick: function() {
					console.log("回复");
				}
			}, {
				text: "删除",
				className: "color-danger",
				onClick: function() {
					console.log("删除");
				}
			}],
			onClose: function() {
				//点击遮罩，点击取消按钮
				console.log("onClose:");
			}
		});*/
		var defaults = {
			title: undefined,
			onClose: undefined,
		}
		params = $.extend({}, defaults, params);
		var mask = $("<div class='weui-mask weui-actions_mask'></div>").appendTo(document.body);
		var actions = params.actions || [];
		var actionsHtml = actions.map(function(d, i) {
			return '<div class="weui-actionsheet__cell ' + (d.className || "") + '">' + d.text + '</div>';
		}).join("");
		var titleHtml = "";
		if(params.title) {
			titleHtml = '<div class="weui-actionsheet__title">' + params.title + '</div>';
		}
		var tpl = '<div class="weui-actionsheet " id="weui-actionsheet">' +
			titleHtml +
			'<div class="weui-actionsheet__menu">' +
			actionsHtml +
			'</div>' +
			'<div class="weui-actionsheet__action">' +
			'<div class="weui-actionsheet__cell weui-actionsheet_cancel">取消</div>' +
			'</div>' +
			'</div>';
		var dialog = $(tpl).appendTo(document.body);
		//点击传入的选项
		dialog.find(".weui-actionsheet__menu .weui-actionsheet__cell").each(function(i, e) {
			$(e).click(function() {
				hide();
				if(actions[i] && actions[i].onClick) {
					actions[i].onClick();
				}
			})
		});
		//点击取消按钮
		dialog.find(".weui-actionsheet__action .weui-actionsheet__cell").each(function(i, e) {
			$(e).click(function() {
				hide();
				if(params.onClose) {
					params.onClose();
				}
			})
		});
		//点击遮罩
		$(document).on("click", ".weui-actions_mask", function() {
			hide();
			if(params.onClose) {
				params.onClose();
			}
		});
		//显示的动画
		mask.show();
		dialog.show();
		//显示actions
		mask.addClass("weui-mask--visible");
		dialog.addClass("weui-actionsheet_toggle");
		//隐藏和移除actions
		var hide = function() {
			$(".weui-mask").removeClass("weui-mask--visible").transitionEnd(function() {
				$(this).remove();
			});
			$(".weui-actionsheet").removeClass("weui-actionsheet_toggle").transitionEnd(function() {
				$(this).remove();
			});
		}
	};

	/**
	 * href 打开一个页面，并保存SessionStorage数据
	 * @param {Object} data
	 */
	mod.hrefSessionStorage = function(url, data) {
		var sKey = new Date().getTime() + "" + parseInt(Math.random() * 1000);
		storageutil.setSessionStorage(sKey, JSON.stringify(data));
		location.href = url + "?sKey=" + sKey;
	}

	/**
	 * 通过url中的sKey,获取SessionStorage数据
	 * @return data
	 */
	mod.getSessionStorageByUrlsKey = function() {
		var search = location.search.toString();
		var keyword = "?sKey=";
		var index = search.indexOf(keyword);
		if(index != -1) {
			var sKey = search.substring(index + keyword.length);
			var sValue = storageutil.getSessionStorage(sKey)
			if(sValue) {
				var obj = JSON.parse(sValue);
				return obj;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}

	/**
	 * 获取url中的key值
	 * @param {Object} key
	 */
	mod.getValueFromUrlByKey = function(key) {
		var search = location.search.toString();
		var keyword = "?" + key + "=";
		var index = search.indexOf(keyword);
		if(index != -1) {
			var value = search.substring(index + keyword.length);
			return value;
		} else {
			return null;
		}
	}

	/**
	 * 当前时间+随机数
	 */
	mod.timeAndRandom = function() {
		var value = new Date().getTime() + "" + parseInt(Math.random() * 1000);
		return value;
	}

	/**
	 * 判断是安卓还是苹果系统
	 */
	mod.getSystem = function() {
		var userAgent = window.navigator.userAgent.toLowerCase();
		if(userAgent.indexOf("iphone") != -1) {
			return "iOS";
		}
		if(userAgent.indexOf("ipod") != -1) {
			return "iOS";
		}
		if(userAgent.indexOf("ipad") != -1) {
			return "iOS";
		}
		if(userAgent.indexOf("android") != -1) {
			return "Android";
		}
		return "unknown";
	}

	return mod;
})(window.utils || {});