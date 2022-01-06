<template>
  <el-container>
    <el-table border height="400px" v-el-table-infinite-scroll="load" :data="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'MyTextbook',
  data () {
    return {
      userId: this.$store.getters.getUser.id,
      tableData: []
    }
  },
  mounted () {
    const _this = this
    this.$nextTick(() => {
      const __this = _this
      _this.$axios.get('/user/data/textbooks', {
        params: {
          id: this.userId
        }
      }).then(res => {
        if (res.data.code !== 200) {
          _this.$message.error('请求失败')
          return res
        }
        __this.tableData = res.data.data
      })
    })
  },
  methods: {
    load () {
      this.tableData = this.tableData.concat(this.tableData)
    }
  }
}
</script>

<style scoped>
.user-data-infinite-scroll {
  overflow:auto;
  height: 300px;
  background-color: #f6f8f8;
}
</style>
