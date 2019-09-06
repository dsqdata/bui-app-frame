import Vue from "vue";
import News from "./news.vue";
//状态管理
import store from "../../../store/index";

new Vue({
    el: "#app",
    store,
    render: h => h(News)
}); 