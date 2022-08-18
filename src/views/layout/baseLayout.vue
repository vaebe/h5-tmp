<template>
  <div class="baseLayout">
    <router-view />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" name="task">任务</van-tabbar-item>
      <van-tabbar-item icon="search" name="intelligence">情报</van-tabbar-item>
      <van-tabbar-item icon="friends-o" name="mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const active = ref('task')
</script>

<style lang="scss" scoped>
.baseLayout {
  width: 360px;
  height: 100vh;
}
</style>
