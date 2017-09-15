//我的个人信息model,查看参数详细信息请访问:http://open.work.weixin.qq.com/wwopen/doc#10019
var mineUserInfo = {};
//记录我所处的部门的所有人的用户信息
var departUserInfo = {
	key: [],
	value: {}
};
var temp_data; //临时变量;用于查询我所处部门的所有成员
var show_class_circle_app = false; //是否显示班级圈app
var router; //路由
var router_user_space; //个人空间路由
var router_add_trends; //上传图片时使用的发布路由
//班级圈主页数据
var home_data = {
	is_on: 0, //当前显示的列表
	allow_back: true, //是否允许返回
	data: [{
		id: "all_trends_0", //tab列表的id
		title: "全部动态", //tab的名称
		scrollTop: 0, //tab列表的滚动距离
		leave: false, //是否离开
		init_getData: false, //首次显示列表时是否获取数据
		allow_loaddata: false, //允许下刷新或者加载中
		show_loadmore: true, //是否显示加载中
		show_loadmore_loading: true, //是否显示加载中的转圈图标
		show_loadmore_content: "加载中", //加载中元素的文字
		show_error: false, //是否显示失败或者无数据
		show_no_more: false, //失败类型
		allow_loadmore: false, //允许加载更多
		data: [] //tab列表的数据
	}, {
		id: "mine_trends_1",
		title: "我的动态",
		scrollTop: 0,
		leave: false,
		init_getData: true, //首次显示列表时是否获取数据
		allow_loaddata: false, //允许下刷新或者加载中
		show_loadmore: true, //是否显示加载中
		show_loadmore_loading: true, //是否显示加载中的转圈图标
		show_loadmore_content: "加载中", //加载中元素的文字
		show_error: false, //是否显示失败或者无数据
		show_no_more: false, //失败类型
		allow_loadmore: false, //允许加载更多
		data: []
	}, {
		id: "relate_to_me_2",
		title: "与我相关",
		scrollTop: 0,
		leave: false,
		init_getData: true, //首次显示列表时是否获取数据
		allow_loaddata: false, //允许下刷新或者加载中
		show_loadmore: true, //是否显示加载中
		show_loadmore_loading: true, //是否显示加载中的转圈图标
		show_loadmore_content: "加载中", //加载中元素的文字
		show_error: false, //是否显示失败或者无数据
		show_no_more: false, //失败类型
		allow_loadmore: false, //允许加载更多
		data: []
	}]
};
var space_data = {}; //空间的所有数据
var qnFileUploader; //七牛上传控件对象
var uptokenData; //当前token
var uploadImageIndex; //正在上传的图片的序号

window.onload = function() {
	$.showLoading('加载中...');
	initRouter();
	getMineInfo();

	//---假数据---start---
	//	initQNUploader();
	//	show_class_circle_app = true; //是否显示班级圈app
	//	temp_data = null;
	//	initRouter();
	//	router.push({
	//		name: "home"
	//	});
	//	getHomeTrends(0, 1);
	//---假数据---end---
}

