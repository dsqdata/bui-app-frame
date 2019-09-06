<template>
    <div class="loginBg">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"><span style="font-size: 19px;">登录</span></a>
        </header>
        <div class="mui-content mui-content-contain">
            <div style="text-align: center;padding: 20px 0px">
                <img class="head-img mui-action-preview qs-image-item" style="width: 40px;border-radius: 60px;"
                     src="@/assets/imgs/logo_baochuan.png" alt="">
                <h1 class="ttl01">欢迎登录宝船网</h1>
            </div>

            <div id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label @click="phoneLocal">
                        <span style="font-size: 15px;">+{{phonePrefix}}</span>
                        <span class="mui-icon mui-icon-arrowdown" style="font-size: 14px;"></span>
                    </label>
                    <input id='username' name='username' type="text" class="mui-input-clear" v-model="username"
                           placeholder="请输入手机号"/>
                </div>
                <div class="mui-input-row">
                    <label>
                        登录密码
                    </label>
                    <input id='password' name='password' type="password" class="mui-input-password" v-model="password"
                           placeholder="请输入密码">
                </div>
                <div class="mui-content-padded">
                    <button @click="login" class="mui-btn mui-btn-block mui-btn-primary oneBtn">登录</button>
                    <p class="loginTxt01">
                        <a @click="openWebview('reg')" id="reg">用户注册</a>
                        <a @click="openWebview('forget')" id="forget">忘记密码?</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import {
        fire,
        processImmersed,
        openPageHtml5
    } from "@/utils/html5plus";
    import net from "@/utils/html5net";
    import CryptoJS from 'crypto-js'

    export default {
        components: {},
        created() {
            var that = this;
            function plusReady() {
                if (plus.storage.getItem("USERNAME")) {
                    that.username = plus.storage.getItem("USERNAME")
                }
                if (plus.storage.getItem("PHONEPREFIX")) {
                    that.phonePrefix = plus.storage.getItem("PHONEPREFIX")
                }
            }
            window.addEventListener('customEvent', function (event) {
                console.log(JSON.stringify(event.detail))
                var detail = event.detail.phoneCode;
                that.phonePrefix = detail
            });

            if (window.plus) {
                plusReady();
            } else {
                document.addEventListener("plusready", plusReady, false);
            }
        },
        data() {
            return {
                position: 'top',
                showPositionValue: false,
                text: '',
                phonePrefix: 86,
                auths: {},
                username: '',
                password: ''
            };
        },

        computed: {},
        methods: {

            openWebview(key) {
                switch (key) {
                    case "reg":
                        mui.openWindow({url: "./ship.registe.html", id: "ship.registe"})
                        break;
                    case "forget":
                        mui.openWindow({url: "./ship.lookpassword.html", id: "ship.lookpassword"})
                        break;
                }
            },
            login() {
                if (!this.username) {
                    if (window.plus) {
                        plus.nativeUI.toast("请输入用户名")
                    } else {
                        mui.alert('请输入用户名');
                    }
                    return false;
                }

                if (!this.password) {
                    if (window.plus) {
                        plus.nativeUI.toast("请输入密码")
                    } else {
                        mui.alert('请输入密码');
                    }
                    return false;
                }

                localStorage.setItem("password", this.password)
                var srcs = CryptoJS.enc.Utf8.parse(this.password)
                var key = CryptoJS.enc.Utf8.parse('7890123456qazwsx')
                var encrypted = CryptoJS.AES.encrypt(srcs, key, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                })
                var newPass = encrypted.toString();
                let that = this
                // alert(newPass)
                console.log(newPass)
                net.post(`api/login`, {username: this.username, password: newPass}, function (data) {
                    // alert(newPass)
                    localStorage.setItem("USERNAME", data.userInfo.username);
                    localStorage.setItem('ACCESSTOKEN', data.token);
                    localStorage.setItem('USERINFO', JSON.stringify(data.userInfo));

                    if (window.plus) {
                        plus.storage.setItem("USERNAME", data.userInfo.username);//单独存储用户名，下次登录直接取出，注销不删除
                        plus.storage.setItem("PASSWORD", that.password)
                        plus.storage.setItem("PHONEPREFIX", that.phonePrefix)
                        //****进入首页****
                        mui.init({
                            preloadPages: [{
                                url: "./ship.search.html",
                                id: "ship.search",
                                styles: {}, //窗口参数
                                extras: {}, //自定义扩展参数
                                subpages: [{}, {}] //预加载页面的子页面
                            }]
                        });
                        mui.openWindow({
                            url: "./ship.search.html",
                            // url: "./home.fourth.html",
                            id: "ship.search"
                        })

                    } else {
                        mui.openWindow({
                            url: "./ship.search.html",
                            id: "ship.search"
                        })
                    }
                }, function (data) {
                    if (data.status === 400) {
                        that.text = '账号或密码错误！'
                        that.showPositionValue = true
                    }
                })
            },
            phoneLocal() {
                openPageHtml5("ship.phoneLocalhost", {info: "login.login"})
            }

        },
        mounted() {
            mui.init()
            processImmersed();

            var that = this;

            if (localStorage.getItem("phoneLocal") !== undefined && localStorage.getItem("phoneLocal") !== null) {
                this.phonePrefix = localStorage.getItem("phoneLocal")
            }

        }
    };
</script>

<style lang="less">
    @import '../../style/common';
    @import './login';
</style>
