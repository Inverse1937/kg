<template>
  <div class="musichome">
    <!-- 主页排行榜 -->
    <div @click="routerApi(rank.rankid)" class="box" v-for="rank in $store.state.rank" :key="rank.id">
      <span class="imga">
        <img :src="rank.imgurl.replace('{size}',400)" alt />
      </span>
      <span class="_rankname">{{rank.rankname}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicHome",
  data: () => ({
    size: 400
  }),
  methods: {
    routerApi(id) {
      this.$router.push({path:'/detail',query:{key:id , id:0}})
    }
  }
};
</script>

<style lang="scss" scoped>
.musichome {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #f1f1f1;
}

.box {
  width: 100%;
  height: 5rem;
  margin-bottom: 0.1rem;
  background-color: #f7f7f7;
  position: relative;

  span {
    display: block;
  }

  .imga {
    width: 5rem;

    img {
      width: 100%;
    }
  }

  ._rankname {
    position: absolute;
    top: 50%;
    left: 5.7rem;
    margin-top: -0.5rem;
  }
}
</style>
