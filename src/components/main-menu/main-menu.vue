<template>
  <div class="main-menu">
    <div class="logo">
      <img src="@/assets/img/logo.svg" class="img" />
      <h2 class="title" v-show="!isFold">后台管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        active-text-color="#fff"
        text-color="#b7bdc3"
        background-color="#001529"
      >
        <!-- 遍历整个菜单 -->
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>
                {{ item.name }}
              </span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- <el-sub-menu>
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item>核心技术</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>部门管理</el-menu-item>
          <el-menu-item>菜单管理</el-menu-item>
          <el-menu-item>角色管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><ShoppingBag /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item>商品类别</el-menu-item>
          <el-menu-item>商品信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item>你的故事</el-menu-item>
          <el-menu-item>故事列表</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { firstMenu, mapPathToMenus } from '@/utils/map-menus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
//定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
//监听item点击
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}
//elmenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenus(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
