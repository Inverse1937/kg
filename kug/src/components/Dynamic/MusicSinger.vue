<template>
 <div class="musicSinger">
     <!-- 歌手分类 -->
     <div class="title">
       <span>{{titleName}}</span>
       <van-icon @click="show=!show" name="bars" />
     </div>
     <div class="classSinger" v-show="show">
     <div @click="singerclass(singer.classid,singer.classname)" class="box" v-for="singer in $store.state.singer" :key="singer.classid">
       <img :src="singer.imgurl.replace('{size}',400)" alt="">
       <span>{{singer.classname}}</span>
     </div>
     </div>
     <!-- 歌手列表 -->
     <div class="singer" v-show="!show">
       <div @click="routerApi(s.singerid)" class="container" v-for="s in $store.state.singerclass.info" :key="s.singerid">
         <img v-if="s.imgurl" :src="s.imgurl.replace('{size}',400)" alt="">
         <span>{{s.singername}}</span>
       </div>
     </div>
 </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
  name: 'MusicSinger',
  data:()=>({
    classid:0,
    show:false,
    titleName:"热门歌手"
  }),
  methods:{
    ...mapActions(["getDataFromSingerClass"]),
    singerclass(classid,name){
      if(classid){
        this.show = !this.show
        this.$store.state.classid = classid
        this.$store.state.titleName = name
        this.titleName = name
        this.getDataFromSingerClass(classid)
      }else{
        this.classid = this.$store.state.classid
        this.titleName = this.$store.state.titleName
        this.getDataFromSingerClass(this.classid)
      }
    },
    routerApi(id) {
      this.$router.push({path:'/singer',query:{key:id}})
    }
  },
  mounted(){
    this.singerclass()
  }
}
</script>

<style lang="scss" scoped>
.musicSinger{
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(0,212,255,0.5) 80%, rgba(9,9,121,0.5) 100%);
}

.classSinger{
  width: 100%;
  height: 100%;
  padding: .5rem;
  display: flex;
  flex-wrap: wrap;
  background-color: #f0f0f0;

  .box{
    width: 50%;
    height: 8.2rem;
    box-sizing: border-box;
    padding: 0 .3rem;
    font-size: .7rem;

    img{
      width: 100%;
    }
  }
}

.title{
  width: 100%;
  height: 2.048rem;
  background: rgb(0,212,255);
  background: linear-gradient(0deg, rgba(0,212,255,0.8) 0%, rgba(96,132,156,0.8) 50%, rgba(9,9,121,0.8) 100%);
  line-height: 2.048rem;
  text-align: center;
  position: fixed;
  top: 0px;
  left: 0;
  border-bottom: .1rem solid;
  z-index: 1;
  color: #fff;

  .van-icon{
    position: absolute;
    top: 0;
    right: .5rem;
    font-size: 1rem;
    line-height: 2.048rem;
  }
}

.singer{
  padding-top: 2.048rem;
  display: flex;
  flex-wrap: wrap;

  .container{
    width: 33%;
    padding: .2rem .3rem;
    box-sizing: border-box;
    font-size: .7rem;
    position: relative;

    span{
      display: block;
      display: block;
      position: absolute;
      bottom: .5rem;
      left: 0.5rem;
      color: #fff;
      width: 80%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }

    img{
      width: 100%;
    }
  }
}
</style>
