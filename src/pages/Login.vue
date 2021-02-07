<template>
  <div class="login-wrap">
    <div class="ms-title">Ccmusic 后台管理登录</div>
    <div class="ms-login">
      <el-form :model="roleForm" :rules="rules" ref="roleForm">
        <el-form-item prop="username">
          <el-input v-model="roleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="roleForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="loginForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mixin} from '../mixin'
import {login} from '../api/index'
export default {
  mixins: [mixin],
  data: function() {
    return {
      roleForm: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    loginForm() {
      let params = new URLSearchParams();
      params.append("username", this.roleForm.username);
      params.append("password", this.roleForm.password);
      login(params).then((res) => {
        if (res.code == 20000) {
          this.$router.push("/Index");
          localStorage.setItem("userName", this.roleForm.username);
          this.notify("登录成功", "success");
        } else {
          this.notify(res.message, "error")
        }
      })
    }
  }
}
</script>
<style scoped>
.login-wrap {
  position: relative;
  background: url("../assets/img/background.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #fff;
}
.ms-login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 200px;
  margin-left: -190px;
  margin-top: -150px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 40px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
</style>
