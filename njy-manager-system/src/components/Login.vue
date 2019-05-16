<template>
  <div class="login-wrap">
    <el-form
      :rules="rules"
      class="login-container"
      lable-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <h3 class="login_title">后台系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%" @click="submitClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true,
      loginForm: {
        username: "root",
        password: "123456"
      },
      loading: false
    };
  },
  methods: {
    submitClick: function() {
      var _this = this;
      this.loading = true;
      this.postRequest("/login", {
        username: this.loginForm.username,
        password: this.loginForm.password
      }).then(resp => {
        _this.loading = false;
        if (resp && resp.status == 200) {
          var data = resp.data;
          // var name = store.state.user.name;
          var str = JSON.stringify(data.data+"=====");
          console.log(str);
          _this.$store.commit("login", data.data);
          // console.log(_this.$store.status+'----=======');
          var path = _this.$route.query.redirect;
          _this.$router.replace({
            path: path == "/" || path == undefined ? "/home" : path
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.login_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100%;
}
.login-container {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.login_title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #505458;
  border-bottom: 1px solid #ddd;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>


