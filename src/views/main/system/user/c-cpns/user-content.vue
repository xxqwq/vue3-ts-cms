<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <ul>
        <li v-for="item in usersList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
const systemStore = useSystemStore()
//发送action，请求usersList的数据
systemStore.postUsersListAction()
//获取usersList数据进行展示
const { usersList } = storeToRefs(systemStore)
</script>

<style lang="less" scoped>
.content {
  padding: 15px;
  background-color: #fff;
  margin-top: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}
</style>

