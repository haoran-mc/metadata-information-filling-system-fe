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
.data-bread {
  margin-top: 30px;
  margin-left: 20px;
}
.data-main {
  height: 550px;
  margin-left: 10px;
  margin-top: 18px;
  width: 710px;
}
.data-footer {
  text-align: center;
}
</style>
