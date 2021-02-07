<template>
    <div class="table">
        <div class="crumbs">
            <i class="el-icon-tickets"></i>
            歌曲信息
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
            <el-table-column label="歌曲图片" align="center" width="120">
                <template slot-scope="scope">
                    <div class="song-img">
                        <img :src="getUrl(scope.row.pic)" style="width: 100%"/>
                    </div>
                    <div class="play" @click="setSongUrl(scope.row.url,scope.row.name)">
                        <div v-if="toggle == scope.row.name">
                            <svg class="icon">
                                <use xlink:href="#icon-zanting"></use>
                            </svg>
                        </div>
                        <div v-if="toggle != scope.row.name">
                            <svg class="icon">
                                <use xlink:href="#icon-bofanganniu"></use>
                            </svg>
                        </div>
                    </div>
                    <el-upload :action="uploadUrl(scope.row.id)" :before-upload="beforeUploadAvator" :on-success="handleAvatorSuccess">
                        <el-button size="mini">更新图片</el-button>
                    </el-upload>
                </template>
            </el-table-column>
            <el-table-column label="歌名" prop="name" align="center" width="120"></el-table-column>
            <el-table-column label="专辑" prop="introduction" align="center" width="120"></el-table-column>
            <el-table-column label="歌词" align="center" prop="lyric">
                <template slot-scope="scope">
                    <ul style="height: 100px; overflow-y: scroll;">
                    <li v-for="(item, index) in parseLyric(scope.row.lyric)" :key="index">
                        {{item}}
                    </li>
                </ul>
                </template>
            </el-table-column>
            <el-table-column label="资源更新" align="center" width="100">
                <template slot-scope="scope">
                    <el-upload :action="uploadSongUrl(scope.row.id)" :before-upload="beforeSongUpload" 
                        :on-success="handleSongSuccess">
                        <el-button size="mini">更新歌曲</el-button>
                    </el-upload>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center" width="200">
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
        <el-dialog title="添加歌曲" :visible.sync="visitDialog" width="400px" center>
            <el-form :model="form" ref="form" label-width="80px" action="" id="tf">
                <div>
                    <label>歌名</label>
                    <el-input type="text" name="name"></el-input>
                </div>
                <div>
                    <label>专辑</label>
                    <el-input type="text" name="introduction"></el-input>
                </div>
                <div>
                    <label>歌词</label>
                    <el-input type="textarea" name="lyric"></el-input>
                </div>
                <div>
                    <label>歌曲上传</label>
                    <input type="file" name="file">
                </div>
            </el-form>
            <span slot="footer">
                <el-button size="mini" @click="centerDialogVisible = false">取消</el-button>
                <el-button size="mini" @click="addSong">确定</el-button>                
            </span>
        </el-dialog>
        <el-dialog title="修改歌曲" :visible.sync="visitEditDialog" width="400px" center>
            <el-form :model="editPojo" ref="editPojo" label-width="80px">
                <el-form-item prop="name" label="歌手-歌名" size="mini">
                    <el-input v-model="editPojo.name" placeholder="歌手-歌名"></el-input>
                </el-form-item>                
                <el-form-item prop="introduction" label="专辑" size="mini">
                    <el-input v-model="editPojo.introduction" placeholder="专辑"></el-input>
                </el-form-item> 
                <el-form-item prop="lyric" label="歌词" size="mini">
                    <el-input v-model="editPojo.lyric" placeholder="歌词" type="textarea"></el-input>
                </el-form-item> 
                
            </el-form>
            <span slot="footer">
                <el-button size="mini" @click="editVisible = false">取消</el-button>
                <el-button size="mini" @click="editSong">确定</el-button>                
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
import {mapGetters} from 'vuex'
import '@/assets/js/iconfont.js'
import {getSongBySingerId, getSongByName, updateSong, deleteSong} from '../api/index'
export default {
    data() {
        return {
            singerId: '',
            singerName: '',
            visitDialog: false,
            visitEditDialog: false,
            visitDeleDialog: false,
            form: {
                name: '',
                singerName: '',                
                introduction: '',
                lyric: ''
            },
            editPojo: {
                id: '',
                name: '',
                introduction: '',
                lyric: ''
            },
            dataList: [],
            searchList: {
                name: ''
            },
            currentPage: 1,
            pageSize: 5,
            idx: '-1',
            multipleSelection: [],
            toggle: false           //播放器的图标状态
            //select_word: ''
        }
    },
    created() {
        this.singerId = this.$route.query.id;
        this.singerName = this.$route.query.name;
        this.getAll();
    },
    destroyed() {
        this.$store.commit('setIsPlay',false);    // 切换其他页面暂停歌曲
    },
    computed: {
         ...mapGetters([
            'isPlay'
        ]),
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
        addSong() {
            let _this = this;
            var form = new FormData(document.getElementById('tf'));
            form.append('singerId',this.singerId);
            form.set('name',this.singerName+'-'+form.get('name'));
            if(!form.get('lyric')){
                form.set('lyric','[00:00:00]暂无歌词');
            }
            var req = new XMLHttpRequest();
            req.onreadystatechange = function(){
                //req.readyState == 4 获取到返回的完整数据
                //req.status == 200 和后台正常交互完成
                if(req.readyState == 4 && req.status == 200){
                    let res = JSON.parse(req.response);
                    if(res.code){
                        _this.getAll();
                        _this.form = {};
                        _this.notify("保存成功",'success');
                    }else{
                         _this.notify('保存失败','error');
                    }
                }
            }
            req.open('post',`${_this.$store.state.HOST}/song/add`,false);
            req.send(form);
            _this.visitDialog = false;
        },
        editData(row) {
            this.visitEditDialog = true;
            console.log(row.sex)
            this.editPojo = {
                id: row.id,
                name: row.name,
                introduction: row.introduction,
                lyric: row.lyric
            }
        },
        editSong() {
            let params = new URLSearchParams();
            params.append("id", this.editPojo.id);
            params.append("name", this.editPojo.name);
            params.append("introduction", this.editPojo.introduction);
            params.append("lyric", this.editPojo.lyric);

            updateSong(params).then(res => {
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
            getSongBySingerId(this.singerId).then(res => {
                console.log(res.data)
                this.searchList = res.data;
                this.dataList = res.data;
            })
        },
        uploadUrl(id) {
            return `${this.$store.state.HOST}/song/updateAvator?id=${id}`;
        },
        handleCurrentChange(value) {
            this.currentPage = value;
        },
        deleSong() {
            deleteSong(this.idx).then(res => {
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
        },
        // 解析歌词
        parseLyric(text) {
            let lines = text.split("\n");
            let partten = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
            let result = [];
            for (let item of lines) {
                let value = item.replace(partten, '');
                result.push(value);
            }
            return result;
        },
         //上传歌曲之前的校验
        beforeSongUpload(file){
            var testMsg = file.name.substring(file.name.lastIndexOf('.') + 1);
            if(testMsg!='mp3'){
                this.$message({
                    message: '上传文件只能是mp3格式',
                    type: 'error'
                });
                return false;
            }
            return true;
        },
        //上传歌曲成功之后要做的工作
        handleSongSuccess(res){
            let _this = this;
            if(res.code == 20000){
                _this.getData();
                _this.$notify({
                    title: '上传成功',
                    type: 'success'
                });
            }else{
                _this.$notify({
                    title: '上传失败',
                    type: 'error'
                });
            }
        },
        //更新歌曲url
        uploadSongUrl(id){
            return `${this.$store.state.HOST}/song/updateSongUrl?id=${id}`
        },
         //切换播放歌曲
        setSongUrl(url,name) {
            this.toggle = name;
            this.$store.commit('setUrl',this.$store.state.HOST + url);
            if(this.isPlay){
                this.$store.commit('setIsPlay',false);
            }else{
                this.$store.commit('setIsPlay',true);
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