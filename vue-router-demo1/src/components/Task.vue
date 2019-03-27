<template>
	<div class="container">
		<h2>任务中心</h2>
		<div class="preview">
			<img :src="imgUrl" />
		</div>
		<form>
			<div class="upload">
				选择文件
				<input type="file" @change="getFile($event)"/>
			</div>
			<br />
			<button @click="submit($event)" class="sub-btn">提交</button>
		</form>
	</div>
</template>

<script>
	export default{
		name:'Task',
		data(){
			return{
				imgUrl:'',
				file:''
			};
		},
		methods:{
			// 图片预览
			getFile:function(event){
				this.file = event.target.file[0];
				var windowURL = window.URL || window.webkitURL;
				alert(windowURL.createObjectURL(this.file));
			},
			submit:function(event){
				//阻止元素发生默认行为
				event.preventDefault();
				let formData = new FormData();
				formData.append('file',this.file);
				this.$http.post('http://localhost:8080/upload',formData)
				.them(function(response){
					alert(response.data);
					this.imgUrl = response.data;
				});
			}
		}
	};
</script>

<style scoped>
.preview{
	width: 300px;
	height: 300px;
}	
.preview img{
	width: 100%;
	height: 100%;
}
.sub-btn{
	width: 120px;
	height: 35px;
	border-radius: 10px;
	outline: none;
	background-color: #333333;
	color: #ffffff;
}
.upload{
	margin-top: 10px;
	display: inline-block;
	width: 120px;
	height: 35px;
	border: 1px solid #99d3f5;
	border-radius: 4px;
	background-color: #d0eeff;
	color: #000;
	text-align: center;
	cursor: pointer;
}
/* .upload input{
	width: 100%;
	height: 100%;
	
} */
</style>
