import "../../../style/less.less";
import Vue from "vue";
import Home from "./home.vue";

//状态管理
import state from "../../../store/index";

new Vue({
    el: "#app",
    state,
    render: h => h(Home)
});