<template>
  <div class="singersong">
    <img class="mask" :src="$store.state.singerid.info.imgurl.replace('{size}',400)" alt />
    <div class="title">
      <span @click="backApi" class="back"></span>
      <div v-if="$store.state.singerid.info">{{$store.state.singerid.info.singername}}</div>
    </div>
    <div class="detail" v-if="$store.state.singerid.info">
      <img :src="$store.state.singerid.info.imgurl.replace('{size}',400)" alt />
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item class="jj" title="简介:">{{$store.state.singerid.info.intro}}</van-collapse-item>
        <van-collapse-item title="歌单:" name="1">
          <ul>
            <li
              @click="routerApi(song.hash,index)"
              v-for="(song,index) in $store.state.singerid.songs.list"
              :key="index"
            >{{song.filename}}</li>
          </ul>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from "vue";
import { Collapse, CollapseItem } from "vant";

Vue.use(Collapse).use(CollapseItem);
export default {
  name: "singerSong",
  data: () => ({
    singerid: 0,
    activeNames: "1"
  }),
  methods: {
    ...mapActions(["getDataFromSingerId"]),
    SingerId() {
      this.singerid = this.$route.query.key;
      this.getDataFromSingerId(this.singerid);
    },
    backApi() {
      this.$router.go(-1);
    },
    routerApi(hash, i) {
      this.$router.push({ path: "/play", query: { hash: hash, index: i ,key:1} });
    }
  },
  mounted() {
    this.SingerId();
  }
};
</script>

<style lang="scss" scoped>
.singersong{
  position: absolute;
  width: 100%;
  height: 100%;

  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    filter:blur(2rem);
    z-index: -1;
  }
}
.title {
  width: 100%;
  height: 2.2rem;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,0.40129555240064774) 0%, rgba(227,227,227,0.7010154403558299) 85%, rgba(163,163,163,0.7990546560421043) 100%);
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 2px solid #000;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  .back {
    position: absolute;
    top: 50%;
    left: 0.7rem;
    margin-top: -0.25rem;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    transform: rotate(135deg);
  }
}

.detail {
  width: 100%;
  height: 8.04rem;
  margin-top: 2.18rem;

  img{
    width: 50%;
    padding: .5rem;
  }
}

.van-collapse-item__content {

  li {
    height: 1.7rem;
    line-height: 2rem;
    font-size: 0.6rem;
    color: lemonchiffon;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
