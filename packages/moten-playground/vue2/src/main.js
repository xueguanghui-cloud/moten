import Vue from "vue";
import App from "./App.vue";
import moten from "@moten/ui/vue2";
import "@moten/ui/vue2/style";

Vue.config.productionTip = false;
import "@moten/ui/vue2/style";

Vue.use(moten, { platform: "user" });
const app = new Vue({
  render: (h) => h(App),
});

app.$mount("#app");