//设置路由
function initRouter() {
	//班级圈主页
	var class_circle_home = {
		template: "#router_class_circle_home",
		data: function() {
			return home_data;
		},
		methods: {
			/**
			 * 改变显示的列表
			 * @param {Object} index
			 */
			clickItem: function(index) {
				if(index == this.is_on) {
					return;
				}
				console.log("clickItem:" + index);
				//首次显示获取数据
				if(this.data[index].init_getData) {
					this.data[index].init_getData = false;
					getHomeTrends(index, 1)
				}

				this.data[this.is_on].scrollTop = $("#" + this.data[this.is_on].id).scrollTop();
				this.is_on = index;
				if(this.data[this.is_on].leave) {
					this.data[this.is_on].leave = false;
					var timeId = setInterval(function() {
						homeToBeforePosition(timeId, home_data.is_on);
					}, 100);
				}
			},
			/**
			 * 点击发布动态者的头像或者名称或者评论者(回复者)的名称
			 * @param {String} userId 用户id
			 */
			clickPerson: showPersonTrends,
			/**
			 * 显示动态的详细内容或者查看全部按钮
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 */
			clickContent: function(listIndex, valueIndex) {
				console.log("clickContent:" + listIndex + ":" + valueIndex);
				showTrendsDetails(this.data[listIndex].data[valueIndex], this.data[listIndex]);
			},
			/**
			 * 点击动态的赞，评论，删除按钮
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 * @param {Number} type 按钮序号 0,赞;1,评论;2,删除;
			 */
			clickFunction: function(listIndex, valueIndex, type) {
				console.log("clickFunction:" + listIndex + " " + valueIndex + " " + type);
				var trendsValue = this.data[listIndex].data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						showAddComments(trendsValue);
						break;
					case 2:
						this.allow_back = false;
						deleteMineTrends({
							route: this,
							userSpaceId: trendsValue.TabId,
							pageType: "home",
							listIndex: listIndex,
							valueIndex: valueIndex
						});
						break;
				}
			},
			/**
			 * 点击评论或者回复的内容
			 * @param {Number} listIndex 列表的序号
			 * @param {Number} valueIndex 数据的序号
			 * @param {Object} commentIndex 评论的序号
			 * @param {Object} replysIndex 回复的序号
			 */
			clickComment: function(listIndex, valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + listIndex + " " + valueIndex + " " + commentIndex + " " + replysIndex);
				addReplys(this.data[listIndex].data[valueIndex], commentIndex, replysIndex);
			},
			/**
			 * 点击发布动态
			 */
			clickAddTrends: function() {
				router.push({
					name: 'add',
					params: {
						id: 'addTrend',
					}
				});
			},
			/**
			 * 点击与我相关内容
			 * @param {Object} SpaceId
			 */
			clickRelateContent: function(spaceId) {
				getTrendsDetails(spaceId);
			},
			/**
			 * 点击与我相关的回复或者回复的内容
			 * @param {Object} valueIndex 与我相关列表序号
			 * @param {Object} spaceId 动态id
			 * @param {Object} tabId 主评论id
			 * @param {Object} replyUserId 回复的id
			 */
			clickRelateReply: function(valueIndex, spaceId, tabId, replyUserId) {
				console.log("clickRelateReply:" + valueIndex + " " + spaceId + " " + replyUserId);
				if(mineUserInfo.userid == replyUserId) {
					//评论者是自己
					console.log("评论者是自己");
					return false;
				}
				if(departUserInfo.value[replyUserId] == undefined) {
					//评论者没有对应资料
					console.log("无此人资料");
					return false;
				}
				router.push({
					name: 'add',
					params: {
						id: 'addRelateReply',
						valueIndex: valueIndex, //与我相关列表序号
						spaceId: spaceId, //动态id
						tabId: tabId, //主评论id
						replyUserId: replyUserId, //回复的id
					}
				});
			}
		},
		/**
		 * 组件显示之前
		 */
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-班级圈主页-显示之前:from:" + from.path + " to:" + to.path);
			if(show_class_circle_app) {
				next(function() {
					//初始化滚动
					initHomePullToRefresh();
					//回滚到之前的位置
					for(var i = 0; i < home_data.data.length; i++) {
						$("#" + home_data.data[i].id).scrollTop(home_data.data[i].scrollTop);
					}
					home_data.data[home_data.is_on].leave = false;
				});
			} else {
				next(false);
			}
		},
		/**
		 * 组件离开之前
		 */
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-班级圈主页-离开之前:from:" + from.path + " to:" + to.path);
			if("/" == to.path) { //离开班级圈APP
				next();
				router.back();
			} else {
				this.data[this.is_on].scrollTop = $("#" + this.data[this.is_on].id).scrollTop();
				this.data[0].leave = true;
				this.data[1].leave = true;
				this.data[2].leave = true;
				next();
			}
		}
	};

	//发布动态或者进行评论
	var trends_add = {
		template: "#router_add_trends",
		data: function() {
			console.log("trends_add:data:")
			return {
				allow_back: false, //允许返回
				content: "", //文字，
				showMedia: false, //是否显示添加图片，视频功能
				images: [], //图片，限制9张
				showImage: false,
				showImagePath: "",
				maxlength: 200, //动态限制6000字，评论回复限制200
				placeholder: "不能为空" //输入框提示语
			};
		},
		methods: {
			/**
			 * 点击添加多媒体
			 * @param {Object} type 0,图库;1,相机
			 */
			addMedia: function(type) {
				console.log("trends_add-addMedia:" + type);
			},
			/**
			 * 点击提交按钮
			 */
			submitData: function() {
				console.log("trends_add-submitData:");
				var submitDataContent = $.trim(this.content);
				console.log("submitDataContent:" + submitDataContent);
				if(submitDataContent === "") {
					$.toast("请输入内容", "forbidden");
					return false;
				} else {
					$.showLoading('加载中...');
					this.allow_back = false;
					switch(this.$route.params.id) {
						case "addTrend":
							//发布动态
							var submitData = {
								userId: mineUserInfo.userid, //用户ID
								msgTitle: "", //记事标题
								msgContent: submitDataContent, //记事内容
								encType: 3, //附件类型;1图片;2视频;3仅文字;4音频;5图文混排
								encLen: 0, //音视频时长
								encAddr: "", //附件地址
								encImg: "", //附件缩略图地址
								encIntro: "", //附件简介
								noteType: 2, //信息类型
								userIds: [], //推送用户ID
								pubScopes: [1], //发布范围
								pubArea: "" //发布区域
							}
							if(this.images.length == 0) {
								//没有图片
								addTrend(this, submitData);
							} else {
								router_add_trends = this;
								for(var i = 0; i < router_add_trends.images.length; i++) {
									if(router_add_trends.images[i].state == 2) {
										//上传失败的图片
										router_add_trends.images[i].uploaded = false;
									}
								};
								upLoadImages();
							}
							break;
						case "addComment":
							//发布评论
							addComment(this, submitDataContent, this.$route.params.trendsValue);
							break;
						case "addReply":
							//发布回复
							addReply(this, submitDataContent, this.$route.params.trendsValue, this.$route.params.replyUserId, this.$route.params.commentIndex, this.$route.params.replysIndex)
							break;
						case "addRelateReply":
							addRelateReply(this, submitDataContent, this.$route.params.valueIndex, this.$route.params.spaceId, this.$route.params.tabId, this.$route.params.replyUserId);
							break;
					}
				}
			},
			/**
			 * 组件内的content变化的监控
			 * @param {Object} val
			 */
			contentChange: function(val) {
				this.content = val; //组件内外content双向绑定
			},
			/**
			 * 点击列表中的图片
			 * @param {Object} imageIndex
			 */
			clickImage: function(imageIndex) {
				console.log("clickImage:" + imageIndex);
				this.allow_back = false;
				this.showImageIndex = imageIndex;
				this.showImage = true;
			},
			/**
			 * 点击显示的图片
			 */
			clickShowImage: function() {
				this.allow_back = true;
				this.showImage = false;
			},
			/**
			 * 删除显示的图片
			 */
			clickDelImage: function() {
				this.allow_back = true;
				this.showImage = false;
				var temp_array = [];
				if(this.images[this.showImageIndex].url != undefined) {
					temp_array.push(this.images[this.showImageIndex].url);
				}
				if(this.images[this.showImageIndex].cropUrl != undefined) {
					temp_array.push(this.images[this.showImageIndex].cropUrl);
				}
				if(temp_array.length != 0) {
					cloudutil.delCloudFiles({
						appId: storageutil.QNQYWXKID,
						urls: temp_array
					}, function(data) {
						console.log("delCloudFiles:", data);
					});
				}

				this.images.splice(this.showImageIndex, 1);
			},
			/**
			 * 添加新的图片
			 */
			inputChange: function(value, files) {
				console.log("inputChange:value:", value);
				console.log("inputChange:files:", files);
				//initFileUpload(files[0]);
				var types = files[0].type.toLowerCase().split("/");
				var self = this;
				console.log("types:" + types);
				if(types[1] == "png" || types[1] == "jpg" || types[1] == "jpeg") {
					//显示文件
					var reader = new FileReader();
					reader.onload = function() {
						var newImage = {
							filePath: this.result, //文件路径
							uploading: false, //是否正在上传
							process: "", //进度
							state: null, //状态
							file: files[0], //文件对象
							uploaded: false //是否上传过
						}
						self.images.push(newImage);
					}
					reader.readAsDataURL(files[0]);
				} else {
					$.alert("请选择png,jpg,jpeg类型的图片", "选择失败");
				}
			}
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-发布动态或评论-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path || to.params.id == undefined) {
				showClassCircleApp(next);
			} else {
				next(function(vm) {
					console.log("trends_add:id:" + vm.$route.params.id);
					console.log("trends_add:params:", vm.$route.params);
					vm.allow_back = true;
					vm.images = []; //图片
					vm.$refs.add.cleanContent(); //清理内容
					if(vm.$route.params.id == "addTrend" || vm.$route.params.id == undefined) {
						//发布动态
						vm.showMedia = true;
						vm.maxlength = 6000;
						vm.placeholder = "动态:不能为空,最多6000字!";
					} else if(vm.$route.params.id == "addComment") {
						//发布评论
						vm.showMedia = false;
						vm.maxlength = 200;
						vm.placeholder = "评论:不能为空,最多200字!";
					} else if(vm.$route.params.id == "addReply" || vm.$route.params.id == "addRelateReply") {
						vm.showMedia = false;
						vm.maxlength = 200;
						vm.placeholder = "回复" + departUserInfo.value[vm.$route.params.replyUserId].name + ":不能为空,最多200字!";
					}
				});
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-发布动态或评论-离开之前:from:" + from.path + " to:" + to.path);
			if(this.allow_back) {
				if(this.images.length != 0) {
					var temp_array = [];
					for(var i = 0; i < this.images.length; i++) {
						if(this.images[i].url != undefined) {
							temp_array.push(this.images[i].url);
						}
						if(this.images[i].cropUrl != undefined) {
							temp_array.push(this.images[i].cropUrl);
						}
					}
					if(temp_array.length != 0) {
						cloudutil.delCloudFiles({
							appId: storageutil.QNQYWXKID,
							urls: temp_array
						}, function(data) {
							console.log("delCloudFiles:", data);
						});
					}
				}
				next();
			} else {
				next(this.allow_back);
			}

		}
	};

	//动态详情
	var trends_details = {
		template: "#router_trends_details",
		data: function() {
			return {
				allow_back: false,
				data: []
			}
		},
		methods: {
			clickPerson: showPersonTrends,
			clickFunction: function(valueIndex, type) {
				console.log("clickFunction:" + valueIndex + " " + type);
				var trendsValue = this.data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						showAddComments(trendsValue);
						break;
					case 2:
						this.allow_back = false;
						deleteMineTrends({
							route: this,
							userSpaceId: trendsValue.TabId,
							pageType: "details",
							valueIndex: valueIndex,
							list: this.$route.params.list
						});
						break;
				}

			},
			clickComment: function(valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + valueIndex + " " + commentIndex + ' ' + replysIndex);
				addReplys(this.data[valueIndex], commentIndex, replysIndex);
			}
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-动态详情-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path) {
				showClassCircleApp(next);
			} else {
				next(function(vm) {
					vm.allow_back = true;
					console.log("vm.$route.params:", vm.$route.params)
					if(vm.$route.params.data != undefined) {
						vm.data = [vm.$route.params.data]
					}
				});
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-动态详情-离开之前:from:" + from.path + " to:" + to.path);
			next(this.allow_back);
		}
	}

	/**
	 * 用户个人空间
	 */
	var user_space = {
		template: "#router_user_space",
		methods: {
			/**
			 * 头像加载成功
			 * @param {Object} e
			 */
			headLoad: function(e) {
				var img = e.target;
				var imgWidth = img.width;
				var imgHeight = img.height;
				if(imgWidth > imgHeight) {
					img.style.height = "80px";
					img.style.width = 'initial';
				}
			},
			/**
			 * 头像加载失败
			 * @param {Object} e
			 */
			headError: function(e, level) {
				e.target.src = utils.updateHeadImage("", level);
			},
			/**
			 * 点击发布动态者的头像或者名称或者评论者(回复者)的名称
			 * @param {String} userId 用户id
			 */
			clickPerson: function(userId) {
				console.log();
				if(userId == this.userId) {
					return false;
				}
				showPersonTrends(userId);
			},
			/**
			 * 显示动态的详细内容或者查看全部按钮
			 * @param {Number} valueIndex 数据的序号
			 */
			clickContent: function(valueIndex) {
				console.log("showTrendsDetails:" + valueIndex);
				showTrendsDetails(space_data[this.$route.params.id].data[valueIndex], space_data[this.$route.params.id]);
			},
			/**
			 * 点击动态的赞，评论，删除按钮
			 * @param {Number} valueIndex 数据的序号
			 * @param {Number} type 按钮序号 0,赞;1,评论;2,删除;
			 */
			clickFunction: function(valueIndex, type) {
				console.log("clickFunction:" + valueIndex + " " + type);
				var trendsValue = space_data[this.$route.params.id].data[valueIndex];
				switch(type) {
					case 0:
						changePraise(trendsValue);
						break;
					case 1:
						showAddComments(trendsValue);
						break;
					case 2:
						this.allow_back = false;
						deleteMineTrends({
							route: this,
							userSpaceId: trendsValue.TabId,
							pageType: "space",
							valueIndex: valueIndex,
						});
						break;
				}
			},
			/**
			 * 点击评论或者回复的内容
			 * @param {Number} valueIndex 数据的序号
			 * @param {Object} commentIndex 评论的序号
			 * @param {Object} replysIndex 回复的序号
			 */
			clickComment: function(valueIndex, commentIndex, replysIndex) {
				console.log("clickComment:" + valueIndex + " " + commentIndex + " " + replysIndex);
				addReplys(space_data[this.$route.params.id].data[valueIndex], commentIndex, replysIndex);
			},
			/**
			 * 初始化数据
			 * @param {Object} id 个人空间数据的id
			 */
			initData: function(id, leave) {
				console.log("initData:id:", id);
				console.log("initData:space_data:", space_data);
				router_user_space = this;
				var temp_scrollTop = 0;
				if(space_data[id] != undefined) {
					temp_scrollTop = space_data[id].scrollTop;
					temp_leave = space_data[id].leave;
					this.userId = space_data[id].userId;
					this.allow_loaddata = space_data[id].allow_loaddata;
					this.show_loadmore = space_data[id].show_loadmore;
					this.show_loadmore_loading = space_data[id].show_loadmore_loading;
					this.show_loadmore_content = space_data[id].show_loadmore_content;
					this.show_error = space_data[id].show_error;
					this.show_no_more = space_data[id].show_no_more;
					initSpacePullToRefresh(id);
					if(space_data[id].getData) {
						space_data[id].getData = false;
						//未获取数据则获取空间数据
						getUserSpace(space_data[id].userId, 1, id);
					}
					this.data = space_data[id].data;
				}
				if(space_data[id].leave) {
					//复用并且返回上一个页面
					space_data[id].leave = false;
					var timeId = setInterval(function() {
						userSpaceToBeforePosition(timeId, id, temp_scrollTop);
					}, 100);
				} else {
					$(".class-circle-user-space .weui-tab__bd-item").scrollTop(0);
				}
			}
		},
		data: function() {
			return {
				userId: "", //用户id
				allow_back: true, //允许返回
				allow_loaddata: false, //允许下刷新或者加载中
				allow_loadmore: false, //是否允许加载更多
				show_loadmore: true, //是否显示加载中
				show_loadmore_loading: true, //是否显示加载中的转圈图标
				show_loadmore_content: "加载中", //加载中元素的文字
				show_error: false, //是否显示异常
				show_no_more: false, //是否显示没有更多
				data: [] //数据
			};
		},
		beforeRouteUpdate: function(to, from, next) {
			console.log("路由-用户空间-复用:from.path:" + from.path);
			console.log("路由-用户空间-复用:to.path:" + to.path);
			if(from.params.id > to.params.id && !this.allow_back) {
				//返回上一个空间
				return false
			}
			//记录原页面的滚动距离
			var from_data = space_data[from.params.id];
			if(from_data != undefined) {
				from_data.scrollTop = $(".class-circle-user-space .weui-tab__bd-item").scrollTop();
				from_data.leave = true;
			}
			this.initData(to.params.id);
			next();
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-用户空间-显示之前:from:" + from.path + " to:" + to.path);
			if("/" == from.path) {
				showClassCircleApp(next);
			} else {
				next(function(vm) {
					vm.initData(to.params.id);
				});
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-用户空间-离开之前:from:" + from.path + " to:" + to.path);
			if(this.allow_back) {
				if("/home" == to.path) {
					//回到主页清空空间数据
					space_data = null;
					space_data = {};
					this.userId = ""; //用户id
					this.allow_back = true; //允许返回
					this.allow_loaddata = false; //允许下刷新或者加载中
					this.allow_loadmore = false; //是否初始化加载更多
					this.show_loadmore = true; //是否显示加载中
					this.show_loadmore_loading = true; //是否显示加载中的转圈图标
					this.show_loadmore_content = "加载中"; //加载中元素的文字
					this.show_error = false; //是否显示异常
					this.show_no_more = false; //是否显示没有更多
					this.data = []; //数据
				}
				next();
			} else {
				next(this.allow_back);
			}
		}
	}

	//获取我的信息，部门成员信息失败
	var error_page = {
		template: "#router_error",
		data: function() {
			return {}
		},
		methods: {
			clickRefresh: function() {
				console.log("clickRefresh");
				window.location.reload();
			}
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("路由-异常页面-显示之前:from:" + from.path + " to:" + to.path);
			console.log("id:" + to.params.id);
			if(to.params.id == undefined) {
				next(false);
			} else {
				next();
			}
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("路由-异常页面-离开之前:from:" + from.path + " to:" + to.path);
			if("/" == to.path) { //离开班级圈APP
				window.close();
			} else {
				next();
			}
		}
	}

	//配置路由
	router = new VueRouter({
		routes: [{
			path: '/home',
			name: 'home',
			component: class_circle_home,
		}, {
			path: '/trends_add',
			name: 'add',
			component: trends_add,
		}, {
			path: '/trends_details/:id',
			name: 'details',
			component: trends_details,
		}, {
			path: '/user_space/:id',
			name: 'space',
			component: user_space,
		}, {
			path: '/error_page',
			name: 'error',
			component: error_page,
		}]
	});

	var class_circle_app = new Vue({
		router: router
	}).$mount('#router_class_circle_app');
}

