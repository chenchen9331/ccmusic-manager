<template>
    <div class="header">
        <div class="logo">Ccmusic</div>
        <div class="header-right">
            <div class="user-avatar">
                <img src="../assets/img/user.jpg">
            </div>
            <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{userName}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        userName() {
            return localStorage.getItem("userName");
        }
    },
    methods: {
        handleCommand(command) {
            if (command == "logout") {
                localStorage.removeItem("userName");
                this.$router.push("/");
            }
        }
    }
}
</script>
<style scoped>
    .header {
        position: relative;
        width: 100%;
        height: 70px;
        background-color: #334256;
        color: #ffffff;
        font-size: 22px;
    }
    .logo {
        float: left;
        width: 150px;
        height: 70px;
        font-size: 40px;
        text-align: center;
        line-height: 70px;
        color: #ffffff;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .header-right {
        float: right;
        padding-right: 50px;
        height: 70px;
        display: flex;
        align-items: center;
    }
    .user-avatar {
        margin-left: 20px;
    }
    .user-avatar img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .user-name {
        margin-left: 20px;
    }
    .el-dropdown-link {
        color: #ffffff;
        cursor: pointer;
        font-size: 24px;
    }
</style>