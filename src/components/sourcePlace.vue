<template>
  <el-form ref="formInline" :model="formInline" :rules="ruleInline" inline>
    <el-form-item prop="userName">
      <el-input type="text" v-model="formInline.userName" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="formInline.password" placeholder="Password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit('formInline')">Signin</el-button>
      <!-- <Button type="primary" @click="handleSubmit('formInline')">Signin</Button> -->
    </el-form-item>
  </el-form>
</template>
<script>
import api from "@/axios/request";
export default {
  data() {
    return {
      formInline: {
        userName: "",
        password: ""
      },
      ruleInline: {
        userName: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          api.egPost("/rest/vue/login", this.formInline).then(res => {
            console.info("后台返回的数据:", res.results);
            console.info("后台返回的数据duration:", res.results[0].duration);
          });
          // this.$axios({
          //   url: "/rest/vue/login", //请求的地址
          //   method: "post", //请求的方式
          //   data: this.formInline //请求的表单数据
          // })
          //   .then(res => {
          //     console.info("后台返回的数据:", res.data.results);
          //     console.info(
          //       "后台返回的数据duration:",
          //       res.data.results[0].duration
          //     );
          //     //get方式
          //     // this.$router.push({ name: "hello", query: { id: "1" } });
          //     //post方式
          //     // this.$router.push({ name: "hello", params: { id: "1" } });
          //     //跳新页面
          //     //                     let link= this.$router.resolve({name:'hello',params: {id:'1'}});
          //     //                     window.open(link.href,'_blank')
          //   })
          //   .catch(err => {
          //     console.info("报错的信息", err.response.message);
          //   });
        } else {
          this.$Message.error("表单校验失败!");
        }
      });
    }
  }
};
</script>
