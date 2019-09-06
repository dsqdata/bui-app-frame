import Vue from "vue";
import vant from "vant";
import "vant/lib/index.css";
import "@/utils/global5plus";
import App from "./phoneLocalhost.vue";

Vue.use(vant)

new Vue({
    el: "#app",
    render: h => h(App)
});
