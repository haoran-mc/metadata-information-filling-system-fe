<template>
  <el-container class="home-container">
    <el-card class="home-card">
      <el-collapse v-model="activeName" accordion>
        <div v-for="(value, key) in collapseMap" :key="key">
          <el-collapse-item title="key">
            <el-table
              :data="value"
              :show-header="false"
              @row-click="getBatchDetail"
              style="cursor: pointer">
              <el-table-column prop="batch_name"></el-table-column>
            </el-table>
          </el-collapse-item>
        </div>
      </el-collapse>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      // 折叠面板手风琴效果
      activeName: '',
      // 所有的批次
      batches: [
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
      ],
      // 将批次按年分
      collapseMap: this.$store.getters.getCollapseMap
    }
  },
  created () {
    // this.getBatches()
  },
  methods: {
    getBatches () {
      const _this = this
      this.$axios.get('/metadatas').then(res => {
        // _this.batches = res.data.data

        _this.collapseMap = {}

        // 按年份分
        const __this = _this
        for (const item of _this.batches) {
          if (item.year in __this.collapseMap) {
            // 每个值都是一个数组
            const arr = __this.collapseMap[item.year]
            arr.push(item)
            __this.collapseMap[item.year] = arr
          } else {
            const arr = []
            arr.push(item)
            __this.collapseMap[item.year] = arr
          }
        }
        _this.$store.commit('SET_COLLAPSEMAP', __this.collapseMap)

        for (const i in _this.collapseMap) {
          console.log(i)
          console.log(_this.collapseMap[i])
        }
      })
    },
    getBatchDetail (row) {
      this.$store.commit('SET_YEAR', row.year)
      this.$store.commit('SET_BATCHIDX', row.batch_idx)
      this.$store.commit('SET_BATCHNAME', row.batch_name)
      this.$router.push('/data')

      /*
      const _this = this
      this.$axios.get('/batches', {
        params: {
          year: 2017,
          batch_idx: row.batch_idx,
          category: 'project',
          page_num: 1,
          page_size: 10
        }
      }).then(res => {
        console.log(res)
        if (res.data.code !== 200) {
          _this.$message.error('获取数据失败')
          return res
        }
        _this.$router.push('/data')
      })
      */
    }
  }
}
</script>

<style>
.home-container {
  width: 1150px;
  margin: 0 auto;
  height: 750px;
  background-color: #F2F2F2;
}

.home-card {
  width: 80%;
  margin: 50px auto;
}
</style>
