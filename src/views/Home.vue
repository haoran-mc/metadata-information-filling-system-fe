<template>
  <el-container class="home-container">
    <el-card class="home-card">
      <el-collapse v-model="activeName" accordion>
        <div v-for="(value, key) in collapseMap" :key="key">
          <el-collapse-item title="key" name="key">
            <el-table :data="value" :show-header="false" @row-click="getBatchDetail">
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
      activeName: '0',
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
