<template>
  <el-container class="home-container">
    <el-card class="home-card">
      <el-collapse v-model="activeName" accordion>
        <div v-for="(value, key) in collapseMap" :key="key">
          <el-collapse-item>
            <template slot="title">
              <span>{{key}} 年填报数据</span>
            </template>
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
      batches: [],
      // 将批次按年分
      collapseMap: this.$store.getters.getCollapseMap
    }
  },
  created () {
    this.getBatches()
  },
  methods: {
    getBatches () {
      const _this = this
      this.$axios.get('/metadatas').then(res => {
        _this.batches = res.data.data

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
      const _this = this
      this.$axios.get('/sp', {
        params: {
          year: row.year,
          batch_idx: row.batch_idx
        }
      }).then(res => {
        if (res.data.code !== 200) {
          _this.$message.error('获取数据失败')
          return res
        }
        // res.data.data.project_id
        // res.data.data.textbook_id
        this.$store.commit('SET_HAS_PROJECT', res.data.data.project_id)
        this.$store.commit('SET_HAS_TEXTBOOK', res.data.data.textbook_id)
        this.$store.commit('SET_YEAR', row.year)
        this.$store.commit('SET_CATEGORY', 'project')
        this.$store.commit('SET_BATCHIDX', row.batch_idx)
        this.$store.commit('SET_BATCHNAME', row.batch_name)
        this.$router.push('/data')
      })
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
