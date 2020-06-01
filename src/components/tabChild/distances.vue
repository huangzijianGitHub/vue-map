<template>
  <div class="child">
    <el-container>
      <el-main>
        <el-form ref="formInline" style="text-align:left;" :model="formInline" :rules="ruleInline" inline>
          <el-form-item>
            <el-select v-model="formInline.region" placeholder="交通方式">
              <el-option label="驾车" value="1"></el-option>
              <el-option label="步行" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="city">
            <el-input type="text" v-model="formInline.city" placeholder="请输入所在城市"></el-input>
          </el-form-item>
          <el-form-item prop="address">
            <el-input type="text" style="width:130%" v-model="formInline.address" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item></el-form-item>
          <el-form-item style="margin-left: 10%">
            <el-button style="border-radius: 4px;border-bottom: 1px solid #dcdfe6;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);" type="primary" @click="onSubmit('formInline')">计算</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-share" @click="getCoord" circle title="坐标拾取"></el-button>
          </el-form-item>
          <el-divider v-if="formInline.region == '1'" content-position="left">驾车{{ formInline.address }}路径计算结果：</el-divider>
          <el-divider v-if="formInline.region == '3'" content-position="left">步行{{ formInline.address }}路径计算结果：</el-divider>
          <div v-for="(item, index) in iconList" :key="index">
            <span>{{ index + 1 }}：到达 {{ item.name }}</span>
            <span>距离{{ item.distance }}公里</span>
            <span>耗时{{ item.duration }}分钟。</span>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import apiMp from "@/axios/request";
export default {
  data() {
    return {
      confJson: configJson.results,
      key: "your key",
      iconList: [],
      formInline: {
        region: "1",
        city: "",
        address: ""
      },
      ruleInline: {
        city: [
          {
            required: true,
            message: "Please fill in the city",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Please fill in the address.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  name: "child1",
  mounted() { },
  methods: {
    getCoord: function () {
      window.open("https://lbs.amap.com/console/show/picker");
    },
    //获取测量路径
    getUserInfo(location) {
      let localList = "";
      //获取店面坐标路径拼接
      if (null != this.confJson.length) {
        for (let i = 0; i < this.confJson.length; i++) {
          if (localList == null || localList == "") {
            localList = this.confJson[i]["coord"];
          } else {
            localList = localList + "|" + this.confJson[i]["coord"];
          }
        }
      }
      if (localList == null || localList == "" || localList == "undefined") {
        this.$message.error("配置的店面坐标拼接失败，请确认配置！");
        return;
      }
      apiMp
        .egGet(
          "https://restapi.amap.com/v3/distance?origins=" +
          localList +
          "&destination=" +
          location +
          "&output=json&key=" +
          this.key +
          "&type=" +
          this.formInline.region
        )
        .then(res => {
          let state = res.status;
          if (state == "1") {
            let arry = res.results;
            if (arry.length == this.confJson.length) {
              for (let i = 0; i < arry.length; i++) {
                let mm = arry[i]["duration"];
                let dm = arry[i]["distance"];
                //秒转为分钟
                arry[i]["duration"] = mm / 60;
                //转为km
                arry[i]["distance"] = dm / 1000;
                //增加店名
                arry[i]["name"] = this.confJson[i]["name"];
              }
              //排序
              this.iconList = arry.sort(this.arraySort("duration"));
              // console.log(JSON.stringify(this.iconList));
            } else {
              this.$Message.error("有店面无法计算路径，请修改店面配置！");
            }
          } else {
            this.$Message.error("计算路径失败，请重新计算！");
          }
        })
        .catch(err => {
          this.$message.error("计算路径失败，请重新计算！");
        });
    },
    //获取坐标
    getLocalInfo() {
      apiMp
        .egGet(
          "https://restapi.amap.com/v3/geocode/geo?key=" +
          this.key +
          "&city=" +
          this.formInline.city +
          "&output=json&address=" +
          this.formInline.address
        )
        .then(res => {
          let location = res.geocodes[0].location;
          if (location != null) {
            this.getUserInfo(location);
          } else {
            this.$Message.error("获取坐标失败，请将核对地址!");
          }
        })
        .catch(err => {
          this.$message.error("获取坐标失败，请将核对地址!");
        });
    },
    //计算提交验证不为空
    onSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.getLocalInfo();
        } else {
          this.$Message.error("表单校验失败!");
        }
      });
    },
    //排序函数
    arraySort(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    }
  }
};
</script>
