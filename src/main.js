import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import element from "./element";
import Vcharts from "./charts";
// import VCharts from "v-charts";
import Router from "vue-router";
import routes from "./router";
import echarts from "echarts";
import base from "@/assets/styles/base.scss";
import mockjs from "mockjs";
import moment from "moment";

Vue.config.productionTip = false;
Vue.use(element);
Vue.use(Router);
Vue.use(base);
Vue.use(Vcharts);
Vue.use(mockjs);
Vue.use(moment);
Vue.use(echarts);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const router = new Router({
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
