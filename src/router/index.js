import Vue from "vue";
import Router from "vue-router";
import SourcePlace from "@/components/sourcePlace";
import index from "@/components/index";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index
    }
  ]

  // ,mode: "history" //去掉路径中的#号 app打包时不能用
});
