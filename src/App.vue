<template>
  <div id="app">
    <el-header height="75px" class="app-header">
      <Header :key="$store.state.key"></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import Header from './components/AllHeader.vue'

export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style>
.app-header {
  box-shadow: 0 0 10px #c3c3c3;
}
</style>