/**
 * 初始化主页下拉刷新
 */
function initHomePullToRefresh() {
	//初始化下拉刷新
	$("#class_circle_home .weui-tab__bd-item").pullToRefresh();
	$("#class_circle_home .weui-tab__bd-item").on("pull-to-refresh", function() {
		var listIds = this.id.split("_");
		var listId = listIds[listIds.length - 1] * 1;
		if(!home_data.data[listId].allow_loaddata) {
			//禁止下拉刷新和上拉加载中
			$(this).pullToRefreshDone();
			return false;
		}
		console.log("主页下拉刷新:" + listId);
		home_data.data[listId].allow_loaddata = false;
		initHomeLoadmore(this.id);
		getHomeTrends(listId, 1, this);
	});

	for(var i = 0; i < home_data.data.length; i++) {
		initHomeLoadmore(home_data.data[i].id);
	}
}

/**
 * 初始化列表加载更多
 */
function initHomeLoadmore(id) {
	$("#" + id + ".weui-tab__bd-item").infinite();
	$("#" + id + ".weui-tab__bd-item").infinite().on("infinite", function() {
		var listIds = this.id.split("_");
		var listId = listIds[listIds.length - 1] * 1;
		if(!home_data.data[listId].allow_loaddata || !home_data.data[listId].allow_loadmore) {
			return false;
		}
		console.log("上拉加载更多:" + listId);
		//禁止下拉刷新和上拉加载中
		home_data.data[listId].allow_loaddata = false;
		getHomeTrends(listId, home_data.data[listId].pageIndex + 1);
	});
}

