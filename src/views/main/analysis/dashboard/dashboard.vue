<template>
  <div class="dashboard">
    <!-- 顶部数字的数据展示 -->
    <el-row :gutter="10">
      <template v-for="item in 4" :key="item">
        <el-col :span="6"><count-card /> </el-col>
      </template>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CountCard from './c-cpns/count-card/count-card.vue'
</script>

<style lang="less" scoped>
.dashboard {
}
</style>
