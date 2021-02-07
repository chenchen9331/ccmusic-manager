<template>
    <div>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{consumerCount}}</div>
                            <div>用户总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{songCount}}</div>
                            <div>歌曲总数</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{singerCount}}</div>
                            <div>歌手数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card>
                    <div class="grid-content">
                        <div class="grid-cont-center">
                            <div class="grid-num">{{songListCount}}</div>
                            <div>歌单数量</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="12">
                <h3 class="mgb20">用户性别比例</h3>
                <div style="background-color:white">
                    <ve-pie :data="consumerSex" :theme="options"></ve-pie>
                </div>
            </el-col>
            <el-col :span="12">
                <h3 class="mgb20">歌单类型分布</h3>
                <div style="background-color:white">
                    <ve-histogram :data="songStyle"></ve-histogram>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="mgb20">
            <el-col :span="12">
                <h3 class="mgb20">歌手性别比例</h3>
                <div style="background-color:white">
                    <ve-pie :data="singerSex"></ve-pie>
                </div>
            </el-col>
            <el-col :span="12">
                <h3 class="mgb20">歌手国籍分布</h3>
                <div style="background-color:white">
                    <ve-line :data="country"></ve-line>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {getCount, getCustomerSesCount, getSheetSongStyleCount, getSingerSexCount, getSingerCountryCount} from '../api/index'
export default {
    data() {
        return {
            consumerCount: 0,
            songCount: 0,
            singerCount: 0,
            songListCount: 0,
            consumerSex: {
                columns: ['性别', '总数'],
                rows: [
                    {'性别': '男', '总数': 0},
                    {'性别': '女', '总数': 0}
                ]
            },
            options: {
                color: ['#87cefa','#ffc0cb']
            },
            songStyle:{           //按歌单风格分类
                columns: ['风格','总数'],
                rows: [
                    {'风格': '华语','总数': 0},
                    {'风格': '粤语','总数': 0},
                    {'风格': '欧美','总数': 0},
                    {'风格': '日韩','总数': 0},
                    {'风格': 'BGM','总数': 0},
                    {'风格': '轻音乐','总数': 0},
                    {'风格': '乐器','总数': 0}
                ]
            },
            singerSex:{           //按性别分类的歌手数
                columns: ['性别','总数'],
                rows: [                    
                    {'性别': '男','总数': 0},
                    {'性别': '女','总数': 0},
                    {'性别': '组合','总数': 0},
                ]
            },
            country:{
                columns: ['国籍','总数'],
                rows: [
                    {'国籍': '中国','总数': 0},
                    {'国籍': '韩国','总数': 0},
                    {'国籍': '日本','总数': 0},
                    {'国籍': '美国','总数': 0},
                    {'国籍': '新加坡','总数': 0},
                    {'国籍': '意大利','总数': 0},
                    {'国籍': '其他','总数': 0}                    
                ]
            }
        }
    },
    mounted() {
        this.getCount();
        this.getCustomerSesCount();
        this.getSheetSongStyleCount();
        this.getSingerSexCount();
        this.getSingerCountryCount();
    },
    methods: {
        getCount() {
            getCount().then(res => {
                console.log(res.data);
                this.consumerCount = res.data.consumerCount;
                this.songCount = res.data.songCount;
                this.singerCount = res.data.singerCount;
                this.songListCount = res.data.songListCount;
            });
        },
        getCustomerSesCount() {
            getCustomerSesCount().then(res => {
                this.consumerSex.rows[0]['总数'] = res.data[0];
                this.consumerSex.rows[1]['总数'] = res.data[1];
            })
        },
        getSheetSongStyleCount() {
            getSheetSongStyleCount().then(res => {
                this.songStyle.rows[0]['总数'] = res.data.华语;
                this.songStyle.rows[1]['总数'] = res.data.粤语;
                this.songStyle.rows[2]['总数'] = res.data.欧美;
                this.songStyle.rows[3]['总数'] = res.data.日韩;
                this.songStyle.rows[4]['总数'] = res.data.BGM;
                this.songStyle.rows[5]['总数'] = res.data.轻音乐;
                this.songStyle.rows[6]['总数'] = res.data.乐器;
            });
        },
        getSingerSexCount() {
            getSingerSexCount().then(res => {
                this.singerSex.rows[0]['总数'] = res.data[0];
                this.singerSex.rows[1]['总数'] = res.data[1];
                this.singerSex.rows[2]['总数'] = res.data[2];
            });
        },
        getSingerCountryCount() {
            getSingerCountryCount().then(res => {
                this.country.rows[0]['总数'] = res.data.中国;
                this.country.rows[1]['总数'] = res.data.韩国;
                this.country.rows[2]['总数'] = res.data.日本;
                this.country.rows[3]['总数'] = res.data.美国;
                this.country.rows[4]['总数'] = res.data.新加坡;
                this.country.rows[5]['总数'] = res.data.意大利;
                this.country.rows[6]['总数'] = res.data.其他;
            })
        }
    }
}
</script>
<style scoped>
.grid-content {
    display: flex;
    align-items: center;
    height: 50px;
}

.grid-cont-center {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: darkgray;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}
</style>