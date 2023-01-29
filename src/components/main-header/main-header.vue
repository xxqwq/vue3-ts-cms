<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="27px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
        <!-- <Expand /> -->
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <div class="info"><header-info /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
//内部自定义事件
const emit = defineEmits(['foldChange'])
//记录状态
const isFold = ref(false)
function handleMenuIconClick() {
  // 内部改变状态
  isFold.value = !isFold.value
  //将时间和状态传递个父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
