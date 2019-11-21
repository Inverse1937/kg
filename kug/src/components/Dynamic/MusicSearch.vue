<template>
<div class="musicSearch">
    <!-- 歌曲搜索 -->
    <div class="title">
      <input v-model="keyword" type="text">
      <van-icon @click="searchApi" name="search" />
    </div>
    <div class="search" v-if="$store.state.musicKey.data">
      <ul>
        <li @click="routerApi(s.songname)" v-for="(s,index) in $store.state.musicKey.data.info" :key="index">
          <van-icon @click="searchApi" name="search" />
          <span>{{s.songname}}</span>
          </li>
      </ul>
    </div>
    <!-- <div class="hot">
      <span v-for="h in $store.state.hotSearch" :key="h.sort">{{h.keyword}}</span>
    </div> -->

</div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from 'vue';
import { Icon } from 'vant';

Vue.use(Icon);
export default {
  name: 'MusicSearch',
  data:()=>({
    keyword:""
  }),
  watch:{
    keyword(){
      this.searchApi()
    }
  },
  methods:{
      ...mapActions(["getDataFromMusicKey"]),
      searchApi(){
        this.getDataFromMusicKey(this.keyword)
      },
      routerApi(keyword) {
        this.keyword = keyword
        this.$router.push({path:'/search',query:{keyword:keyword}})
      }
  }
}
</script>

<style lang="scss" scoped>
.musicSearch{
  width: 100%;
}

.title{
  width: 100%;
  height: 2.048rem;
  line-height: 2.048rem;
  background-color: #000;
  position: relative;

  input{
    width: 60%;
    height: 1.24rem;
    border: 0;
    position: absolute;
    left: 14%;
    top: 50%;
    margin-top: -.62rem;
  }

  .van-icon{
    position: absolute;
    left: 76%;
    top: 50%;
    margin-top: -.62rem;
    width: 1.24rem;
    height: 1.24rem;
    background-color: #fff;
    text-align: center;
    line-height: 1.24rem;
  }
}

.search{
  width: 100%;
  
  ul{
    display: flex;
    flex-wrap: wrap;
  }

  li{
      width: 100%;
      height: 1.789rem;
      line-height: 1.789rem;
      border-bottom: 1px solid #ccc;
      position: relative;

      .van-icon{
        width: 1.789rem;
        height: 1.789rem;
        line-height: 1.789rem;
        position: absolute;
        left: .2rem;
        top: 50%;
        margin-top: -.8945rem;
      }

      span{
        display: block;
        width: 80%;
        height: 100%;
        padding-left: 1.5rem;
        font-size: .7rem;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
}
</style>
