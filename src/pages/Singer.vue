<template>
    <div class="table">
        <div class="container">
            <el-form :inline="true" ref="searchList" :model="searchList" label-width="60px" class="form-search">
                <el-form-item label="姓名:">
                    <el-input v-model="searchList.name" placeholder="请输入歌手姓名" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchSinger()" size="mini">查询</el-button>
                    <el-button type="primary" size="mini" @click="visitDialog = true">添加</el-button>
                    <el-button type="danger" size="mini" @click="deleteAll()">批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table border :data="data" style="width: 100%;" size="mini" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="歌手图片" align="center" width="120">
                <template slot-scope="scope">
                    <div class="singer-img">
                        <img :src="getUrl(scope.row.pic)" style="width: 100%"/>
                    </div>
                    <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeUploadAvator" :on-success="handleAvatorSuccess">
                        <el-button size="mini">更新图片</el-button>
                    </el-upload>
                </template>
            </el-table-column>
            <el-table-column label="姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="性别" width="50px" align="center">
                <template slot-scope="scope">
                    {{changeSex(scope.row.sex)}}
                </template>
            </el-table-column>
            <el-table-column label="出生日期" align="center">
                <template slot-scope="scope">
                    {{changeBirth(scope.row.birth)}}
                </template>
            </el-table-column>
            <el-table-column label="地区" prop="location" align="center"></el-table-column>
            <el-table-column label="简介" align="center">
                <template slot-scope="scope">
                    <p style="over-flow">{{changeIntroduction(scope.row.introduction)}}</p>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="songEdit(scope.row.id,scope.row.name)">歌曲管理</el-button>
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
        <el-dialog title="添加歌手" :visible.sync="visitDialog" width="400px" center>
            <el-form :model="pojo" ref="pojo" label-width="80px">
                <el-form-item label="姓名" prop="name" size="mini">
                    <el-input v-model="pojo.name" placeholder="请输入歌手姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <el-radio-group size="mini" v-model="pojo.sex">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">组合</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth" size="mini">
                    <el-date-picker v-model="pojo.birth" placeholder="请选择出生日期" style="width: 100%"></el-date-picker>
                </el-form-item>
                <el-form-item label="区域" prop="location" size="mini">
                    <el-input v-model="pojo.location" placeholder="请输入区域"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduction" size="mini">
                    <el-input type="textarea" v-model="pojo.introduction" placeholder="请输入歌手姓名"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="addSinger()">保存</el-button>
                <el-button type="info" @click="visitDialog=false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改歌手" :visible.sync="visitEditDialog" width="400px" center>
            <el-form :model="editPojo" ref="editPojo" label-width="80px">
                <el-form-item label="姓名" prop="name" size="mini">
                    <el-input v-model="editPojo.name" placeholder="请输入歌手姓名"></el-input>
                </el-form-item>
                <el-form-item label="性别" size="mini">
                    <el-radio-group size="mini" v-model="editPojo.sex">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">组合</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth" size="mini">
                    <el-date-picker v-model="editPojo.birth" placeholder="请选择出生日期" style="width: 100%"></el-date-picker>
                </el-form-item>
                <el-form-item label="区域" prop="location" size="mini">
                    <el-input v-model="editPojo.location" placeholder="请输入区域"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="introduction" size="mini">
                    <el-input type="textarea" v-model="editPojo.introduction" placeholder="请输入歌手姓名"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="editSinger()">保存</el-button>
                <el-button type="info" @click="visitEditDialog=false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="删除歌手" :visible.sync="visitDeleDialog" width="400px" center>
            <div>是否确定执行删除操作？</div>
            <span slot="footer">
                <el-button type="danger" @click="deleSinger()">是</el-button>
                <el-button type="info" @click="visitEditDialog=false">否</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {setSinger, findAll, searchSingerByName, updateSinger, deleteSinger} from '../api/index'
import {mixin} from '../mixin'
export default {
    data() {
        return {
            visitDialog: false,
            visitEditDialog: false,
            visitDeleDialog: false,
            pojo: {
                name: '',
                sex: '',
                birth: '',
                location: '',
                introduction: ''
            },
            editPojo: {
                id: '',
                name: '',
                sex: '',
                birth: '',
                location: '',
                introduction: ''
            },
            dataList: [],
            searchList: {
                name: ''
            },
            currentPage: 1,
            pageSize: 5,
            idx: '-1',
            multipleSelection: []
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
        addSinger() {
            let d = this.pojo.birth;
            let datatime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            let params = new URLSearchParams();
            params.append("name", this.pojo.name);
            params.append("sex", this.pojo.sex);
            params.append("birth", datatime);
            params.append("pic", '/img/singerPic/hhh.jpg')
            params.append("location", this.pojo.location);
            params.append("introduction", this.pojo.introduction);
            setSinger(params).then(res => {
                if (res.code == 20000) {
                    this.notify(res.message, "success");
                } else {
                    this.notify(res.message, "error")
                }
            }).catch(err => {
                console.log(err);
            });
            this.visitDialog = false;
            this.getAll();
        },
        editData(row) {
            this.visitEditDialog = true;
            console.log(row.sex)
            this.editPojo = {
                id: row.id,
                name: row.name,
                sex: row.sex,
                birth: row.birth,
                location: row.location,
                introduction: row.introduction
            }
        },
        editSinger() {
            let d = this.editPojo.birth;
            let datatime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            let params = new URLSearchParams();
            params.append("id", this.editPojo.id);
            params.append("name", this.editPojo.name);
            params.append("sex", this.editPojo.sex);
            params.append("birth", datatime);
            params.append("location", this.editPojo.location);
            params.append("introduction", this.editPojo.introduction);
            updateSinger(params).then(res => {
                if (res.code == 20000) {
                    this.notify(res.message, "success");
                } else {
                    this.notify(res.message, "error")
                }
            }).catch(err => {
                console.log(err);
            });
            this.visitEditDialog = false;
            this.getAll();
        },
        searchSinger() {
            let params = new URLSearchParams();
            params.append("name", this.searchList.name);
            searchSingerByName(params).then(res => {
                if (res.code == 20000) {
                    this.dataList = [];
                    this.dataList = res.data;
                }
            })

        },
        getAll() {
            this.dataList = [];
            this.searchList = [];
            findAll().then(res => {
                this.searchList = res.data;
                this.dataList = res.data;
            })
        },
        uploadUrl(id) {
            return `${this.$store.state.HOST}/singer/updateAvator?id=${id}`;
        },
        handleCurrentChange(value) {
            this.currentPage = value;
        },
        deleSinger() {
            deleteSinger(this.idx).then(res => {
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
                deleteSinger(item.id).then(res => {
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
        },
        //转向歌曲管理页面
        songEdit(id,name){
            this.$router.push({path:`/Song`,query:{id,name}});
        }
    }
}
</script>
<style scoped>
.singer-img {
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