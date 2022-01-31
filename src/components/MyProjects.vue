<template>
  <el-container>
    <el-table border height="400px" v-el-table-infinite-scroll="load" :data="tableData">
      <el-table-column prop="name" label="名称"></el-table-column>
    </el-table>
  </el-container>
</template>

<script>
export default {
  name: 'MyProject',
  data () {
    return {
      userId: this.$store.getters.getUser.id,
      tableData: []
    }
  },
  mounted () {
    const _this = this
    this.$nextTick(() => {
      if (this.userId === null) {
        this.$message.error('无法获取个人信息，请重新登录！')
        this.$store.commit('REMOVE_INFO')
        this.$store.commit('increment')
      }
      this.$axios.get('/user/data/projects', {
        params: {
          id: this.userId
        }
      }).then(res => {
        if (res.data.code === 200) {
          _this.tableData = res.data.data
        } else {
          _this.$message.error('请求失败')
        }
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
</style>
