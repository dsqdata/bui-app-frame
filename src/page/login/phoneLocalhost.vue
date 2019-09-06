<template>
    <div class="phone">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"><span
                    style="font-size: 19px;">选择归属地</span></a>
        </header>
        <div class="mui-content-contain">
            <van-index-bar>
                <van-index-anchor index="#">热门</van-index-anchor>
                <van-cell title="中国" @click="onClice({'phone_code':'86'})"/>
                <van-index-anchor index="A">A</van-index-anchor>
                <div v-for="(item,index) in list.A" :key="'A' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="B">B</van-index-anchor>
                <div v-for="(item,index) in list.B" :key="'B' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="C">C</van-index-anchor>
                <div v-for="(item,index) in list.C" :key="'C' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="D">D</van-index-anchor>
                <div v-for="(item,index) in list.D" :key="'D' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="E">E</van-index-anchor>
                <div v-for="(item,index) in list.E" :key="'E' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="F">F</van-index-anchor>
                <div v-for="(item,index) in list.F" :key="'F' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="G">G</van-index-anchor>
                <div v-for="(item,index) in list.G" :key="'G' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="H">H</van-index-anchor>
                <div v-for="(item,index) in list.H" :key="'H' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="I">I</van-index-anchor>
                <div v-for="(item,index) in list.I" :key="'I' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="J">J</van-index-anchor>
                <div v-for="(item,index) in list.J" :key="'J' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="K">K</van-index-anchor>
                <div v-for="(item,index) in list.K" :key="'K' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="L">L</van-index-anchor>
                <div v-for="(item,index) in list.L" :key="'L' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="M">M</van-index-anchor>
                <div v-for="(item,index) in list.M" :key="'M' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="N">N</van-index-anchor>
                <div v-for="(item,index) in list.N" :key="'N' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="O">O</van-index-anchor>
                <div v-for="(item,index) in list.O" :key="'O' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="P">P</van-index-anchor>
                <div v-for="(item,index) in list.P" :key="'P' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="Q">Q</van-index-anchor>
                <div v-for="(item,index) in list.Q" :key="'Q' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="R">R</van-index-anchor>
                <div v-for="(item,index) in list.R" :key="'R' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="S">S</van-index-anchor>
                <div v-for="(item,index) in list.S" :key="'S' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="T">T</van-index-anchor>
                <div v-for="(item,index) in list.T" :key="'T' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="U">U</van-index-anchor>
                <div v-for="(item,index) in list.U" :key="'U' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="V">V</van-index-anchor>
                <div v-for="(item,index) in list.V" :key="'V' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="W">W</van-index-anchor>
                <div v-for="(item,index) in list.W" :key="'W' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="X">X</van-index-anchor>
                <div v-for="(item,index) in list.X" :key="'X' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="Y">Y</van-index-anchor>
                <div v-for="(item,index) in list.Y" :key="'Y' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
                <van-index-anchor index="Z">Z</van-index-anchor>
                <div v-for="(item,index) in list.Z" :key="'Z' + index">
                    <van-cell :title="item.country_ename" @click="onClice(item)"/>
                </div>
            </van-index-bar>
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

    import {IndexBar, IndexAnchor} from 'vant';

    export default {
        data() {
            return {
                list: {}
            }
        },
        mounted() {
            mui.init()
            processImmersed();
            const self = this
            net.post('myinfo\\phoneLocal', {}, function (data) {
                console.log(data)
                self.list = data
            }, function (data) {
            })
        },
        methods: {
            onClice(item) {
                var target = plus.webview.currentWebview().opener();
                fire(target, 'customEvent', {phoneCode: item.phone_code})
                mui.back()
            }
        }
    }
</script>

<style lang="less">
    @import '../../style/common';
</style>