/**
 * 初始化空间下拉刷新
 */
function initSpacePullToRefresh(spaceId) {
	console.log("initSpacePullToRefresh:" + spaceId);
	//初始化下拉刷新
	$(".class-circle-user-space .weui-tab__bd-item").pullToRefresh();
	$(".class-circle-user-space .weui-tab__bd-item").on("pull-to-refresh", function() {
		var id = router_user_space.$route.params.id;
		if(!space_data[id].allow_loaddata) {
			return false;
		}
		console.log("个人空间下拉刷新:" + id);
		space_data[id].allow_loaddata = false;
		getUserSpace(space_data[id].userId, 1, id, this);
	});

	$(".class-circle-user-space .weui-tab__bd-item").infinite(100);
	$(".class-circle-user-space .weui-tab__bd-item").infinite().on("infinite", function() {
		var id = router_user_space.$route.params.id;
		console.log("allow_loaddata:" + space_data[id].allow_loaddata);
		console.log("allow_loadmore:" + space_data[id].allow_loadmore);
		if(!space_data[id].allow_loaddata || !space_data[id].allow_loadmore) {
			return false;
		}
		console.log("个人空间加载更多:" + id);
		space_data[id].allow_loaddata = false;
		getUserSpace(space_data[id].userId, space_data[id].pageIndex + 1, id);
	});

}

/**
 * 主页到原来的位置
 * @param {Object} timeId
 * @param {Object} index
 */
function homeToBeforePosition(timeId, index) {
	console.log("homeToBeforePosition:" + index);
	var scrollTop_0 = $("#" + home_data.data[index].id).scrollTop();
	var scrollTop_1 = home_data.data[index].scrollTop;
	if(scrollTop_0 == 0 && scrollTop_0 != scrollTop_1) {
		//之前设置回滚到初始位置无效
		$("#" + home_data.data[index].id).scrollTop(home_data.data[index].scrollTop);
	} else {
		clearInterval(timeId);
	}
}

/**
 * 个人空间到原来的位置
 * @param {Object} timeId
 * @param {Object} index
 */
function userSpaceToBeforePosition(timeId, id, scrollTop) {
	console.log("userSpaceToBeforePosition:" + id);
	var ele = $(".class-circle-user-space .weui-tab__bd-item");
	if(ele.length != 0) {
		ele.scrollTop(scrollTop);
		clearInterval(timeId);
	}
}

/**
 * 获取我的信息
 */
function getMineInfo() {
	var tempData = {
		cmd: 'userinfo',
		type: 'findpage',
		colv: ""
	}
	unitWebsitePro(tempData, function(data) {
		console.log('getMineInfo:', data);
		if(data.RspCode == 0) {
			mineUserInfo = JSON.parse(data.RspData);
			//获取我所属的部门的所有成员
			temp_data = 0;
			getDepartmentMember(mineUserInfo.department[temp_data]);
		} else {
			console.log("getMineInfo:error:")
			$.hideLoading();
			$.alert(data.RspTxt, "加载失败");
			router.push({
				name: "error",
				params: {
					id: 0
				}
			});
		}
	});
}

