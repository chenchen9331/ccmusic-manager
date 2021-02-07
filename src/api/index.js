import {get, post} from './http'

// 判断管理员是否成功登录
export const login = (params) => post(`admin/login/status`, params);


// ===================== 歌手管理 ================================
// 查询全部歌手
export const findAll = () => get(`singer/selectAll`);

// 根据姓名查询歌手
export const searchSingerByName = (params) => get(`singer/selectByName`, params);

// 添加歌手
export const setSinger = (params) => post(`singer/add`, params);

// 编辑歌手
export const updateSinger = (params) => post(`singer/update`, params);

// 删除歌手
export const deleteSinger = (id) => get(`singer/delete?id=${id}`);

// ===================== 歌曲管理 ================================
// 根据歌手id查询歌曲
export const getSongBySingerId = (singerId) => get(`song/singer/detail?singerId=${singerId}`);

// 根据歌名模糊查询歌曲
export const getSongByName = (params) => get(`song/search`, params);

// 根据歌名精确查询歌曲
export const getSongBySongName = (songName) => get(`song/selectSongByName?name=${songName}`);

// 更新歌曲
export const updateSong = (params) => post(`song/update`, params);

// 删除歌曲
export const deleteSong = (id) => get(`song/delete?id=${id}`);

// 根据歌曲id查询歌曲
export const getSongBySongId = (songId) => get(`song/selectByPrimaryKey?songId=${songId}`); 

// ===================== 歌单管理 ================================
// 查询全部歌单
export const findAllSongSheet = () => get(`songsheet/selectAllSongSheet`);

// 根据title查询歌单
export const searchSongSheetByName = (params) => get(`songsheet/selectSongSheetLikeTitle`, params);

// 添加歌单
export const setSongSheet = (params) => post(`songsheet/add`, params);

// 编辑歌单
export const updateSongSheet = (params) => post(`songsheet/update`, params);

// 删除歌单
export const deleteSongSheet = (id) => get(`songsheet/delete?id=${id}`);

// ===================== 歌单-歌曲管理 ================================
// 查询该歌单下的全部歌曲
export const getSongSheetBySongListId = (songSheetId) => get(`sheetsong/selectByPrimaryKey?songSheetId=${songSheetId}`)

// 添加歌曲
export const listSongAdd = (params) => post(`sheetsong/add`, params);

// 删除歌单中的歌曲
export const deleteSheetSong = (songId, songSheetId) => get(`sheetsong/delete?songId=${songId}&&songSheetId=${songSheetId}`)

// ===================== 用户管理 ================================
// 添加用户
export const setConsumer = (params) => post(`consumer/add`, params);

// 更新用户
export const updateConsumer = (params) => post(`consumer/update`, params);

// 根据用户名模糊搜索
export const searchConsumerByName = (params) => get(`consumer/selectConsumerByUsername`, params);

// 删除用户
export const deleteConsumer = (id) => get(`consumer/delete?id=${id}`);

// 查询全部用户
export const findAllConsumer = () => get(`consumer/allConsumer`);

// ===================== 首页相关 ================================
// 获取用户、歌手、歌曲、歌单总数量
export const getCount = () => get(`indexPage/count`);

// 获取用户性别数量
export const getCustomerSesCount = () => get(`indexPage/sexCount`);

// 获取歌单风格统计
export const getSheetSongStyleCount = () => get(`indexPage/sheetStyleCount`);

// 获取歌手性别统计
export const getSingerSexCount = () => get(`indexPage/singerSex`);

// 获取歌手国籍统计
export const getSingerCountryCount = () => get(`indexPage/singerCountry`);