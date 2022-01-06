<template>
  <el-container class="home-container">
    <el-card class="home-card">
      <el-collapse v-model="activeName" accordion>
        <div v-for="(value, key) in collapseMap" :key="key">
          <el-collapse-item>
            <template slot="title">
              <span>{{ key }} 年填报数据</span>
            </template>
            <el-table
              :data="value"
              :show-header="false"
              @row-click="getBatchDetail"
              style="cursor: pointer">
              <el-table-column prop="name"></el-table-column>
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
      collapseMap: this.$store.getters.getCollapseMap,
      // sp 表 { id, year, batchIdx, projectId, textbookId }
      sp: {
        id: 0,
        year: 0,
        batchIdx: 0,
        projectId: 0,
        textbookId: 0
      },
      spProject: {},
      spTextbook: {}
    }
  },
  created () {
    this.getBatches()
  },
  methods: {
    getBatches () {
      const _this = this
      this.$axios.get('/batches').then(res => {
        if (res.data.code === 200) {
          console.log(res)
          _this.batches = res.data.data

          _this.collapseMap = {}

          // 按年份分
          for (const item of _this.batches) {
            if (item.year in _this.collapseMap) {
              // 每个值都是一个数组
              const arr = _this.collapseMap[item.year]
              arr.push(item)
              _this.collapseMap[item.year] = arr
            } else {
              const arr = []
              arr.push(item)
              _this.collapseMap[item.year] = arr
            }
          }
          _this.$store.commit('SET_COLLAPSEMAP', _this.collapseMap)
          // for (const i in _this.collapseMap) {
          //   console.log(i)
          //   console.log(_this.collapseMap[i])
          // }
        } else {
          _this.$message.error('获取信息失败')
        }
      })
    },
    getBatchDetail (row) {
      const _this = this
      this.$axios.get('/sp', {
        params: {
          year: row.year,
          batch_idx: row.batchIdx
        }
      }).then(res => {
        console.log(res)
        console.log(row)
        if (res.data.code === 200) {
          _this.sp = res.data.data.sp
          _this.spProject = res.data.data.project
          _this.spTextbook = res.data.data.textbook
          // _this.spProject.preparer = 1
          // _this.spTextbook.preparer = 1
          this.$store.commit('SET_HAS_PROJECT', _this.sp.projectId) // 根据 sp 判断是否勾选 project
          this.$store.commit('SET_HAS_TEXTBOOK', _this.sp.textbookId) // 根据 sp 判断是否勾选 textbook
          this.$store.commit('SET_YEAR', row.year) // 年份
          this.$store.commit('SET_CATEGORY', 'project') // 类别默认是项目
          this.$store.commit('SET_BATCHIDX', row.batchIdx) // 第几批次
          this.$store.commit('SET_BATCHNAME', row.name) // 批次名
          this.$store.commit('SET_SPPROJECT', _this.spProject) // 特殊项目数据
          this.$store.commit('SET_SPTEXTBOOK', _this.spTextbook) // 特殊项目数据
          this.$router.push('/data')
        } else {
          _this.$message.error('获取数据失败')
          return res
        }
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
