import Vue from "vue";
import App from "./App.vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import "./assets/main.css";

new Vue({
  render: (h) => h(App),
}).$mount("#app");
