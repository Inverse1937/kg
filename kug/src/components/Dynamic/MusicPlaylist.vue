<template>
  <div class="playlist">
    <!-- 歌单分类 -->
    <div class="carousel" v-if="$store.state.carousel">
      <div 
      @touchmove="touchMove"
      @touchend="endTime"
      @touchstart="startTime"
      class="content" ref="slider">
        <div class="slideshow" ref="slideshow">
          <img :src="$store.state.carousel[4].imgurl.replace('{size}',400)" alt />
        </div>
        <div class="slideshow" v-for="(img,index) in $store.state.carousel" :key="index">
          <img :src="img.imgurl.replace('{size}',400)" alt />
        </div>
        <div class="slideshow">
          <img :src="$store.state.carousel[0].imgurl.replace('{size}',400)" alt />
        </div>
      </div>
      <span class="ol">
      <span class="li" :class="{active: n === index + 1 }" v-for="n in $store.state.carousel.length" :key="n"></span>
      </span>
    </div>
    <div class="list">
      <div @click="routerApi(song.specialid)" class="box" v-for="song in $store.state.plist" :key="song.specialid">
        <span class="box_img">
          <img :src="song.imgurl.replace('{size}',400)" alt="">
        </span>
        <p class="count">{{song.playcount}}</p>
        <p class="user">{{song.username}}</p>
        <div class="box_r">
          <span class="t">{{song.specialname}}</span>
          <span class="song" v-for="s in song.songs" :key="s.audio_id">{{s.filename}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicPlaylist",
  data: () => ({
    index: 0,
    picWidth:0,
    timer: null
  }),
  methods: {
    nextPic() {
      this.picWidth = this.$refs.slideshow.clientWidth;
      this.index++;
      let offsetX = -this.index * this.picWidth;
      this.$refs.slider.style.transition = "all .5s linear";
      this.$refs.slider.style.transform = `translateX(${offsetX}px)`;
      this.$refs.slider.addEventListener("transitionend", this.resetPic);
      // this.$refs.slider.children[this.index-1].style.transform = 'rotateY(40deg)'
    },
    resetPic() {
      // console.log('动画结束')
      if (this.index >= this.$store.state.carousel.length) {
        this.index = 0;
        let offsetX = -this.index * this.picWidth;
        this.$refs.slider.style.transition = "none";
        this.$refs.slider.style.transform = `translateX(${offsetX}px)`;
      } else if (this.index < 0) {
        this.index = this.$store.state.carousel.length - 1;
        let offsetX = -this.index * this.picWidth;
        this.$refs.slider.style.transition = "none";
        this.$refs.slider.style.transform = `translateX(${offsetX}px)`;
      }
    },
    routerApi(i) {
      this.$router.push({path:'/list',query:{key:i}})
    },
    startTime(evt) {
      clearInterval(this.timer);
      this.startX = evt.touches[0].pageX;
      // console.log(this.startX)
    },
    endTime() {
      clearInterval(this.timer);
      if (this.resX > 0) {
        if (Math.abs(this.resX) > this.picWidth / 3) {
          this.index--;
          this.$refs.slider.addEventListener("transitionend", this.resetPic);
          this.picWidth = this.$refs.slideshow.clientWidth;
          let ofsetX = -this.index * this.picWidth;
          this.$refs.slider.style.transform = `translateX(${ofsetX}px)`;
          this.$refs.slider.style.transition = "all .5s linear";
          this.timer = setInterval(this.nextPic, 3000);
        } else {
          let ofsetX = -this.index * this.picWidth;
          this.$refs.slider.style.transform = `translateX(${ofsetX}px)`;
          this.$refs.slider.style.transition = "all .5s linear";
          this.timer = setInterval(this.nextPic, 3000);
        }
      } else {
        if (Math.abs(this.resX) > this.picWidth / 3) {
          this.index++;
          this.$refs.slider.addEventListener("transitionend", this.resetPic);
          this.picWidth = this.$refs.slideshow.clientWidth;
          let ofsetX = -this.index * this.picWidth;
          this.$refs.slider.style.transform = `translateX(${ofsetX}px)`;
          this.$refs.slider.style.transition = "all .5s linear";
          this.timer = setInterval(this.nextPic, 3000);
        } else {
          let ofsetX = -this.index * this.picWidth;
          this.$refs.slider.style.transform = `translateX(${ofsetX}px)`;
          this.$refs.slider.style.transition = "all .5s linear";
          this.timer = setInterval(this.nextPic, 3000);
        }
      }
    },
    touchMove(evt) {
      clearInterval(this.timer);
      this.moveX = evt.touches[0].pageX;
      this.resX = this.moveX - this.startX;
      let ofsetX = -this.index * this.picWidth + this.resX;
      this.$refs.slider.style.transition = "none";
      this.$refs.slider.style.transform = `translateX(${ofsetX}px)`;
    }
  },
  mounted() {
    this.$nextTick(()=>{
    clearInterval(this.timer);
    this.timer = setInterval(this.nextPic, 3000);
    })
  },
  beforeDestroy() {
    // 清除计时器
    clearInterval(this.timer);
    this.$refs.slider.removeEventListener("transitionend", this.resetPic);
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  width: 100%;
  height: 100%;
  padding: 1rem .3rem 0 .3rem;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(227,227,227,1) 95%, rgba(163,163,163,1) 99%);
  overflow: hidden;
}

.carousel {
  width: 100%;
  height: 7.708rem;
  overflow: hidden;
  position: relative;
  top: 0;
  left: 0;

  .content{
    position: absolute;
    top: 0;
    left: -25%;
    width: 1000%;
    height: 100%;
  }

  .slideshow {
    width: 5%;
    height: 7.708rem;
    overflow: hidden;
    float: left;
    position: relative;
    padding: .3rem;

    img {
      width: 100%;
      border-radius: .5rem;
    }
  }
}

.ol {
  position: absolute;
  left: 50%;
  bottom: 0.25rem;
  margin-left: -2.26rem;
  display: inline-block;
  padding: 0 0.32rem;

  .li {
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    background-color: #fff;
    float: left;
    margin: 0.2rem;
    z-index: 10;
  }

  .active {
    background-color: #de698c;
  }
  }

  .list{
    display: flex;
    flex-wrap: wrap;
    padding-top: .6rem;
  }

  .box{
    width: 100%;
    height: 4.25rem;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    color: #000;
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }

  .count{
      position: absolute;
      bottom: .8rem;
      left: .4rem;
      color: #fff;
      font-size: .5rem;
    }

  .user{
    position: absolute;
    bottom: .1rem;
    left: .9rem;
    font-size: .4rem;
    width: 2.7rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .box_img{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 3.65rem;
    height: 3.65rem;
    padding: .2rem;
    box-sizing: border-box;

    img{
      width: 100%;
      border-radius: .2rem;
    }
  }

  .box_r{
    position: absolute;
    top: 0;
    left: 3.65rem;
    width: 100%;
    flex: 1;

    span{
      display: block;
      width: 100%;
      padding-left: .3rem;
      padding-right: 5.8rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .t{
      font-size: .6rem;
      margin-top: .3rem;
    }

    .song{
     font-size: .5rem;
     margin-top: .2rem;
     color: rgba(0,0,0,.7);
    }
  }
</style>
