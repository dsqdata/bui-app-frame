<template>
  <div class="ship sdemo">
    <div class="mui-content-contain">
      <div class="amap-page-container" v-show="showMap">

        <div class="bui-float-div boatSearch">
          <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" style="line-height: 40px;"></a> -->
          <div style="width: 48px">
            <Avatar :size="41"><img class="mui-media-object mui-pull-left head-img" :src="user.img" @click="toMyPage">
            </Avatar>
          </div>
          <div style="width:100%;">
            <!-- <Input placeholder="请输入船号、呼号、MMSI或IMO" class="bui-float-div-input" v-model="inputVal" @focus="focusDiv" @blur="blurDiv"/> -->
            <!-- <input placeholder="船名、类型、MMSI或IMO" class="bui-float-div-input" v-model="inputVal" @focus="onfocus"> -->
            <input placeholder="船名、类型、MMSI或IMO" class="bui-float-div-input" v-model="inputVal" @focus="onfocus">
            <x-button mini @click.native="searchButton" v-if="buttonShow" class="boatBtn"></x-button>
          </div>
        </div>

        <div v-if="showRes" class="searchHei"  >
          <List>
            <ListItem arrow="horizontal" multipleLine v-for="(item, index) in items" :key="index"
                      @click="toDetailsPage(item)">
              {{item.name}}
              <img v-if="item.aisNationalityId!==''" class="mui-media-object" style="width: auto; height: 15PX; margin-bottom: 3px;" :src=aisNationalityId(item.aisNationalityId)>
              <ListItemBrief>IMO: {{item.imo}} MMSI: {{item.mmsi}} 类型: {{item.aisShiptypeId}}</ListItemBrief>
            </ListItem>
            <ListItem arrow="horizontal" @click="delHistory()" v-if="isdel" class="cList">
              <div class="cTxt">清除历史<span class="cArr"></span></div>
            </ListItem>
          </List>
        </div>

        <div id="map" style="height: 1000px"></div>

        <div id="popup" class="ol-popup">
          <a href="#" id="popup-closer" class="ol-popup-closer"></a>
          <div id="popup-content"></div>
        </div>
        <!-- <div style="position:absolute;right:200px;top:0;">
          <button id="addBtn" @click="addBtn">添加船舶</button>
          <button id="addOwnBtn" @click="addOwnBtn">添加红色</button>
          <button id="selectBtn">选中船舶</button>
          <button id="disBtn">全球分布图</button>
        </div> -->
        <remote-script src="assets/myships/myships.e9bc762a.js"></remote-script>
      </div>
    </div>
    <toast v-model="showPositionValue" width="10.6e" type="text" :time="2000" is-show-mask text="数据走失，正在寻找！" :position="position">数据走失，正在寻找！</toast>
  </div>