/**
 * 处理获取的成员信息
 * @param {Object} data
 */
function disposeMemberData(data) {
	console.log("处理获取的成员信息:", data);
	if(data.RspCode == 0) {
		for(var i = 0; i < data.RspData.length; i++) {
			if(departUserInfo.value[data.RspData[i].userid] === undefined) {
				var userId = data.RspData[i].userid.toString();
				departUserInfo.key.push(userId);
				var avatar = data.RspData[i].avatar;
				if(avatar != "" && "/" != avatar[avatar.length - 1]) {
					var k = avatar.split("").reverse().join("").indexOf("/");
					if(k != 0) {
						avatar = avatar.substring(0, avatar.length - k);
						data.RspData[i].avatar = avatar;
					}
				}
				departUserInfo.value[userId] = $.extend({}, data.RspData[i]);
			}
		}
	}
	if(temp_data == mineUserInfo.department.length - 1) {
		//处理完我所处部门的所有成员
		console.log("处理完我所处部门的所有成员:", departUserInfo);
		$.hideLoading();
		if(departUserInfo.key.length != 0) {
			temp_data = null;
			show_class_circle_app = true;
			//显示班级圈主页
			router.push({
				name: "home"
			});
			//禁止全部动态列表进行下拉刷新和上拉加载中
			home_data.data[0].allow_loaddata = false;
			//获取全部动态
			getHomeTrends(0, 1);
		} else {
			$.alert(data.RspTxt, "加载失败");
			router.push({
				name: "error",
				params: {
					id: 1
				}
			});
		}
	} else {
		temp_data++;
		getDepartmentMember(mineUserInfo.department[temp_data]);
	}
}

/**
 * 发送请求获取部门的所有的成员
 * @param {Object} 部门id
 */
function getDepartmentMember(id) {
	var tempData = {
		cmd: 'departpersons',
		type: 'findpage',
		colid: id,
		colv: 0,
		callcol: "info"
	}
	unitWebsitePro(tempData, disposeMemberData);
}

/**
 * 进入动态的详情
 * @param {Object} trendsValue 动态详情的数据
 */
function showTrendsDetails(trendsValue, list) {
	console.log("showTrendsDetails:", trendsValue);
	router.push({
		name: 'details',
		params: {
			id: new Date().getTime().toString(),
			data: trendsValue,
			list: list
		}
	});
}

/**
 * 进入用户的空间
 * @param {Object} userId 用户id
 */
function showPersonTrends(userId) {
	console.log("showPersonTrends:" + userId);
	var userInfo = departUserInfo.value[userId];
	if(userInfo !== undefined) {
		console.log("userInfo:" + JSON.stringify(userInfo));
		var model = {
			id: new Date().getTime().toString(),
			userId: userId, //用户id
			scrollTop: 0, //滚动距离
			allow_loaddata: false, //允许下刷新或者加载中
			allow_loadmore: false, //是否初始化加载更多
			show_loadmore: true, //是否显示加载中
			show_loadmore_loading: true, //是否显示加载中的转圈图标
			show_loadmore_content: "加载中", //加载中元素的文字
			leave: false, //是否
			getData: true, //是否发送获取数据的请求
			show_error: false,
			show_no_more: false,
			data: []
		}
		space_data[model.id] = model;
		router.push({
			name: 'space',
			params: model
		});
		//跳转到这个用户的个人空间
	} else {
		console.log("无此人资料");
		//不做任何处理
	}
}

/**
 * 修改动态的赞
 * @param {Object} trendsValue
 */
function changePraise(trendsValue) {
	console.log("changePraise:", trendsValue);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		userSpaceId: trendsValue.TabId
	}
	if(trendsValue.IsLike == 0) {
		//设置为点赞
		classCircleProtocol.setUserSpaceLikeByUser(submitData, function(data) {
			if(data.RspCode == 0 && data.RspData.Result == 1) {
				trendsValue.IsLike = 1;
				trendsValue.LikeUsers.push({
					operDate: utils.getCurentTime(),
					userId: mineUserInfo.userid
				})
			} else {
				$.alert(data.RspTxt, "操作失败");
			}
		});
	} else {
		//取消点赞
		classCircleProtocol.delUserSpaceLikeByUser(submitData, function(data) {
			if(data.RspCode == 0 && data.RspData.Result == 1) {
				trendsValue.IsLike = 0;
				for(var i = 0; i < trendsValue.LikeUsers.length; i++) {
					if(trendsValue.LikeUsers[i].userId == mineUserInfo.userid) {
						trendsValue.LikeUsers.splice(i, 1);
						break;
					}
				}
			} else {
				$.alert(data.RspTxt, "操作失败");
			}
		});
	}
}

/**
 * 显示班级圈主页
 * @param {Object} next
 */
function showClassCircleApp(next) {
	if(show_class_circle_app) {
		next({
			path: '/home'
		});
	} else {
		next(false);
	}
}

/**
 * 主页获取动态
 * @param {Number} type 主页列表序号
 * @param {Number} pageIndex 页码
 * @param {Object} element
 */
function getHomeTrends(type, pageIndex, element) {
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		pageIndex: pageIndex, //当前页数
		pageSize: 10 //每页记录数
	}
	if(type == 0) {
		submitData.publisherIds = departUserInfo.key; //发布者ID
		classCircleProtocol.getAllUserSpacesByUser(submitData, function(data) {
			disposeHomeData(type, submitData, element, data);
		});
	} else if(type == 1) {
		submitData.publisherIds = [mineUserInfo.userid]; //发布者ID
		classCircleProtocol.getAllUserSpacesByUser(submitData, function(data) {
			disposeHomeData(type, submitData, element, data);
		});
	} else {
		classCircleProtocol.getAboutMe(submitData, function(data) {
			disposeHomeData(type, submitData, element, data);
		});
	}
}

/**
 * 处理主页获取的数据
 * @param {Object} type
 * @param {Object} submitData
 * @param {Object} data
 */
