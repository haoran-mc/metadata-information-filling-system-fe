<template>
  <el-container class='data-container'>
    <!-- 数据页头部 -->
    <el-header>
      <DataHeader></DataHeader>
    </el-header>
    <el-container>
      <!-- 数据页侧边栏 -->
      <el-aside>
        <DataAside></DataAside>
      </el-aside>
      <!-- 数据页主体，显示数据表格 -->
      <el-container>
        <DataMain></DataMain>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import DataHeader from '../components/DataHeader'
import DataAside from '../components/DataAside'
import DataMain from '../components/DataMain'

export default {
  name: 'Data',
  components: { DataHeader, DataMain, DataAside }
}
</script>

<style>
.data-container {
  width: 1150px;
  margin: 0 auto;
  height: 750px;
  padding-left: 80px;
  padding-right: 80px;
  background-color: #F2F2F2;
}
</style>
