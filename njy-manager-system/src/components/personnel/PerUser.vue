<template>
	<div>
		<div class="item-top">
			<div class="item-city1">
				<div class="item-city">
					<span style="margin-left: 14px;">城市搜索：</span>
					<el-select v-model="cityValue" placeholder="请选择">
						<el-option v-for="item in city" :key="item.code" :label="item.name" :value="item.code"></el-option>
					</el-select>
				</div>
			</div>
			<div class="item-interval"></div>
			<div class="item-category">
				<div class="category">
					人员类别：
					<el-select v-model="cityValue" placeholder="请选择">
						<el-option v-for="item in city" :key="item.code" :label="item.name" :value="item.code"></el-option>
					</el-select>
				</div>
				<div class="category">
					行业分类：
					<el-select v-model="cityValue" placeholder="请选择">
						<el-option v-for="item in city" :key="item.code" :label="item.name" :value="item.code"></el-option>
					</el-select>
				</div>
				<div class="category">
					<el-button type="primary" >excel导出</el-button>
					<el-button type="primary" >选中用户推送</el-button>
					<el-button type="primary">当前所有用户推送</el-button>
				</div>
			</div>
			<div class="item-interval"></div>
			<div class="category">
				显示
				<el-input-number v-model="num" @change="handleChange" :min="1" label="描述文字"></el-input-number>
				条
			</div>
		</div>
		<div class="list-box">
			<el-table ref="multipleTable" border :data="userVOs" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column label="用户列表">
					<el-table-column type="selection" width="40"></el-table-column>
					<el-table-column type="index" label="序号" width="50px"></el-table-column>
					<el-table-column prop="mobile" label="手机号" width="120px"></el-table-column>
					<el-table-column prop="username" label="用户名称" width="80px"></el-table-column>
					<el-table-column prop="category" label="身份" width="140px"></el-table-column>
					<el-table-column prop="region" label="地区" show-overflow-tooltip>
						<template slot-scope="scope">
							{{ scope.row.regionProvince }} {{ scope.row.regionCity }} {{ scope.row.regionCountry }}
						</template>
					</el-table-column>
					<el-table-column prop="companyName" label="单位名称" width="150px" show-overflow-tooltip></el-table-column>
					<el-table-column prop="industryCategoryOne" label="种养类别及规模" width="150px" show-overflow-tooltip></el-table-column>
					<el-table-column prop="userCheck.length" label="签到次数" width="80px"></el-table-column>
					<el-table-column prop="integral" label="总积分" width="80px"></el-table-column>
					<el-table-column prop="status" label="禁用/启用" width="80px">
						<template slot-scope="scope">
							<!-- <el-tag :type="scope.row.status === '正常' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status }}</el-tag> -->
							<el-button size="mini" type="success" plain v-if="scope.row.status" @click="updateStatus(scope.$index)">正常</el-button>
							<el-button size="mini" type="danger" plain v-else @click="updateStatus(scope.$index)">已禁用</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="createTime" label="注册时间" show-overflow-tooltip></el-table-column>
					<el-table-column label="操作" show-overflow-tooltip>
						<template slot-scope="scope">
							<el-button size="mini" type="success" @click="showBianJi(scope.row)">编辑</el-button>
							<el-button size="mini" type="primary">查看详情</el-button>
							<!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
							<el-button size="mini" type="danger">删除</el-button>
						</template>
					</el-table-column>
				</el-table-column>
			</el-table>
			<div class="pagination"><el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000"></el-pagination></div>
		</div>
	</div>
</template>

<script>
var _this;
export default {
	data() {
		return {
			multipleSelection: [],
			userVOs: [],
			region: '',
			city: [],
			cityValue: '',
			num: 10,
			pager: 1
		};
	},
	created() {
		_this = this;
		this.getAllUsers();
		this.getCity();
	},
	methods: {
		handleCurrentChange(val) {
			this.pager = val;
			this.getAllUsers();
		},
		getAllUsers: function() {
			this.postRequest('/user/page', {
				page: this.pager
			}).then(function(res) {
				console.log('user请求成功');
				console.log('++++++++++++++++++:' + res.data);
				_this.userVOs = res.data;
				console.log(_this.userVOs[0].status + 'sfisdn1111111111111111111111111111');
			});
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		getCity: function() {
			this.$http({
				method: 'GET',
				url: _this.apiServer + '/area/getProvince'
			}).then(function(res) {
				// console.log('地区请求成功');
				// console.log('++++++++++++++++++:' + res.data.code);
				_this.city = res.data.data;
				// console.log(_this.city);
			});
		},
		updateStatus: function(index) {
			// console.log('index:' + index);
			var status = this.userVOs[index].status;
			// console.log('status:' + status);
			if (status == true) {
				status = 0;
			} else {
				status = 1;
			}
			// console.log('status:' + status);
			this.putRequest('/user/updateStatus', {
				id: this.userVOs[index].id,
				status: status
			}).then(function(res) {
				console.log('+++updateStatus:' + res.data.code);
			});
			_this.getAllUsers();
		}
	}
};
</script>
<style>
.item-top {
	margin-top: 20px;
}
.item-city1 {
	margin-top: 30px;
	width: 100%;
}
.item-city {
	background-color: rgb(245, 247, 250);
	height: 50px;
	display: flex;
	align-items: center;
}
.item-category {
	display: flex;
	background-color: rgb(245, 247, 250);
	height: 50px;
	align-items: center;
}
.item-interval {
	height: 15px;
}
.category {
	margin-left: 14px;
}
.list-box {
	margin-top: 20px;
}
</style>