</template>
<script>
  import {openPageHtml5} from "@/utils/html5plus";
  import net from "@/utils/html5net";
  import '@/components/importJs'

  export default {
    components: {
    },
    data() {
      return {
        focusval:false,
        inputVal:"",
        timeout:null,
        showRes: false,
        showBottom: false,
        showMap: true,
        position:'top',
        isdel:false,
        showPositionValue:false,
        buttonShow:false,
        user: {img: require('@/assets/imgs/user_no.png')},
        items: [
          {
            aisNationalityId:"",
            aisShiptypeId:"",
            callsign:"",
            imo:"",
            mmsi:"",
            name:"",
            shipId:""
          }
        ],
        divStyle: {
          height: (document.documentElement.clientHeight) + 'px'
        },
        segSimplest: ['地图', '列表'],
        zoom: 3,
        center: [116.39, 39.9],
      }
    },
    created(){

    },
    mounted() {
      mui.init()
      var that =this
      // if (localStorage.getItem('ACCESSTOKEN')) {
      //   this.user.img = require('@/assets/user_img.png')
      // }else{
      //   this.user.img = require('@/assets/user_no.png')
      // }
      net.post(`myinfo/infomation`, {username: localStorage.getItem ('USERNAME')}, function (data) {
        console.log(JSON.stringify(data))
        if(data.img){
         that.user.img = data.photo
         localStorage.setItem("img",data.photo)
        }else{
          localStorage.setItem("img",require('@/assets/imgs/user_img.png'))
        }

      },function(data){
        that.user.img = require('@/assets/imgs/user_no.png')
      })

      // setTimeout(() => {
      //   this.init();
      // }, 500);

    },
    created(){

    },
    methods: {
      randomNum(minNum,maxNum){
        switch(arguments.length){
          case 1:
            return Math.random()*minNum+1;
            break;
          case 2:
            return Math.random()*(maxNum-minNum+1)+minNum;
            break;
          default:
            return 0;
            break;
        }
      },
      init(){
        map.showOwn({
          i: "m1",
          n: "我的船舶",
          o: this.randomNum(121, 122),
          a: this.randomNum(29, 30),
          d: this.randomNum(0, 360),
          h: 0,
          s: this.randomNum(1, 15),
          t: 1558862689,
          w: 50,
          l: 120
        });
      },
      addOwnBtn() {
        map.showOwn({
          i: "m1",
          n: "我的船舶",
          o: this.randomNum(121, 122),
          a: this.randomNum(29, 30),
          d: this.randomNum(0, 360),
          h: 0,
          s: this.randomNum(1, 15),
          t: 1558862689,
          w: 50,
          l: 120
        });
      },
      addBtn(){
          map.clearSelect();
          console.log("添加船舶");
          let ships = [
            {i:"1",n:"测试船舶1",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"2",n:"测试船舶2",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"3",n:"测试船舶3",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"4",n:"测试船舶4",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"5",n:"测试船舶5",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"6",n:"测试船舶6",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"7",n:"测试船舶7",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"8",n:"测试船舶8",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)},
            {i:"9",n:"测试船舶9",o:this.randomNum(121,125),a:this.randomNum(29,30),d:this.randomNum(0,360),h:0,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)}];
          for(let j = 0;j<500;j++){
            ships.push({i:"a"+j,n:"测试船舶a"+j,o:this.randomNum(-179,179),a:this.randomNum(-89,89),d:this.randomNum(0,360),h:null,s:this.randomNum(1,15),t:1558862689,w:this.randomNum(10,100),l:this.randomNum(50,500)})
          }
          map.showShips(ships);
      },
      toDetailsPage(item) {
        this.focusval = false
        this.showRes = false
        openPageHtml5('ship.details', {info: item})
      },
      delHistory(){
        let userInfo = JSON.parse(localStorage.getItem("USERINFO"))
        let that = this
        net.post(`\seach\\delhistory`,{id:userInfo.id},function(data){
          console.log(data)
          if(data.code==='1'){
            that.items = []
            that.showRes = false
            that.isdel = false
          }else{
            that.showPositionValue=true
            that.isdel = false
          }
        },function(data){
          that.showPositionValue=true
          that.isdel = false
        })
      },
      aisNationalityId:function(val){
        return require('@/assets/imgs/'+ val + ".png" )
      },
      onfocus:function(){
        this.focusval = true
        this.buttonShow = true
        let token = localStorage.getItem("ACCESSTOKEN");
        if (token === null||token==='') {//需要登录
          mui.openWindow({
            url: "./ship.login.html",
            id: "ship.login"
          })
        }else{

          let userInfo = JSON.parse(localStorage.getItem("USERINFO"))
          let that = this
          if(this.inputVal!==''){
            net.post(`\seach\\${this.inputVal}`,{},function(data){
              console.log(data)
              if(data.code==='1'){
                that.items = data.data
                that.showRes = true
                that.isdel = false
              }else{
                that.showPositionValue=true
                that.isdel = false
              }
            })
          }else if(this.inputVal===''&&this.focusval){
            net.post(`\seach\\history`,{username:userInfo.id},function(data){
              console.log(data)
              if(data.code==='1'){
                that.items = data.data
                that.showRes = true
                that.isdel = true
              }else if(data.code==='-1'){

              }
            })
          }
        }
      },
      onBlur(){
        this.items = []
        this.showRes = false
        this.isdel = false
      },
      toMyPage() {
        let token = localStorage.getItem("ACCESSTOKEN");
        if (token === null||token==='') {//需要登录
          mui.openWindow({
            url: "./login.login.html",
            id: "login.login"
          })
        }else{
          openPageHtml5('home.fourth')
        }
        //openPageHtml5('home.fourth')
        // mui.openWindow({
        //   url: "./home.fourth.html",
        //   id: "home.fourth"
        // })
      },
      searchButton(){
        this.focusval = false
        this.buttonShow = false
        this.showRes = false
        this.inputVal = ""
      }
    },
    watch:{
      inputVal:function(curVal, oldVal) {
        let token = localStorage.getItem("ACCESSTOKEN");
        if (token === null||token==='') {//需要登录
          mui.openWindow({
            url: "./login.login.html",
            id: "login.login"
          })
        }
        if(curVal===''&&this.focusval){
          console.log(this.focusval)
          let userInfo = JSON.parse(localStorage.getItem("USERINFO"))
          let that = this
          net.post(`\seach\\history`,{username:userInfo.id},function(data){
            console.log(data)
            if(data.code==='1'){
              that.items = data.data
              that.showRes = true
              that.isdel = true
            }else if(data.code==='-1'){

            }
          })
        }else if(curVal!==''){
          // 实现input连续输入，只发一次请求
          let that = this
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            net.post(`\seach\\${curVal}`,{},function(data){
              console.log(data)
              if(data.code==='1'){
                that.items = data.data
                that.showRes = true
                that.isdel = false
              }else{
                mui.openWindow({
                  url: "./login.login.html",
                  id: "login.login"
                })
              }
            })
          }, 300);
        }
      }
    }
  }
</script>


<style lang="less">
  @import '../../style/common';
</style>

