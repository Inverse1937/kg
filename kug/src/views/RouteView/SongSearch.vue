<template>
  <div class="classlyDetail">
    <div class="title">
      <span @click="backApi" class="back"></span>
      <span class="name">{{titName}}</span>
    </div>
    <div class="container" v-if="$store.state.musicKey.data">
      <div
        @click="routerApi(songs.hash,index)"
        class="box"
        v-for="(songs,index) in $store.state.musicKey.data.info"
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
    page: 1,
    titName:""
  }),
  methods: {
    ...mapActions(["getDataFromMusicKey"]),
    formData() {
      let keyword = this.$route.query.keyword;
      this.titName = keyword
      this.getDataFromMusicKey(keyword);
    },
    routerApi(hash, i) {
      this.$router.push({ path: "/play", query: { hash: hash, index: i ,key:2} });
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
  background-color: #f5f5f5;
}

.title {
  width: 100%;
  height: 2.2rem;
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 2px solid #000;
  position: fixed;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,0.9) 0%, rgba(236,199,95,0.9) 100%);

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

  .name{
    display: block;
    width: 70%;
    height: 100%;
    font-size: .8rem;
    position: absolute;
    left: 50%;
    margin-left: -35%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,0.1) 0%, rgba(236,199,95,0.3) 66%, rgba(242,205,163,0.2) 100%);
    overflow: hidden;

    .filename {
      padding-left: 0.4rem;
    }
  }
}
</style>
