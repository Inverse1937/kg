<template>
  <div class="classlyDetail">
    <div class="title" v-if="$store.state.rankid.info">
      <span @click="backApi" class="back"></span>
      <span class="name">{{$store.state.rankid.info.rankname}}</span>
    </div>
    <div class="container" v-if="$store.state.rankid.info">
      <div
        @click="routerApi(songs.hash,index)"
        class="box"
        v-for="(songs,index) in $store.state.rankid.songs.list"
        :key="index"
      >
        <span>{{index+1}}</span>
        <span class="filename">{{songs.filename}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "classlyDetail",
  data: () => ({
    page: 1
  }),
  methods: {
    ...mapActions(["getDataFromRankid"]),
    formData() {
      let rankid = this.$route.query.key;
      let urlData = { rankid: rankid, page: this.page };
      this.getDataFromRankid(urlData);
    },
    routerApi(hash, i) {
      this.$router.push({ path: "/play", query: { hash: hash, index: i ,key:0} });
    },
    backApi(){
      this.$router.go(-1)
    }
  },
  mounted() {
    this.formData();
  }
};
</script>

<style lang="scss" scoped>
.classlyDetail {
  background-color: #fff;
}

.title {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 2px solid #000;
  position: fixed;
  background-color: #f9f9f9;

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

.container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 2.3rem;

  .box {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.2rem;
    font-size: 0.7rem;
    line-height: 2rem;
    background-color: #f0f0f0;
    overflow: hidden;

    .filename {
      padding-left: 0.4rem;
    }
  }
}
</style>
