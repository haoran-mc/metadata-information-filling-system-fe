<template>
  <el-container>
    <el-card class="user-data-card">
      <div class="user-data-header">
        <div class="font-layout">
          <el-link style="line-height: 40px;" @click='setCategory("project")' :underline="false">按项目填报</el-link>
          <span style="padding: 0 10px 0 10px; line-height: 40px;">|</span>
          <el-link style="line-height: 40px;" @click='setCategory("textbook")' :underline="false">按教材填报</el-link>
        </div>
      </div>
      <el-table
        border
        height="400px"
        v-el-table-infinite-scroll="load"
        :data="tableData">
        <el-table-column prop="year" label="日期" width="180"> </el-table-column>
        <el-table-column prop="batch_idx" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="batch_name" label="地址"> </el-table-column>
      </el-table>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'UserData',
  data () {
    return {
      radio1: '上海',
      tableData: [
        { id: 1, year: 2017, batch_idx: 1, batch_name: '2017年第一轮本科评估', end_time: '2017-05-08T00:00:00.000+00:00' },
        { id: 2, year: 2017, batch_idx: 2, batch_name: '2017年第二轮本科评估', end_time: '2017-08-21T00:00:00.000+00:00' },
        { id: 3, year: 2017, batch_idx: 3, batch_name: '2017年一流本科评估', end_time: '2017-09-10T00:00:00.000+00:00' },
        { id: 4, year: 2017, batch_idx: 4, batch_name: '2017年第三轮本科评估', end_time: '2017-11-02T00:00:00.000+00:00' },
        { id: 5, year: 2017, batch_idx: 5, batch_name: '2017年第四轮本科评估', end_time: '2017-11-23T00:00:00.000+00:00' },
        { id: 6, year: 2018, batch_idx: 1, batch_name: '2018年第一轮本科评估', end_time: '2018-05-08T00:00:00.000+00:00' },
        { id: 7, year: 2018, batch_idx: 2, batch_name: '2018年第二轮本科评估', end_time: '2018-08-21T00:00:00.000+00:00' },
        { id: 8, year: 2018, batch_idx: 3, batch_name: '2018年第三轮本科评估', end_time: '2018-11-02T00:00:00.000+00:00' },
        { id: 9, year: 2018, batch_idx: 4, batch_name: '2018年第四轮本科评估', end_time: '2018-11-23T00:00:00.000+00:00' },
        { id: 10, year: 2019, batch_idx: 1, batch_name: '2019年第一轮本科评估', end_time: '2019-05-08T00:00:00.000+00:00' },
        { id: 11, year: 2019, batch_idx: 2, batch_name: '2019年第二轮本科评估', end_time: '2019-08-21T00:00:00.000+00:00' },
        { id: 12, year: 2019, batch_idx: 3, batch_name: '2019年一流本科评估', end_time: '2019-09-10T00:00:00.000+00:00' },
        { id: 13, year: 2020, batch_idx: 1, batch_name: '2020年第一轮本科评估', end_time: '2020-05-08T00:00:00.000+00:00' },
        { id: 14, year: 2020, batch_idx: 2, batch_name: '2020年第二轮本科评估', end_time: '2020-08-21T00:00:00.000+00:00' },
        { id: 15, year: 2020, batch_idx: 3, batch_name: '2020年一流本科评估', end_time: '2020-09-10T00:00:00.000+00:00' },
        { id: 16, year: 2020, batch_idx: 1, batch_name: '2020年第一轮本科评估', end_time: '2021-05-08T00:00:00.000+00:00' }
      ]
    }
  },
  methods: {
    load () {
      // this.$message.success('加载下一页')
      this.tableData = this.tableData.concat(this.tableData)
    }
  }
}
</script>

<style scoped>
.user-data-card {
  width: 100%;
}

.user-data-header {
  height: 40px;
  width: 100%;
  background-color: #f2f8fe;
  border-radius: 3px;
}

.font-layout {
  line-height: 40px;
  margin-left: 20px;
}

.user-data-infinite-scroll {
  overflow:auto;
  height: 300px;
  background-color: #f6f8f8;
}
</style>
