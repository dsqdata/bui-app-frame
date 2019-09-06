import Vue from "vue";

import Views from "./views.vue";
import router from "../../../router/router";
import { getOs } from "../../../utils/util";

// 通过路由钩子函数判断做出你响应的业务需求
router.beforeEach((to, from, next) => {
    
    // 判断路由有无
    if(!to.matched || to.matched.length===0){
        next("404");
        return false;
    }
    // 判断浏览器阻止其后面行为
    if( getOs() == "MSIE7" || getOs() == "MSIE6"){
        alert("浏览器支持");
    }else{
        // 一般用于 登录 权限
        const role = "getToken";
        if(!role && to.path !== "/login"){
            next("/login");
        }else{
            next();
        }
    }
});

new Vue({
    router,
    el: "#app",
    render: h => h(Views)
}); 