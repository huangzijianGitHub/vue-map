<template>
  <div class="mapTab">
    <el-container>
      <el-header style="height: 1px;font-size:18px;font-family:Microsoft YaHei">GD路径测量</el-header>
      <el-divider></el-divider>
      <el-main>
        <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-model="activeName">
          <!-- <el-tab-pane name="距离测量">
            <span slot="label"><i class="el-icon-share"></i> 距离测量</span>
            <child1 v-if="isChild1"></child1>
          </el-tab-pane>-->
          <el-tab-pane label="距离测量" name="距离测量">
            <child1 v-if="isChild1"></child1>
          </el-tab-pane>
          <!-- <el-tab-pane name="地址管理">
            <span slot="label"><i class="el-icon-s-home"></i> 地址管理</span>
            <child1 v-if="isChild2"></child1>
          </el-tab-pane>-->
          <el-tab-pane label="地址管理" name="地址管理">
            <child2 v-if="isChild2"></child2>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import distances from "./tabChild/distances";
import address from "./tabChild/address";
export default {
  name: "mapTab",
  components: {
    child1: distances,
    child2: address
  },
  data() {
    return {
      activeName: "距离测量",
      tabPosition: "top",
      isChild1: true,
      isChild2: false
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.name == "距离测量") {
        this.isChild1 = true;
        this.isChild2 = false;
      } else if (tab.name == "地址管理") {
        this.isChild1 = false;
        this.isChild2 = true;
      }
    }
  }
};
</script>
