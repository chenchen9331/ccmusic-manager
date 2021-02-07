<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menue"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#334256"
            active-text-color="#20a0ff"
            text-color="#ffffff"
            router
        >
          <template v-for="item in items">
              <template>
                  <el-menu-item :index="item.index" :key="item.index">
                      <i :class="item.icon"></i>
                      {{item.title}}
                  </el-menu-item>
              </template>
          </template>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-document',
                    index: 'Index',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-document',
                    index: 'Consumer',
                    title: '用户管理'
                },
                {
                    icon: 'el-icon-document',
                    index: 'Singer',
                    title: '歌手管理'
                },
                {
                    icon: 'el-icon-document',
                    index: 'SongSheet',
                    title: '歌单管理'
                }
            ]
        }
    },
    computed: {
        onRoutes() {
            var s = this.$route.path.replace('/', '');
            return s;
        }
    }
}
</script>
<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        top: 70px;
        left: 0px;
        bottom: 0px;
        box-sizing: border-box;
        background-color: #334256;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar {
        width: 0px;
    }
    .sidebar-el-menue {
        width: 150px;
    }
</style>