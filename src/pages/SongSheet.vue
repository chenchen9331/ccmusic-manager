<template>
    <div class="table">
        <div class="container">
            <el-form :inline="true" ref="searchList" :model="searchList" label-width="60px" class="form-search">
                <el-form-item label="歌单名称:">
                    <el-input v-model="searchList.title" placeholder="请输入标题名称" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchSongSheet()" size="mini">查询</el-button>
                    <el-button type="primary" size="mini" @click="visitDialog = true">添加</el-button>
                    <el-button type="danger" size="mini" @click="deleteAll()">批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table border :data="data" style="width: 100%;" size="mini" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="歌单图片" align="center" width="120">
                <template slot-scope="scope">
                    <div class="songsheet-img">
                        <img :src="getUrl(scope.row.pic)" style="width: 100%"/>
                    </div>
                    <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeUploadAvator" :on-success="handleAvatorSuccess">
                        <el-button size="mini">更新图片</el-button>
                    </el-upload>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="120" align="center"></el-table-column>     
            <el-table-column label="简介">
                <template slot-scope="scope">
                    <p style="height:100px;overflow:hidden">{{scope.row.introduction}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="style" label="风格" width="120" align="center"></el-table-column> 
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" @click="songEdit(scope.row.id)">歌曲管理</el-button>
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
        <el-dialog title="添加歌单" :visible.sync="visitDialog" width="400px" center>
            <el-form :model="pojo" ref="pojo" label-width="80px">
                <el-form-item prop="title" label="标题" size="mini">
                    <el-input v-model="pojo.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item prop="introduction" label="简介" size="mini">
                    <el-input v-model="pojo.introduction" placeholder="简介" type="textarea"></el-input>
                </el-form-item>
                <el-form-item prop="style" label="风格" size="mini">
                    <el-input v-model="pojo.style" placeholder="风格"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="addSongSheet()">保存</el-button>
                <el-button type="info" @click="visitDialog=false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="修改歌单" :visible.sync="visitEditDialog" width="400px" center>
            <el-form :model="editPojo" ref="editPojo" label-width="80px">
                <el-form-item prop="title" label="标题" size="mini">
                    <el-input v-model="editPojo.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item prop="introduction" label="简介" size="mini">
                    <el-input v-model="editPojo.introduction" placeholder="简介" type="textarea"></el-input>
                </el-form-item>    
                <el-form-item prop="style" label="风格" size="mini">
                    <el-input v-model="editPojo.style" placeholder="风格"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="editSongSheet()">保存</el-button>
                <el-button type="info" @click="visitEditDialog=false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="删除歌单" :visible.sync="visitDeleDialog" width="400px" center>
            <div>是否确定执行删除操作？</div>
            <span slot="footer">
                <el-button type="danger" @click="deleSongSheet()">是</el-button>
                <el-button type="info" @click="visitEditDialog=false">否</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {setSongSheet, findAllSongSheet, searchSongSheetByName, updateSongSheet, deleteSongSheet} from '../api/index'
import {mixin} from '../mixin'
export default {
    data() {
        return {
            visitDialog: false,
            visitEditDialog: false,
            visitDeleDialog: false,
            pojo: {
                title: '',
                introduction: '',
                style: ''
            },
            editPojo: {
                id: '',
                title: '',
                introduction: '',
                style: ''
            },
            dataList: [],
            searchList: {
                title: ''
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
        addSongSheet() {
            let params = new URLSearchParams();
            params.append("title", this.pojo.title);
            params.append("introduction", this.pojo.introduction);
            params.append("style", this.pojo.style);
            params.append("pic", '/img/songSheetPic/tubiao.jpg');
            setSongSheet(params).then(res => {
                if (res.code == 20000) {
                    this.notify(res.message, "success");
                } else {
                    this.notify(res.message, "error")
                }
            }).catch(err => {
                console.log(err);
            });
            this.pojo = [];
            this.visitDialog = false;
            this.getAll();
        },
        editData(row) {
            this.visitEditDialog = true;
            this.editPojo = {
                id: row.id,
                title: row.title,
                introduction: row.introduction,
                style: row.style
            }
        },
        editSongSheet() {
            let params = new URLSearchParams();
            params.append("id", this.editPojo.id);
            params.append("title", this.editPojo.title);
            params.append("introduction", this.editPojo.introduction);
            params.append("style", this.editPojo.style);
            updateSongSheet(params).then(res => {
                if (res.code == 20000) {
                    this.notify(res.message, "success");
                    this.getAll();
                } else {
                    this.notify(res.message, "error")
                }
            }).catch(err => {
                console.log(err);
            });
            this.visitEditDialog = false;
        },
        searchSongSheet() {
            let params = new URLSearchParams();
            params.append("title", this.searchList.title);
            searchSongSheetByName(params).then(res => {
                if (res.code == 20000) {
                    this.dataList = [];
                    this.dataList = res.data;
                }
            })

        },
        getAll() {
            this.dataList = [];
            this.searchList = [];
            findAllSongSheet().then(res => {
                this.searchList = res.data;
                this.dataList = res.data;
            })
        },
        // 更新图片
        uploadUrl(id) {
            return `${this.$store.state.HOST}/songsheet/updateSongSheetPic?id=${id}`;
        },
        handleCurrentChange(value) {
            this.currentPage = value;
        },
        deleSongSheet() {
            deleteSongSheet(this.idx).then(res => {
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
                deleteSongSheet(item.id).then(res => {
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
            this.$router.push({path:`/SheetSong`,query:{id}});
        }
    }
}
</script>
<style scoped>
.songsheet-img {
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