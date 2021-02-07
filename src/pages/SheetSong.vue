<template>
    <div class="table">
        <div class="crumbs">
            <i class="el-icon-tickets"></i>
            歌单-歌曲信息
        </div>
        <div class="container">
            <el-form :inline="true" ref="searchList" :model="searchList" label-width="60px" class="form-search">
                <el-form-item label="歌曲名称:">
                    <el-input v-model="searchList.name" placeholder="请输入歌曲名称" size="mini"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="searchSong()" size="mini">查询</el-button>
                    <el-button type="primary" size="mini" @click="visitDialog = true">添加</el-button>
                    <el-button type="danger" size="mini" @click="deleteAll()">批量删除</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table border :data="data" style="width: 100%;" size="mini" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column label="歌手-歌名" prop="name" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
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
        <el-dialog title="添加歌曲" :visible.sync="visitDialog" width="400px" center>
            <el-form :model="form" ref="form" label-width="80px" action="" id="tf">
                <el-form-item prop="singerName" label="歌手名称" size="mini">
                    <el-input v-model="form.singerName" placeholder="歌手名称"></el-input>
                </el-form-item>
                <el-form-item prop="songName" label="歌曲名称" size="mini">
                    <el-input v-model="form.songName" placeholder="歌曲名称"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button size="mini" @click="visitDialog = false">取消</el-button>
                <el-button size="mini" @click="getSongId()">确定</el-button>                
            </span>
        </el-dialog>
        <el-dialog title="删除歌曲" :visible.sync="visitDeleDialog" width="400px" center>
            <div>是否确定执行删除操作？</div>
            <span slot="footer">
                <el-button type="danger" @click="deleSong()">是</el-button>
                <el-button type="info" @click="visitEditDialog=false">否</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {mixin} from '../mixin'
import {getSongSheetBySongListId, getSongBySongName, getSongBySongId, listSongAdd, deleteSheetSong} from '../api/index'
export default {
    data() {
        return {
            visitDialog: false,
            visitDeleDialog: false,
            form: {
                singerName: '',
                songName: ''
            },
            dataList: [],
            searchList: {
                name: ''
            },
            currentPage: 1,
            pageSize: 5,
            idx: '-1',
            multipleSelection: [],
            //select_word: ''
            songListId: ''    // 歌单id
        }
    },
    created() {
        this.songListId = this.$route.query.id;
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
        // 获取歌曲id
        getSongId() {
            let _this = this;
            var songOfName = _this.form.singerName + "-" + _this.form.songName;
            getSongBySongName(songOfName).then(res => {
                    debugger;
                    console.log(res.data.id);
                    _this.addSong(res.data.id);
            })
        },
        addSong(songId) {
            let _this = this;
            let params = new URLSearchParams();
            params.append('songId',songId);
            params.append('songSheetId',this.songListId);

            listSongAdd(params)
            .then(res => {
                if(res.code == 20000){
                    this.getAll();
                    this.notify("添加成功","success");
                }else{
                    this.notify("添加失败","error");
                }
            })
            .catch(err => {
                console.log(err);
            });
            _this.visitDialog = false;
        },
        searchSong() {
            let params = new URLSearchParams();
            params.append("name", this.searchList.name);
            getSongByName(params).then(res => {
                if (res.code == 20000) {
                    this.dataList = [];
                    this.dataList = res.data;
                }
            })

        },
        getAll() {
            this.dataList = [];
            this.searchList = [];
            debugger;
            getSongSheetBySongListId(this.songListId).then(res => {
                for(let item of res.data) {
                    this.getSong(item.songId)
                }
            })
        },
        // 获取歌曲
        getSong(songId) {
            getSongBySongId(songId).then(res => {
                this.searchList.push(res.data);
                this.dataList.push(res.data);
            }).catch(err => {
                console.log(err);
            });
        },
        uploadUrl(id) {
            return `${this.$store.state.HOST}/song/updateAvator?id=${id}`;
        },
        handleCurrentChange(value) {
            this.currentPage = value;
        },
        deleSong() {
            deleteSheetSong(this.idx, this.songListId).then(res => {
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
                deleteSong(item.id).then(res => {
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
.song-img {
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
.crumbs i {
    margin-left: 20px;
}
.play {
    position: absolute;
    z-index: 100;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    top: 18px;
    left: 15px;
}

.icon {
    width: 2em;
    height: 2em;
    color: white;
    fill: currentColor;
    overflow: hidden;
}
</style>