function disposeHomeData(type, submitData, element, data) {
	console.log("disposeHomeData:type:", type);
	console.log("disposeHomeData:submitData:", submitData);
	console.log("disposeHomeData:data:", data);
	//允许下拉刷新或者上拉加载更多
	home_data.data[type].allow_loaddata = true;
	//收起下拉刷新
	if(element != undefined) {
		$(element).pullToRefreshDone();
	}

	if(data.RspCode == 0) {
		if(submitData.pageIndex == 1) {
			//下拉刷新或者获取第一页的内容
			home_data.data[type].data = data.RspData.Data;
		} else {
			Array.prototype.push.apply(home_data.data[type].data, data.RspData.Data);
		}
		if(submitData.pageIndex == 1 && home_data.data[type].data.length == 0) {
			//内容为空
			home_data.data[type].show_no_more = true;
			home_data.data[type].show_error = false;
			home_data.data[type].show_loadmore = false;
		} else {
			home_data.data[type].show_no_more = false;
			home_data.data[type].show_loadmore = true;
		}

		home_data.data[type].pageIndex = submitData.pageIndex; //当前页数
		home_data.data[type].TotalPage = data.RspData.TotalPage; //总页数
		if(home_data.data[type].pageIndex >= home_data.data[type].TotalPage) {
			console.log("没有下一页")
			//没有下一页
			//调整插件信息
			home_data.data[type].show_loadmore_loading = false;
			home_data.data[type].show_loadmore_content = "没有更多了";
			home_data.data[type].allow_loadmore = false;
		} else {
			home_data.data[type].allow_loadmore = true;
			home_data.data[type].show_loadmore_loading = true;
			home_data.data[type].show_loadmore_content = "加载中";
		}
	} else {
		$.alert(data.RspTxt, "加载失败");
		if(submitData.pageIndex == 1 && home_data.data[type].show_no_more == false && home_data.data[type].data.length == 0) {
			home_data.data[type].show_error = true;
			home_data.data[type].show_loadmore = false;
		}
	}
	console.log("home_data", home_data);
}

/**
 * 获取用户空间的动态
 * @param {String} publisherIds 发布者ID
 * @param {Number} pageIndex 页码
 * @param {Object} id 路由对象的id
 * @param {Object} element
 */
function getUserSpace(publisherIds, pageIndex, id, element) {
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		publisherIds: [publisherIds], //发布者ID
		pageIndex: pageIndex, //当前页数
		pageSize: 10 //每页记录数
	}
	classCircleProtocol.getAllUserSpacesByUser(submitData, function(data) {
		console.log("getUserSpace:", data);
		//允许下拉刷新或者上拉加载更多
		space_data[id].allow_loaddata = true;
		//收起下拉刷新
		if(element != undefined) {
			$(element).pullToRefreshDone();
		}
		if(data.RspCode == 0) {
			if(pageIndex == 1 && data.RspData.Data.length == 0) {
				//内容为空
				space_data[id].show_no_more = true;
				space_data[id].show_loadmore = false;
				space_data[id].show_error = false;
			} else {
				space_data[id].show_loadmore = true;
				space_data[id].show_no_more = false;
			}
			if(pageIndex == 1) {
				//下拉刷新或者获取第一页的内容
				space_data[id].data = data.RspData.Data;
			} else {
				Array.prototype.push.apply(space_data[id].data, data.RspData.Data);
			}
			space_data[id].pageIndex = pageIndex; //当前页数
			space_data[id].TotalPage = data.RspData.TotalPage; //总页数
			if(space_data[id].pageIndex >= space_data[id].TotalPage) {
				console.log("没有下一页")
				//没有下一页
				space_data[id].allow_loadmore = false;
				space_data[id].show_loadmore_loading = false;
				space_data[id].show_loadmore_content = "没有更多了";
			} else {
				space_data[id].allow_loadmore = true;
				space_data[id].show_loadmore_loading = true;
				space_data[id].show_loadmore_content = "加载中";
			}
		} else {
			$.alert(data.RspTxt, "加载失败");
			if(pageIndex == 1 && space_data[id].show_no_more == false && space_data[id].data.length == 0) {
				//第一页加载失败
				space_data[id].show_error = true;
				space_data[id].show_loadmore = false;
			}
		}
		try {
			if(id == router_user_space.$route.params.id) {
				router_user_space.allow_loaddata = space_data[id].allow_loaddata;
				router_user_space.allow_loadmore = space_data[id].allow_loadmore;
				router_user_space.show_loadmore = space_data[id].show_loadmore;
				router_user_space.show_no_more = space_data[id].show_no_more;
				router_user_space.show_error = space_data[id].show_error;
				router_user_space.show_loadmore_loading = space_data[id].show_loadmore_loading;
				router_user_space.show_loadmore_content = space_data[id].show_loadmore_content;
				router_user_space.data = space_data[id].data;
			}
		} catch(e) {
			console.log("error:" + e.message);
		}
	});
}

/**
 * 进入评论页面
 * @param {Number} trendsValue 动态
 */
function showAddComments(trendsValue) {
	console.log("showAddComments:", trendsValue);
	router.push({
		name: 'add',
		params: {
			id: 'addComment',
			trendsValue: trendsValue,
		}
	});
}

/**
 * 进入回复页面
 * @param {Number} trendsValue 动态
 * @param {Object} commentIndex 评论的序号
 * @param {Object} replysIndex 回复的序号
 */
function addReplys(trendsValue, commentIndex, replysIndex) {
	console.log("addReplys:", trendsValue);
	var Comment;
	if(replysIndex == undefined) {
		//点击评论
		Comment = trendsValue.Comments[commentIndex];
	} else {
		//点击回复
		Comment = trendsValue.Comments[commentIndex].Replys[replysIndex];
	}
	console.log("Comment:", Comment);
	if(Comment.UserId == mineUserInfo.userid) {
		//评论者是自己
		console.log("评论者是自己");
		return false;
	}
	if(departUserInfo.value[Comment.UserId] == undefined) {
		//评论者没有对应资料
		console.log("无此人资料");
		return false;
	}
	router.push({
		name: 'add',
		params: {
			id: 'addReply',
			trendsValue: trendsValue, //动态
			replyUserId: Comment.UserId, //回复人id
			commentIndex: commentIndex, //评论的序号
			replysIndex: replysIndex, //回复的序号
		}
	});
}

/**
 * 发布动态
 * @param {Object} routeAdd 路由对象
 * @param {Object} submitData 提交的数据
 */
