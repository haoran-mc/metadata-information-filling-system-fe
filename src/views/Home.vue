<template>
  <el-container class="home-container">
    <el-card>
      <el-collapse>
        <el-collapse-item title="一致性 Consistency" name="1">
        </el-collapse-item>
        <el-collapse-item title="反馈 Feedback" name="2">
          <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      tableData: [
        { yaer: '2021' },
        { yaer: '2021' },
        { yaer: '2021' },
        { yaer: '2021' }
      ]
    }
  },
  components: {},
  methods: {
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

.el-card {
  width: 80%;
  margin: 50px auto;
}
</style>
