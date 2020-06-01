<template>
  <div class="child2">
    <el-table :data="tableData" stripe height="500">
      <el-table-column type="index" width="auto"></el-table-column>
      <el-table-column prop="name" label="店名" width="auto"></el-table-column>
      <el-table-column prop="coord" label="坐标" width="auto"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">获取坐标</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "child2",
  data() {
    return {
      tableData: configJson.results
    };
  },
  created() {},
  methods: {
    handleEdit(index, row) {
      this.$message({
        message: "此功能尚未开放，敬请期待！",
        type: "warning"
      });
    },
    handleDelete(index, row) {
      this.$message({
        message: "此功能尚未开放，敬请期待！",
        type: "warning"
      });
    }
  }
};
</script>
