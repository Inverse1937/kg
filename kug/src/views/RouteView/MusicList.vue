<template>
  <div class="musicList">
    <img class="mask" :src="$store.state.listmusic.info.list.imgurl.replace('{size}',400)" alt />
    <div class="title">
      <span @click="backApi" class="back"></span>
      <span class="gd">歌单</span>
    </div>
    <div class="center">
      <div class="l">
        <img :src="$store.state.listmusic.info.list.imgurl.replace('{size}',400)" alt />
      </div>
      <div class="r">
        <span class="specialName">{{$store.state.listmusic.info.list.specialname}}</span>
        <span class="user_avatar">
          <img :src="$store.state.listmusic.info.list.user_avatar" alt />
        </span>
        <span class="nickName">{{$store.state.listmusic.info.list.nickname}}</span>
        <span class="publishTime">时间:{{$store.state.listmusic.info.list.publishtime}}</span>
      </div>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item title="介绍:">{{$store.state.listmusic.info.list.intro}}</van-collapse-item>
        <van-collapse-item title="列表:" name="0"><div class="bottom">
      <div
        @click="routerApi(m.hash,index)"
        class="box"
        v-for="(m,index) in $store.state.listmusic.list.list.info"
        :key="index"
      >
        <span>{{m.filename}}</span>
      </div>
    </div></van-collapse-item>
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
  name: "musicList",
  data: () => ({
    activeNames: "0",
  }),
  methods: {
    ...mapActions(["getDataFromPlistMusic"]),
    fromData() {
      let ListId = this.$route.query.key;
      this.getDataFromPlistMusic(ListId);
    },
    routerApi(hash, i) {
      this.$router.push({
        path: "/play",
        query: { hash: hash, index: i, key: 3 }
      });
    },
    backApi() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.fromData();
  }
};
</script>

<style lang="scss" scoped>
.musicList {
  width: 100%;
  height: 100%;
  
  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    filter:blur(100px);
    z-index: -1;
  }
}

.title {
  width: 100%;
  height: 2.2rem;
  line-height: 2rem;
  text-align: left;
  border-bottom: 2px solid #000;
  position: fixed;
  background: rgb(131,58,180);
  background: linear-gradient(90deg, rgba(131,58,180,0.49933476808692223) 0%, rgba(253,29,29,0.49933476808692223) 50%, rgba(252,176,69,0.49653364763874297) 100%);

  .gd {
    padding-left: 1.5rem;
    font-size: 0.8rem;
  }

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

.center {
  padding-top: 2.2rem;
  width: 100%;
  height: 9.35rem;
  display: flex;
  flex-wrap: wrap;

  .l {
    width: 5.45rem;
    height: 5.45rem;
    padding: 0.5rem;

    img {
      width: 100%;
    }
  }
}

.r {
  width: 65.9%;
  font-size: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  color: #fff;

  span {
    display: block;
    height: 1rem;
    line-height: 1rem;
  }
}

.specialName {
  width: 100%;
  margin-top: .7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user_avatar {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
}

.nickName {
  width: 70%;
  padding-left: .5rem;
  font-size: .5rem;
}

.publishTime {
    font-size: .4rem;
}

.van-hairline--top-bottom {
  width: 100%;
}

.bottom{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}

.box{
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: .7rem;
    border-bottom: 1px solid #f0f0f0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span{
        padding-left: .5rem;
    }
}
</style>
<style>
.van-cell{
    background-color: transparent;
    color: #fff;
    font-size: .8rem;
}
[class*=van-]:focus{
    background-color: transparent;
}
.van-cell__right-icon{
    color: #fff;
    font-size: .8rem;
}
.van-collapse-item__content{
    background-color: rgba(0,0,0,0.4);
    font-size: .6rem;
    color: #fff;
}
</style>
