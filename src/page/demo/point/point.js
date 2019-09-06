import "../../../components/component/global";
import Vue from "vue";

import Point from "./point.vue";

new Vue({
    el: "#app",
    render: h => h(Point),
    beforeCreate () {
        Vue.prototype.bus = this;
    }
}); 