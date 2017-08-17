//班级圈主页tab顶部导航
Vue.component("home-navbar-item", {
	template: "#temp_trends_navbar_item",
	props: ["value", "index", "is_on"],
	computed: {
		isOnClass: function() {
			return {
				'weui-bar__item--on': this.index == this.is_on
			}
		}
	},
	methods: {
		/**
		 * 点击item
		 * @param {Object} index
		 */
		click: function(index) {
			this.$emit("click-item", index);
		}
	}
});
//班级圈主页tab列表
Vue.component("home-bd-item", {
	template: "#temp_trends_tab_bd_item",
	props: ["value", "index", "is_on"],
	computed: {
		isOnClass: function() {
			return {
				'weui-tab__bd-item--active': this.index == this.is_on
			}
		}
	}
});
//动态组件
Vue.component("trends-item", {
	template: "#template_trends",
	props: ["value"]
});
//与我相关组件
Vue.component("relate-item", {
	template: "#temp_relate_to_me",
	props: ["value"]
});
//班级圈主页数据
var home_data = {
	is_on: 0, //当前显示的列表
	home_tab: [{
		id: "all_trends", //tab列表的id
		title: "全部动态", //tab的名称
		scrollTop: 0, //tab列表的滚动距离
		leave: false, //是否离开
		data: ['1', '2'] //tab列表的数据
	}, {
		id: "mine_trends",
		title: "我的动态",
		scrollTop: 0,
		leave: false,
		data: []
	}, {
		id: "relate_to_me",
		title: "与我相关",
		scrollTop: 0,
		leave: false,
		data: ['1', '2', '3', '4', '1', '2', '3', '4']
	}]
};
//发布动态页面数据
var add_trends_data = {
	message: ""
}

window.onload = function() {
	initRouter();
}

//设置路由
function initRouter() {
	//班级圈主页
	var class_circle_home = {
		template: "#temp_class_circle_home",
		data: function() {
			return home_data;
		},
		methods: {
			/**
			 * 改变显示的列表
			 * @param {Object} index
			 */
			clickItem: function(index) {
				if(index == home_data.is_on) {
					return;
				}
				home_data.home_tab[home_data.is_on].scrollTop = $("#" + home_data.home_tab[home_data.is_on].id).scrollTop();
				home_data.is_on = index;
				if(home_data.home_tab[home_data.is_on].leave) {
					home_data.home_tab[home_data.is_on].leave = false;
					var timeId = setInterval(function() {
						toBeforePosition(timeId, home_data.is_on);
					}, 100);
				}
			}
		},
		/**
		 * 组件显示之前
		 */
		beforeRouteEnter: function(to, from, next) {
			console.log("home-beforeRouteEnter:");
			console.log("to:" + to.path);
			console.log("from:" + from.path);
			next(function() {
				//初始化滚动
				initScroll();
				//回滚到之前的位置
				$("#" + home_data.home_tab[0].id).scrollTop(home_data.home_tab[0].scrollTop);
				$("#" + home_data.home_tab[1].id).scrollTop(home_data.home_tab[1].scrollTop);
				$("#" + home_data.home_tab[2].id).scrollTop(home_data.home_tab[2].scrollTop);
				home_data.home_tab[home_data.is_on].leave = false;
			});
		},
		/**
		 * 组件离开之前
		 */
		beforeRouteLeave: function(to, from, next) {
			console.log("home-beforeRouteLeave:");
			console.log("to:" + to.path);
			console.log("from:" + from.path);
			home_data.home_tab[home_data.is_on].scrollTop = $("#" + home_data.home_tab[home_data.is_on].id).scrollTop();
			home_data.home_tab[0].leave = true;
			home_data.home_tab[1].leave = true;
			home_data.home_tab[2].leave = true;
			next();
		}
	};
	//发布动态
	var add_trends = {
		template: "#temp_add_trends",
		data: function() {
			return add_trends_data;
		},
		beforeRouteEnter: function(to, from, next) {
			console.log("add-beforeRouteEnter:");
			console.log("to:" + to.path);
			console.log("from:" + from.path);
			next();
		},
		beforeRouteLeave: function(to, from, next) {
			console.log("add-beforeRouteLeave:");
			console.log("to:" + to.path);
			console.log("from:" + from.path);
			next();
		}
	};

	var routes = [{
		path: '/home',
		component: class_circle_home
	}, {
		path: '/add',
		component: add_trends
	}];

	var router = new VueRouter({
		routes: routes
	});

	var class_circle_app = new Vue({
		router: router
	}).$mount('#class_circle_app');

	router.push('home');
}

function initScroll() {
	$(".weui-tab__bd-item").pullToRefresh();
	$(".weui-tab__bd-item").infinite();
	$(".weui-tab__bd-item").on("pull-to-refresh", function() {
		var self = this
		setTimeout(function() {
			$(self).pullToRefreshDone();
		}, 2000)
	});
	var loading = false; //状态标记
	$(".weui-tab__bd-item").infinite().on("infinite", function() {
		if(loading) return;
		console.log("loading");
		loading = true;
		setTimeout(function() {
			loading = false;
		}, 1500); //模拟延迟
	});
}

/**
 * 回滚到原来的位置
 * @param {Object} timeId
 * @param {Object} index
 */
function toBeforePosition(timeId, index) {
	console.log("toBeforePosition:" + index);
	var scrollTop_0 = $("#" + home_data.home_tab[index].id).scrollTop();
	var scrollTop_1 = home_data.home_tab[index].scrollTop;
	if(scrollTop_0 == 0 && scrollTop_0 != scrollTop_1) {
		//之前设置回滚到初始位置无效
		$("#" + home_data.home_tab[index].id).scrollTop(home_data.home_tab[index].scrollTop);
	} else {
		clearInterval(timeId);
	}
}