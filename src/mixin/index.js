export const mixin = {
    methods: {
        // 提示信息
        notify(title, type) {
            this.$notify({
                title: title,
                type: type
            })
        },
        getUrl(url) {
            return `${this.$store.state.HOST}/${url}`
        },
        // 更换性别显示方式
        changeSex(value) {
            if (value == '0') {
                return '女'
            } else if (value == '1') {
                return '男'
            } else {
                return '组合'
            }
            return value;
        },
        changeBirth(value) {
            return String(value).substr(0, 10);
        },
        changeIntroduction(value) {
            if (String(value).length >= 30) {
                return String(value).substr(0, 30) + "...";
            } else {
                return String(value);
            }
        },
        // 上传图片校验
        beforeUploadAvator(file) {
            const isJpg = (file.type === 'image/jpeg') || (file.type === 'image/png');
            if (!isJpg) {
                this.$message.error('上传图片格式应为jpg或png');
                return false;
            }
            const isLargethan2M = (file.size / 1024 / 1024) < 2;
            if (!isLargethan2M) {
                this.$message.error('上传图片大小不应超过2M');
                return false;
            }
            return true;
        },
        // 上传图片成功后
        handleAvatorSuccess(res) {
            let _this = this;
            if (res.code == 20000) {
                _this.getAll();
                _this.notify(res.message, "success");
            } else {
                _this.notify(res.message, "error");
            }
        },
        deleData(id) {
            let _this = this;
            _this.idx = id;
            _this.visitDeleDialog = true;
        },
        // 批量删除ids
        handleSelectionChange(value) {
            this.multipleSelection = value;
        }
    }
}