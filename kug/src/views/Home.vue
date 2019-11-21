<template>
  <div class="home">
    <van-tabbar v-model="active" inactive-color="#fff">
      <van-tabbar-item @click="$store.state.active = 0" icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item @click="$store.state.active = 1" icon="service-o">歌单</van-tabbar-item>
      <van-tabbar-item @click="$store.state.active = 2" icon="friends-o">歌手</van-tabbar-item>
      <van-tabbar-item @click="$store.state.active = 3" icon="search">搜索</van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>
<script>
import MusicHome from "../components/Dynamic/MusicHome"
import MusicPlaylist from "../components/Dynamic/MusicPlaylist"
import MusicSearch from "../components/Dynamic/MusicSearch"
import MusicSinger from "../components/Dynamic/MusicSinger"

import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";

Vue.use(Tabbar).use(TabbarItem);

export default {
  name: "home",
  data:()=>({
    active:0
  }),
  computed:{
    currentTabComponent(){
      let componentsName
      switch(this.active){
        case 0:
          componentsName = MusicHome;
          break;
        case 1:
          componentsName = MusicPlaylist;
          break;
        case 2:
          componentsName = MusicSinger;
          break;
        case 3:
          componentsName = MusicSearch;
          break;
      }
      return componentsName
    }
  },
  methods: {
    activeApi(){
      this.active = this.$store.state.active
    }
  },
  mounted(){
    this.activeApi()
  },
  components: {
    MusicHome,
    MusicPlaylist,
    MusicSearch,
    MusicSinger
  }
};
</script>
<style lang="scss" scoped>
.home{
  padding-bottom: 1.9rem;
}
.van-tabbar{
  height: 2rem;
  background-color:#ed424b;
}
</style>
