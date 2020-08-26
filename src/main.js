import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import element from "./element";
import Router from "vue-router";
import routes from "./router";
import base from "@/assets/styles/base.scss";

Vue.config.productionTip = false;
Vue.use(element);
Vue.use(Router);
Vue.use(base);

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
