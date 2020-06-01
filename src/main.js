// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// import iView from "iview";
// import "iview/dist/styles/iview.css"; // 使用 CSS
import axios from "axios";
import Mock from "@/mock/index";
import Element from "element-ui"; //饿了吗样式
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
// 为了要在其他组件中使用，将axios改为vue的原型属性。
Vue.prototype.$axios = axios;
//Vue.prototype.$router=router
Vue.use(Element);

/* eslint-disable no-new */
// 如果process.env.Mock == true执行startMock()
if (process.env.MOCK) {
  Mock.startMock();
}
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
