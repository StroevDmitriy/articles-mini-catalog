import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "reset.css";
import "normalize.css";
import "./assets/style.css";

Vue.config.productionTip = false;

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
