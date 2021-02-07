<template>
    <div class="table">
        <div class="container">
            <el-form :inline="true" ref="searchList" :model="searchList" label-width="60px" class="form-search">
                <el-form-item label="用户名:">
                    <el-input v-model="searchList.name" placeholder="请输入用户名" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchConsumer()" size="mini">查询</el-button>
                    <el-button type="primary" size="mini" @click="visitDialog = true">添加</el-button>
                    <el-button type="danger" size="mini" @click="deleteAll()">批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table border :data="data" style="width: 100%;" size="mini" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="用户头像" align="center" width="120">
                <template slot-scope="scope">
                    <div class="consumer-avator">
                        <img :src="getUrl(scope.row.avator)" style="width: 100%"/>
                    </div>
                    <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeUploadAvator" :on-success="handleAvatorSuccess">
                        <el-button size="mini">更新图片</el-button>
                    </el-upload>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120" align="center"></el-table-column>
            <el-table-column label="性别" width="50" align="center">
                <template slot-scope="scope">
                    {{changeSex(scope.row.sex)}}
                </template>
            </el-table-column>
            <el-table-column prop="phoneNum" label="手机号" width="120" align="center"></el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="240" align="center"></el-table-column>
            <el-table-column label="生日" width="120" align="center">
                <template slot-scope="scope">
                    {{changeBirth(scope.row.birth)}}
                </template>
            </el-table-column>
            <el-table-column prop="introduction" label="签名" align="center"></el-table-column>
            <el-table-column prop="location" label="地区" width="100" align="center"></el-table-column>            
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="editData(scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="deleData(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background 
                       layout="total,pager,prev,next" 
                       :current-page="currentPage" 
                       :page-size="pageSize" 
                       :total="dataList.length" 
                       @current-change="handleCurrentChange">

        </el-pagination>
        </div>        
        <el-dialog title="添加用户" :visible.sync="visitDialog" width="400px" center>
            <el-form :model="pojo" ref="pojo" label-width="80px" :rules="rules">
                <el-form-item prop="username" label="用户名" size="mini">
                    <el-input v-model="pojo.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" size="mini">
                    <el-input type="password" v-model="pojo.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <input type="radio" name="sex" value="0" v-model="pojo.sex">&nbsp;女&nbsp;&nbsp;
                    <input type="radio" name="sex" value="1" v-model="pojo.sex">&nbsp;男
                </el-form-item>
                <el-form-item prop="phoneNum" label="手机号" size="mini">
                    <el-input v-model="pojo.phoneNum" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="电子邮箱" size="mini">
                    <el-input v-model="pojo.email" placeholder="电子邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="birth" label="生日" size="mini">
                    <el-date-picker type="date" placeholder="选择日期" v-model="pojo.birth" style="width:100%"></el-date-picker>
                </el-form-item>
                <el-form-item prop="introduction" label="签名" size="mini">
                    <el-input v-model="pojo.introduction" placeholder="签名"></el-input>
                </el-form-item>      
                <el-form-item prop="location" label="地区" size="mini">
                    <el-input v-model="pojo.location" placeholder="地区"></el-input>
                </el-form-item>          
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="addConsumer()">保存</el-button>
                <el-button type="info" @click="visitDialog=false; pojo=[]">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改用户" :visible.sync="visitEditDialog" width="400px" center>
            <el-form :model="editPojo" ref="editPojo" label-width="80px" :rules="rules">
                <el-form-item prop="username" label="用户名" size="mini">
                    <el-input v-model="editPojo.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码" size="mini">
                    <el-input type="password" v-model="editPojo.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <input type="radio" name="sex" value="0" v-model="editPojo.sex">&nbsp;女&nbsp;&nbsp;
                    <input type="radio" name="sex" value="1" v-model="editPojo.sex">&nbsp;男
                </el-form-item>
                <el-form-item prop="phoneNum" label="手机号" size="mini">
                    <el-input v-model="editPojo.phoneNum" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="电子邮箱" size="mini">
                    <el-input v-model="editPojo.email" placeholder="电子邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="birth" label="生日" size="mini">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editPojo.birth" style="width:100%"></el-date-picker>
                </el-form-item>
                <el-form-item prop="introduction" label="签名" size="mini">
                    <el-input v-model="editPojo.introduction" placeholder="签名"></el-input>
                </el-form-item>      
                <el-form-item prop="location" label="地区" size="mini">
                    <el-input v-model="editPojo.location" placeholder="地区"></el-input>
                </el-form-item> 
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="editConsumer()">保存</el-button>
                <el-button type="info" @click="visitEditDialog=false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="删除歌手" :visible.sync="visitDeleDialog" width="400px" center>
            <div>是否确定执行删除操作？</div>
            <span slot="footer">
                <el-button type="danger" @click="deleteConsumer()">是</el-button>
                <el-button type="info" @click="visitDeleDialog=false">否</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {setConsumer, updateConsumer, searchConsumerByName, deleteConsumer, findAllConsumer} from '../api/index'
import {mixin} from '../mixin'
export default {
    data() {
        return {
            visitDialog: false,
            visitEditDialog: false,
            visitDeleDialog: false,
            pojo: {
                username: '',
                password: '',
                sex: '1',
                phoneNum: '',
                email: '',
                birth: '',
                introduction: '',
                location: ''
            },
            editPojo: {
                id: '',
                username: '',
                password: '',
                sex: '',
                phoneNum: '',
                email: '',
                birth: '',
                introduction: '',
                location: ''
            },
            dataList: [],
            searchList: {
                name: ''
            },
            currentPage: 1,
            pageSize: 5,
            idx: '-1',
            multipleSelection: [],
            rules: {
            username: [
                {required: true,message: '请输入用户名',trigger: 'blur'}
            ],
            password: [
                {required: true,message: '请输入密码',trigger: 'blur'}
            ],
            phoneNum: [
                {required: true,message: '请输入手机号',trigger: 'blur'}
            ],
            email: [
                {required: true,message: '请输入电子邮箱',trigger: 'blur'},
                {type: 'email',message:'请输入正确的电子邮箱地址',trigger:['blur','change']}
            ],
            introduction: [
                {required: true,message: '请输入签名',trigger: 'blur'}
            ],
            location: [
                {required: true,message: '请输入地区',trigger: 'blur'}
            ]                
        }
            //select_word: ''
        }
    },
    created() {
        this.getAll();
    },
    computed: {
        data() {
            return this.dataList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
        }
    },
    // watch: {
    //     select_word: function() {
    //         if (this.select_word == '') {
    //             this.dataList = this.searchList;
    //         } else {
    //             this.dataList == [];
    //             for (let item of this.searchList) {
    //                 if (item.name.includes(this.select_word)) {
    //                     this.dataList.push(item);
    //                 }
    //             }
    //         }
    //     }
    // },
    mixins: [mixin],
    methods: {
        addConsumer() {
            this.$refs['pojo'].validate(valid => {
                if (valid) {
                    let d = this.pojo.birth;
                    let datatime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    let params = new URLSearchParams();
                    params.append('username',this.pojo.username);
                    params.append('password',this.pojo.password);
                    params.append('sex',this.pojo.sex);
                    params.append('phoneNum',this.pojo.phoneNum);            
                    params.append('email',this.pojo.email);
                    params.append('birth',datatime);
                    params.append('introduction',this.pojo.introduction);
                    params.append('location',this.pojo.location);
                    params.append('avator','/img/user.jpg');
                    setConsumer(params).then(res => {
                        if (res.code == 20000) {
                            this.visitDialog = false;
                            this.pojo = [];
                            this.getAll();
                            this.notify(res.message, "success");
                        } else {
                            this.visitDialog = false;
                            this.notify(res.message, "error")
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                    this.pojo = [];
                    this.visitDialog = false;
                        }
                    })
        },
        editData(row) {
            this.visitEditDialog = true;
            this.editPojo = {
                 id: row.id,
                username: row.username,
                password: row.password,
                sex: row.sex,
                phoneNum: row.phoneNum,
                email: row.email,
                birth: row.birth,
                introduction: row.introduction,
                location: row.location
            }
        },
        editConsumer() {
            this.$refs['editPojo'].validate(valid => {
                if (valid) {
                    let d = this.editPojo.birth;
                    let datatime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    let params = new URLSearchParams();
                    params.append('id',this.editPojo.id);
                    params.append('username',this.editPojo.username);
                    params.append('password',this.editPojo.password);
                    params.append('sex',this.editPojo.sex);
                    params.append('phoneNum',this.editPojo.phoneNum);
                    params.append('email',this.editPojo.email);
                    params.append('birth',datatime);
                    params.append('introduction',this.editPojo.introduction);
                    params.append('location',this.editPojo.location);
                    updateConsumer(params).then(res => {
                        if (res.code == 20000) {
                            this.visitEditDialog = false;
                            this.getAll();
                            this.notify(res.message, "success");
                        } else {
                            this.notify(res.message, "error")
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                    this.visitEditDialog = false;
                    this.getAll();
                }
            })
        },
        searchConsumer() {
            let params = new URLSearchParams();
            params.append("name", this.searchList.name);
            searchConsumerByName(params).then(res => {
                if (res.code == 20000) {
                    this.dataList = [];
                    this.dataList = res.data;
                }
            })

        },
        getAll() {
            this.dataList = [];
            this.searchList = [];
            findAllConsumer().then(res => {
                this.searchList = res.data;
                this.dataList = res.data;
            })
        },
        uploadUrl(id) {
            return `${this.$store.state.HOST}/consumer//updateConsumerPic?id=${id}`;
        },
        handleCurrentChange(value) {
            this.currentPage = value;
        },
        deleteConsumer() {
            deleteConsumer(this.idx).then(res => {
                if (res.code == 20000) {
                    this.notify(res.message, "success");
                    this.visitDeleDialog = false;
                    this.getAll();
                } else {
                    this.notify(res.message, "error");
                }
            }).catch(err => {
                console.log(err);
            });
        },
        // 批量删除
        deleteAll() {
            for (let item of this.multipleSelection) {
                deleteConsumer(item.id).then(res => {
                if (res.code == 20000) {
                    this.notify(res.message, "success");
                } else {
                    this.notify(res.message, "error");
                }
            }).catch(err => {
                console.log(err);
            });
            this.multipleSelection = [];
            this.getAll();
            }
        }
    }
}
</script>
<style scoped>
.consumer-avator {
    width: 100px;
    height: 80px;
    border-radius: 5px;
    margin-bottom: 5px;
    overflow: hidden;
}
.handle-input {
    width: 150px;
    display: inline-block;
}
.form-search {
    margin-top: 10px;
}
.pagination {
    display: flex;
    justify-content: center;
}
</style>