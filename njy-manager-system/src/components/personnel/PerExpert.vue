<template>
	<div><h1>专家</h1></div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			userVOs: []
		};
	},
	created() {
		console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj');
		this.getAllUsers();
		console.log('jdddddddddddddddddddddddddddddddddddddddddd');
	},
	methods: {
		getAllUsers: function() {
			var _this = this;
			this.$http({
				method: 'GET',
				url: _this.apiServer + '/user/getUser'
			}).then(
				function(res) {
					console.log('请求成功');
					console.log('++++++++++++++++++:' + res.data.code);
					_this.userVOs = res.data.data;
				});
		}
	}
};
</script>
