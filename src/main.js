import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "reset.css";
import "normalize.css";
import "./assets/style.css";

Vue.config.productionTip = false;
Vue.prototype.$store = store;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
