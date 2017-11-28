Vue.component("choose-depart", {
	template: "#choose-depart",
	data: function() {
		return {
			rootDeparts: [],
			choosePerson: [],
			activeDepart: {}
		}
	},
	mounted: function() {
		this.getAllDeparts();
	},
	watch: {
		rootDeparts: function(newVal, oldVal) {
			if(newVal.length > 0 && oldVal.length == 0) {
				this.activeDepart = newVal[0];
			}
		}
	},
	methods: {
		getActiveDepart: function(depart) {
			this.activeDepart = depart;
			console.log("当前选中的depart:" + JSON.stringify(depart))
		},
		getChoosePerson: function(persons) {
			console.log("已选人员：" + JSON.stringify(persons))
			this.choosePerson = persons;
		},
		getAllDeparts: function(callback) {
			console.log("*********getAllListData******");
			var com = this;
			com.isLoading = true;
			com.rootDeparts = com.getNodeTree();
		},
		getNodeTree: function(nodes, callback) {
			nodes = [{
					"value": 1,
					"title": "金视野测试部",
					"parentvalue": 0,
					"order": 100000000
				},
				{
					"value": 2,
					"title": "党总支",
					"parentvalue": 1,
					"order": 100000000
				},
				{
					"value": 3,
					"title": "校委会",
					"parentvalue": 1,
					"order": 99999000
				},
				{
					"value": 4,
					"title": "书记",
					"parentvalue": 2,
					"order": 100000000
				},
				{
					"value": 5,
					"title": "党支部",
					"parentvalue": 4,
					"order": 100000000
				},
				{
					"value": 6,
					"title": "民主党派",
					"parentvalue": 4,
					"order": 99999000
				},
				{
					"value": 7,
					"title": "工会",
					"parentvalue": 4,
					"order": 99998000
				},
				{
					"value": 8,
					"title": "团委",
					"parentvalue": 4,
					"order": 99997000
				},
				{
					"value": 9,
					"title": "办公室",
					"parentvalue": 4,
					"order": 99996000
				},
				{
					"value": 10,
					"title": "副校长",
					"parentvalue": 3,
					"order": 100000000
				},
				{
					"value": 11,
					"title": "保卫科",
					"parentvalue": 3,
					"order": 99999000
				},
				{
					"value": 12,
					"title": "艺体中心",
					"parentvalue": 3,
					"order": 99998000
				},
				{
					"value": 13,
					"title": "信息中心",
					"parentvalue": 3,
					"order": 99997000
				},
				{
					"value": 14,
					"title": "总务处",
					"parentvalue": 3,
					"order": 99996000
				},
				{
					"value": 15,
					"title": "督导室",
					"parentvalue": 3,
					"order": 99995000
				},
				{
					"value": 16,
					"title": "招生办",
					"parentvalue": 3,
					"order": 99994000
				},
				{
					"value": 17,
					"title": "教科室",
					"parentvalue": 3,
					"order": 99993000
				},
				{
					"value": 18,
					"title": "年级部",
					"parentvalue": 3,
					"order": 99992000
				},
				{
					"value": 19,
					"title": "德育处",
					"parentvalue": 3,
					"order": 99991000
				},
				{
					"value": 20,
					"title": "教学处",
					"parentvalue": 3,
					"order": 99990000
				},
				{
					"value": 21,
					"title": "办公室",
					"parentvalue": 3,
					"order": 99989000
				},
				{
					"value": 22,
					"title": "行政支部",
					"parentvalue": 5,
					"order": 100000000
				},
				{
					"value": 23,
					"title": "第一支部",
					"parentvalue": 5,
					"order": 99999000
				},
				{
					"value": 24,
					"title": "第二支部",
					"parentvalue": 5,
					"order": 99998000
				},
				{
					"value": 25,
					"title": "第三支部",
					"parentvalue": 5,
					"order": 99997000
				},
				{
					"value": 26,
					"title": "创建办",
					"parentvalue": 7,
					"order": 100000000
				},
				{
					"value": 27,
					"title": "教代会",
					"parentvalue": 7,
					"order": 99999000
				},
				{
					"value": 28,
					"title": "计生办",
					"parentvalue": 7,
					"order": 99998000
				},
				{
					"value": 29,
					"title": "爱委会",
					"parentvalue": 7,
					"order": 99997000
				},
				{
					"value": 30,
					"title": "工会小组",
					"parentvalue": 7,
					"order": 99996000
				},
				{
					"value": 31,
					"title": "团支部",
					"parentvalue": 8,
					"order": 100000000
				},
				{
					"value": 32,
					"title": "学生会",
					"parentvalue": 8,
					"order": 99999000
				},
				{
					"value": 33,
					"title": "学生社团",
					"parentvalue": 8,
					"order": 99998000
				},
				{
					"value": 34,
					"title": "校车办",
					"parentvalue": 9,
					"order": 100000000
				},
				{
					"value": 35,
					"title": "档案室",
					"parentvalue": 9,
					"order": 99999000
				},
				{
					"value": 36,
					"title": "文印室",
					"parentvalue": 9,
					"order": 99998000
				},
				{
					"value": 37,
					"title": "校史室",
					"parentvalue": 9,
					"order": 99997000
				},
				{
					"value": 38,
					"title": "校车办",
					"parentvalue": 21,
					"order": 100000000
				},
				{
					"value": 39,
					"title": "档案室",
					"parentvalue": 21,
					"order": 99999000
				},
				{
					"value": 40,
					"title": "文印室",
					"parentvalue": 21,
					"order": 99998000
				},
				{
					"value": 41,
					"title": "校史室",
					"parentvalue": 21,
					"order": 99997000
				},
				{
					"value": 42,
					"title": "备课组",
					"parentvalue": 20,
					"order": 100000000
				},
				{
					"value": 43,
					"title": "图书馆",
					"parentvalue": 20,
					"order": 99999000
				},
				{
					"value": 44,
					"title": "实验室",
					"parentvalue": 20,
					"order": 99998000
				},
				{
					"value": 45,
					"title": "教材科",
					"parentvalue": 20,
					"order": 99997000
				},
				{
					"value": 46,
					"title": "年级教学",
					"parentvalue": 20,
					"order": 99996000
				},
				{
					"value": 47,
					"title": "学生公寓",
					"parentvalue": 19,
					"order": 100000000
				},
				{
					"value": 48,
					"title": "家长委员",
					"parentvalue": 19,
					"order": 99999000
				},
				{
					"value": 49,
					"title": "班主任",
					"parentvalue": 19,
					"order": 99998000
				},
				{
					"value": 50,
					"title": "高一年级",
					"parentvalue": 19,
					"order": 99997000
				},
				{
					"value": 51,
					"title": "高二年级",
					"parentvalue": 19,
					"order": 99996000
				},
				{
					"value": 52,
					"title": "高三年级",
					"parentvalue": 19,
					"order": 99995000
				},
				{
					"value": 53,
					"title": "学生公寓",
					"parentvalue": 18,
					"order": 100000000
				},
				{
					"value": 54,
					"title": "家长委员会",
					"parentvalue": 18,
					"order": 99999000
				},
				{
					"value": 55,
					"title": "班主任",
					"parentvalue": 18,
					"order": 99998000
				},
				{
					"value": 56,
					"title": "高一年级",
					"parentvalue": 18,
					"order": 99997000
				},
				{
					"value": 57,
					"title": "高二年级",
					"parentvalue": 18,
					"order": 99996000
				},
				{
					"value": 58,
					"title": "高三年级",
					"parentvalue": 18,
					"order": 99995000
				},
				{
					"value": 59,
					"title": "教研组",
					"parentvalue": 17,
					"order": 100000000
				},
				{
					"value": 60,
					"title": "校本研究",
					"parentvalue": 17,
					"order": 99999000
				},
				{
					"value": 61,
					"title": "教研刊物",
					"parentvalue": 17,
					"order": 99998000
				},
				{
					"value": 62,
					"title": "学生毕业",
					"parentvalue": 16,
					"order": 100000000
				},
				{
					"value": 63,
					"title": "高一招生",
					"parentvalue": 16,
					"order": 99999000
				},
				{
					"value": 64,
					"title": "考核组",
					"parentvalue": 15,
					"order": 100000000
				},
				{
					"value": 65,
					"title": "保管室",
					"parentvalue": 14,
					"order": 100000000
				},
				{
					"value": 66,
					"title": "财务室",
					"parentvalue": 14,
					"order": 99999000
				},
				{
					"value": 67,
					"title": "医务室",
					"parentvalue": 14,
					"order": 99998000
				},
				{
					"value": 68,
					"title": "餐厅",
					"parentvalue": 14,
					"order": 99997000
				},
				{
					"value": 69,
					"title": "物业公司",
					"parentvalue": 14,
					"order": 99996000
				},
				{
					"value": 70,
					"title": "信息教研组",
					"parentvalue": 13,
					"order": 100000000
				},
				{
					"value": 71,
					"title": "网络中心",
					"parentvalue": 13,
					"order": 99999000
				},
				{
					"value": 72,
					"title": "体育馆",
					"parentvalue": 12,
					"order": 100000000
				},
				{
					"value": 73,
					"title": "艺术馆",
					"parentvalue": 12,
					"order": 99999000
				},
				{
					"value": 74,
					"title": "门卫",
					"parentvalue": 11,
					"order": 100000000
				},
				{
					"value": 75,
					"title": "保安公司",
					"parentvalue": 11,
					"order": 99999000
				},
				{
					"value": 76,
					"title": "高一一班",
					"parentvalue": 56,
					"order": 100000000
				},
				{
					"value": 77,
					"title": "高一二班",
					"parentvalue": 56,
					"order": 99999000
				},
				{
					"value": 78,
					"title": "高一三班",
					"parentvalue": 56,
					"order": 99998000
				},
				{
					"value": 79,
					"title": "高一四班",
					"parentvalue": 56,
					"order": 99997000
				},
				{
					"value": 80,
					"title": "高一五班",
					"parentvalue": 56,
					"order": 99996000
				},
				{
					"value": 81,
					"title": "高一六班",
					"parentvalue": 56,
					"order": 99995000
				},
				{
					"value": 82,
					"title": "高一七班",
					"parentvalue": 56,
					"order": 99994000
				},
				{
					"value": 83,
					"title": "高一八班",
					"parentvalue": 56,
					"order": 99993000
				},
				{
					"value": 84,
					"title": "高一九班",
					"parentvalue": 56,
					"order": 99992000
				},
				{
					"value": 85,
					"title": "高一十班",
					"parentvalue": 56,
					"order": 99991000
				},
				{
					"value": 86,
					"title": "高二一班",
					"parentvalue": 57,
					"order": 100000000
				},
				{
					"value": 87,
					"title": "高二二班",
					"parentvalue": 57,
					"order": 99999000
				},
				{
					"value": 88,
					"title": "高二三班",
					"parentvalue": 57,
					"order": 99998000
				},
				{
					"value": 89,
					"title": "高二四班",
					"parentvalue": 57,
					"order": 99997000
				},
				{
					"value": 90,
					"title": "高二五班",
					"parentvalue": 57,
					"order": 99996000
				},
				{
					"value": 91,
					"title": "高二六班",
					"parentvalue": 57,
					"order": 99995000
				},
				{
					"value": 92,
					"title": "高二七班",
					"parentvalue": 57,
					"order": 99994000
				},
				{
					"value": 93,
					"title": "高二八班",
					"parentvalue": 57,
					"order": 99993000
				},
				{
					"value": 94,
					"title": "高二九班",
					"parentvalue": 57,
					"order": 99992000
				},
				{
					"value": 95,
					"title": "高二十班",
					"parentvalue": 57,
					"order": 99991000
				},
				{
					"value": 96,
					"title": "高三一班",
					"parentvalue": 58,
					"order": 100000000
				},
				{
					"value": 97,
					"title": "高三二班",
					"parentvalue": 58,
					"order": 99999000
				},
				{
					"value": 98,
					"title": "高三三班",
					"parentvalue": 58,
					"order": 99998000
				},
				{
					"value": 99,
					"title": "高三四班",
					"parentvalue": 58,
					"order": 99997000
				},
				{
					"value": 100,
					"title": "高三五班",
					"parentvalue": 58,
					"order": 99996000
				},
				{
					"value": 101,
					"title": "高三六班",
					"parentvalue": 58,
					"order": 99995000
				},
				{
					"value": 102,
					"title": "高三七班",
					"parentvalue": 58,
					"order": 99994000
				},
				{
					"value": 103,
					"title": "高三八班",
					"parentvalue": 58,
					"order": 99993000
				},
				{
					"value": 104,
					"title": "高三九班",
					"parentvalue": 58,
					"order": 99992000
				},
				{
					"value": 105,
					"title": "高三十班",
					"parentvalue": 58,
					"order": 99991000
				},
				{
					"value": 106,
					"title": "校长",
					"parentvalue": 3,
					"order": 99988000
				},
				{
					"value": -1,
					"title": "全部",
					"parentvalue": 0,
					"order": 0
				}
			];
			console.log('****choose-depart***getChildrenTree***')
			if(typeof(nodes) === 'undefined' || nodes.length === 0) {
				return []
			}
			nodes.sort(function(a, b) {
				return a.value - b.value
			})
			var map = {},
				node, roots = [];
			for(var i = 0; i < nodes.length; i++) {
				node = nodes[i]
				node.departList = []
				node.personList = []
				map[node.value] = i // use map to look-up the parents
				if(typeof(map[node.parentvalue]) !== 'undefined') {
					nodes[map[node.parentvalue]].departList.push(node)
				} else {
					if(node.value >= 0) {
						roots.push(node);
					}

				}

			}
			console.log('getChildrenTree获取的数据：' + JSON.stringify(roots))
			return roots
		}
	}
})