function addTrend(routeAdd, submitData) {
	console.log("addTrend:submitData:", submitData);
	classCircleProtocol.addUserSpace(submitData, function(data) {
		console.log("新增动态:", data);
		$.hideLoading();
		routeAdd.allow_back = true;
		if(data.RspCode == 0 && data.RspData.Result != 0) {
			$.toast("发布成功");
			var newTrends = {
				"LikeUsers": [],
				"TabId": data.RspData.Result,
				"Comments": [],
				"MsgContent": submitData.msgContent,
				"EncTypeStr": "",
				"EncType": submitData.encType,
				"EncAddr": submitData.encAddr,
				"NoteType": 2,
				"MsgContentTxt": submitData.msgContent,
				"PublisherId": submitData.userId,
				"EncImgAddr": submitData.encImg,
				"InShow": 0,
				"NoteTypeStr": "",
				"EncIntro": "",
				"ReadCnt": 0,
				"EncLen": 0,
				"IsLike": 0,
				"PublishDate": utils.getCurentTime()
			}
			home_data.data[0].data.unshift($.extend({}, newTrends));
			home_data.data[1].data.unshift($.extend({}, newTrends));
			routeAdd.images = [];
			routeAdd.$refs.add.cleanContent(); //清理内容
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
}

/**
 * 添加评论
 * @param {Object} routeAdd 路由对象
 * @param {Object} commentContent 评论内容
 * @param {Object} trendsValue 动态数据
 */
function addComment(routeAdd, commentContent, trendsValue) {
	console.log("addComment:", commentContent, trendsValue);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		userSpaceId: trendsValue.TabId, //用户空间ID
		commentContent: commentContent //评论内容
	}
	classCircleProtocol.addUserSpaceComment(submitData, function(data) {
		console.log("新增评论:", data);
		$.hideLoading();
		routeAdd.allow_back = true;
		if(data.RspCode == 0) {
			$.toast("发布成功");
			var newComment = {
				"CommentDate": utils.getCurentTime(),
				"TabId": data.RspData.Result,
				"Replys": [],
				"ReplyId": "0",
				"CommentContent": commentContent,
				"UserId": mineUserInfo.userid,
				"UpperId": 0
			}
			trendsValue.Comments.unshift(newComment);
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
}

/**
 * 添加回复
 * @param {Object} routeAdd 路由对象
 * @param {Object} commentContent 回复内容
 * @param {Object} trendsValue 动态数据
 * @param {Object} replyUserId 回复ID
 * @param {Object} commentIndex 评论的序号
 * @param {Object} replysIndex 回复的序号
 */
function addReply(routeAdd, commentContent, trendsValue, replyUserId, commentIndex, replysIndex) {
	console.log("addReply:", commentContent, trendsValue, replyUserId, commentIndex, replysIndex);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		upperId: trendsValue.Comments[commentIndex].TabId, //主评论ID
		replyUserId: replyUserId, //回复ID
		userSpaceId: trendsValue.TabId, //用户空间ID
		commentContent: commentContent //回复内容
	}
	classCircleProtocol.addUserSpaceCommentReply(submitData, function(data) {
		console.log("新增回复:", data);
		$.hideLoading();
		routeAdd.allow_back = true;
		if(data.RspCode == 0) {
			$.toast("发布成功");
			var newReply = {
				"CommentDate": utils.getCurentTime(),
				"TabId": data.RspData.Result,
				"ReplyId": replyUserId,
				"CommentContent": commentContent,
				"UserId": mineUserInfo.userid,
				"UpperId": trendsValue.Comments[commentIndex].TabId
			}
			trendsValue.Comments[commentIndex].Replys.push(newReply);
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
};

/**
 * 获取动态的详情
 * @param {Object} spaceId
 */
function getTrendsDetails(spaceId) {
	$.showLoading('加载中...');
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		userSpaceId: spaceId, //用户动态ID
		pageIndex: 1, //评论当前页数
		pageSize: 999 //评论每页记录数
	}
	classCircleProtocol.getUserSpaceByUser(submitData, function(data) {
		console.log("getTrendsDetails", data);
		$.hideLoading();
		if(data.RspCode == 0) {
			showTrendsDetails(data.RspData.Data);
		} else {
			$.alert(data.RspTxt, "加载失败");
		}
	})
}

/**
 * 回复与我相关列表
 * @param {Object} routeAdd 路由对象
 * @param {Object} commentContent 回复内容
 * @param {Object} valueIndex 与我相关列表内容的序号
 * @param {Object} spaceId 动态id
 * @param {Object} tabId 主评论id
 * @param {Object} replyUserId 回复的id
 */
function addRelateReply(routeAdd, commentContent, valueIndex, spaceId, tabId, replyUserId) {
	console.log("addRelateReply:", commentContent, valueIndex, spaceId, replyUserId);
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		upperId: tabId, //主评论ID
		replyUserId: replyUserId, //回复ID
		userSpaceId: spaceId, //用户空间ID
		commentContent: commentContent //回复内容
	}
	classCircleProtocol.addUserSpaceCommentReply(submitData, function(data) {
		console.log("新增回复:", data);
		$.hideLoading();
		routeAdd.allow_back = true;
		if(data.RspCode == 0) {
			$.toast("发布成功");
			var newReply = {
				"MsgContent": commentContent,
				"MsgFrom": mineUserInfo.userid,
				"MsgTo": replyUserId,
			}
			home_data.data[2].data[valueIndex].MsgArray.push(newReply);
			router.back();
		} else {
			$.alert(data.RspTxt, "发布失败");
		}
	});
}

/**
 * 删除我的动态
 * @param {Object} delData
 * @param {Object} delData.route 路由
 * @param {Number} delData.userSpaceId 用户空间ID
 * @param {String} delData.pageType 页面类型
 */
function deleteMineTrends(delData) {
	$.confirm({
		title: '提示',
		text: '确定删除？',
		onOK: function() {
			//点击确认
			console.log("onOK");
			$.showLoading('加载中...');
			var submitData = {
				userSpaceId: delData.userSpaceId
			}
			classCircleProtocol.delUserSpaceById(submitData, function(data) {
				console.log("delUserSpaceById:", data);
				delData.route.allow_back = true;
				$.hideLoading();
				if(data.RspCode == 0 && data.RspData.Result == 1) {
					$.toast("删除成功");
					if(delData.pageType == "home") {
						delData.route.data[delData.listIndex].data.splice(delData.valueIndex, 1);
					} else if(delData.pageType == "details") {
						delData.list.data.splice(delData.valueIndex, 1);
						router.back();
					} else if(delData.pageType == "space") {
						delData.route.data.splice(delData.valueIndex, 1);
					}
				} else {
					$.alert(data.RspTxt, "删除失败");
				}
			});
		},
		onCancel: function() {
			delData.route.allow_back = true;
		}
	});
}

function initQNUploader() {
	qnFileUploader = Qiniu.uploader({
		disable_statistics_report: false, // 禁止自动发送上传统计信息到七牛，默认允许发送
		runtimes: 'html5,flash,html4', // 上传模式,依次退化
		browse_button: 'qnInput', // 上传选择的点选按钮，**必需**
		uptoken_func: function(file) { // 在需要获取 uptoken 时，该方法会被调用
			uptokenData = null;
			uptokenData = getQNUpToken(file);
			console.log("uptokenData:", uptokenData);
			if(uptokenData && uptokenData.code) { //成功
				return uptokenData.data.Data[0].Token;
			} else {
				qnFileUploader.stop();
				uploadImageError(uptokenData.message);
			}
		},
		unique_names: false, // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
		save_key: false, // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
		get_new_uptoken: true, // 设置上传文件的时候是否每次都重新获取新的 uptoken
		domain: storageutil.QNPBDOMAIN, // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
		max_file_size: '100mb', // 最大文件体积限制
		flash_swf_url: '../../js/lib/plupload/Moxie.swf', //引入 flash,相对路径
		max_retries: 0, // 上传失败最大重试次数
		dragdrop: false, // 开启可拖曳上传
		chunk_size: '4mb', // 分块上传时，每块的体积
		auto_start: true, // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
		init: {
			'FilesAdded': function(up, files) {
				plupload.each(files, function(file) {
					// 文件添加进队列后,处理相关的事情
					console.log("FilesAdded:", file);
				});
			},
			'BeforeUpload': function(up, file) {
				// 每个文件上传前,处理相关的事情
				console.log("BeforeUpload:");
			},
			'UploadProgress': function(up, file) {
				// 每个文件上传时,处理相关的事情
				console.log("UploadProgress:" + file.percent);
				router_add_trends.images[uploadImageIndex].process = file.percent + "%";
			},
			'FileUploaded': function(up, file, info) {
				// 每个文件上传成功后,处理相关的事情
				console.log("FileUploaded:", info);
				if(info.status == 200) {
					console.log("uploadImageSuccess:");
					var response = JSON.parse(info["response"]);
					var imageOb = router_add_trends.images[uploadImageIndex];
					imageOb.process = "";
					imageOb.state = 1;
					imageOb.url = storageutil.QNPBDOMAIN + response.key;
					imageOb.cropUrl = uptokenData.data.Data[0].OtherKey[uptokenData.thumbKey[0]];
					console.log("images:", router_add_trends.images);
				} else {
					uploadImageError(JSON.stringify(info));
				}
			},
			'Error': function(up, err, errTip) {
				//上传出错时,处理相关的事情
				console.log("Error:", err, errTip);
				uploadImageError(errTip);
			},
			'UploadComplete': function() {
				//队列文件处理完毕后,处理相关的事情
				console.log("UploadComplete:");
				upLoadImages();
			},
			'FilesRemoved ': function() {
				//文件移出队列
				console.log("FilesRemoved:");
			},
			'Key': function(up, file) {
				// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
				// 该配置必须要在 unique_names: false , save_key: false 时才生效
				if(uptokenData && uptokenData.code) { //成功
					return uptokenData.data.Data[0].Key;
				}
			}
		}
	});
}
/**
 * 获取七牛上传token
 */
function getQNUpToken(file) {
	var myDate = new Date();
	var fileName = myDate.getTime() + "" + parseInt(Math.random() * 1000);
	var types = file.name.toLowerCase().split(".");
	fileName = fileName + "." + types[types.length - 1];
	var getTokenData = {
		appId: storageutil.QNQYWXKID,
		mainSpace: storageutil.QNPUBSPACE,
		saveSpace: storageutil.QNSSPACECLASSCIRCLE,
		fileArray: [{
			qnFileName: fileName,
			qnCmdOption: {
				type: 2
			}
		}]
	}
	var upToken;
	cloudutil.getFileUpTokens(getTokenData, function(data) {
		upToken = data;
	});
	return upToken;
}

/**
 * 压缩图片文件并传给七牛上传对象
 * @param {Object} filePath
 */
function initFileUpload(filePath, file) {
	console.log("initFileUpload:");
	var maxSize = 2 * 1024 * 1024;
	compress.getImgInfo(filePath, function(img, imgInfo) {
		console.log("获取的文件信息：" + JSON.stringify(imgInfo));
		console.log("原图尺寸：" + filePath.length);

		if(filePath.length > maxSize) {
			console.log("initFileUpload:>:");
			var newDataUrl = compress.getCanvasDataUrl(img, compress.getSuitableSize(imgInfo, Math.ceil(filePath.length / maxSize)));
			var blob = compress.base64ToBlob(newDataUrl, 'image/jpeg');
			blob.lastModifiedDate = new Date();
			var newFile = new File([blob], Date.now() + '.jpg');
			qnFileUploader.addFile(newFile, newFile.name);
			//			var formData = new FormData();
			//			formData.append('image', blob, Date.now() + '.jpeg');
			//			qnFileUploader.addFile(formData, formData.name);
		} else {
			qnFileUploader.addFile(file, file.name);
		}
	});
}

/**
 * 上传图片
 */
function upLoadImages() {
	var index = null; //选取需要上传的文件序号
	var images = router_add_trends.images;
	var hasError = false;
	var errTip = "";
	for(var i = 0; i < images.length; i++) {
		var item = images[i];
		if(!item.uploaded && index == null) { //没有上传过
			if(item.state == null || item.state == 0) {
				//未上传或者正在等待
				item.state = 0;
				index = i;
			} else if(item.state == 2) {
				//上传失败
				index = i;
			}
		}
		if(item.state == 2) {
			//有上传失败的文件
			hasError = true;
			errTip = item.errTip;
		}
		item.uploading = true;
	}
	if(index != null) {
		console.log("uploadImageIndex:" + index);
		uploadImageIndex = index;
		var imageOb = images[uploadImageIndex];
		imageOb.state = null;
		imageOb.process = "0%";
		imageOb.uploaded = true;
		initFileUpload(imageOb.filePath, imageOb.file);
	} else {
		console.log("上传完成:", images);
		if(hasError) {
			$.alert(errTip, "上传失败");
			$.hideLoading();
			router_add_trends.allow_back = true;
		} else {
			addImagesTrends();
		}
	}
}

/**
 * 上传图片失败
 */
function uploadImageError(errTip) {
	console.log("uploadImageError:");
	router_add_trends.images[uploadImageIndex].process = "";
	router_add_trends.images[uploadImageIndex].state = 2;
	router_add_trends.images[uploadImageIndex].errTip = errTip;
	qnFileUploader.splice(0, 1); //移除当前队列文件
}

/**
 * 发布带有图片的动态
 */
function addImagesTrends() {
	var submitDataContent = $.trim(router_add_trends.content);
	var encAddr = [];
	var encImg = [];
	for(var i = 0; i < router_add_trends.images.length; i++) {
		encAddr.push(router_add_trends.images[i].url);
		encImg.push(router_add_trends.images[i].cropUrl);
	};
	var submitData = {
		userId: mineUserInfo.userid, //用户ID
		msgTitle: "", //记事标题
		msgContent: submitDataContent, //记事内容
		encType: 1, //附件类型;1图片;2视频;3仅文字;4音频;5图文混排
		encLen: 0, //音视频时长
		encAddr: encAddr.join("|"), //附件地址
		encImg: encImg.join("|"), //附件缩略图地址
		encIntro: "", //附件简介
		noteType: 2, //信息类型
		userIds: [], //推送用户ID
		pubScopes: [1], //发布范围
		pubArea: "" //发布区域
	}
	addTrend(router_add_trends, submitData);
}