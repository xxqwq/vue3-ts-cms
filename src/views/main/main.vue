<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '50px' : '210px'" class="aside">
        <main-menu :is-fold="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px"
          ><main-header @fold-change="handleFoldChange"
        /></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'
//处理main-header中折叠的变化
const isCollapse = ref(false)
function handleFoldChange(isFold: boolean) {
  isCollapse.value = isFold
}
// import { LOGIN_TOKEN } from '@/global/constants'
// import { useRouter } from 'vue-router'
// import { localCache } from '@/utils/cache'
// const router = useRouter()
// function handleExitClick() {
//   //删除token
//   localCache.deleteCache(LOGIN_TOKEN)
//   //跳回登录页面
//   router.push('/login')
// }
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    transition: width 0.3s ease;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
