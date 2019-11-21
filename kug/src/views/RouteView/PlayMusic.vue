<template>
  <div class="play" ref="play">
    <img class="mask" v-if="$store.state.musichash.album_img" :src="($store.state.musichash.album_img).replace('{size}',400)" alt />
    <div class="title">
      <span @click="backApi" class="back"></span>
      <div class="songName">{{$store.state.musichash.songName}}</div>
    </div>
    <div class="container" v-show="w">
      <div
      @touchstart="getPause"
      @touchend="getPlay"
      ref="album"
      class="album">
        <img v-if="$store.state.musichash.album_img" :src="($store.state.musichash.album_img).replace('{size}',400)" alt />
        <van-circle
        v-model="currentRate"
        :color="gradientColor"
        layer-color="red"
        :rate="rate"
        size="11.3rem"
        />
      </div>
    </div>
    <div class="bottom">
        <div class="time">
          <span>{{playTime | formatDate}}</span>
          <span>/</span>
          <span>{{allTime | formatDate}}</span>
        </div>
        <div
        class="progressBox"
        ref="progress"
        @touchstart="startTime"
        @touchmove="touchMove"
        @touchend="endTime"
        >
        <div class="progress">
            <div class="cache" ref="cache"></div>
            <div ref="bar" class="bar">
              <span v-show="showTime" class="play_time">{{playTime | formatDate}}</span>
            </div>
        </div>
        </div>       
        <div class="icon">
            <van-icon @click="getLast" class-prefix='icon' class="icon_last" name="previous2" />
            <van-icon @click="getPlay" class="icon_play" v-show="show" name="play" />
            <van-icon @click="getPause" class-prefix='icon' class="icon_pause" v-show="!show" name="pause2" />
            <van-icon @click="getNext" class-prefix='icon' class="icon_next" name="next2" />
            <van-icon @click="songList" v-show="listShow" class="list_show" name="ascending" />
            <van-icon @click="songList" v-show="!listShow" class="list_hide" name="descending" />
        </div>
        <div class="playList" v-show="!listShow" v-if="$store.state.rankid">
         <div :class="index == i?'active':''" class="box" v-for="(songs,i) in listData" :key="i">
             <span @click="hashApi(songs.hash,i)" class="filename">{{songs.filename}}</span>
             <van-icon @click="getClose(songs.audio_id)" class="omit" name="close" />
         </div>
        </div>
      <div class="imgHead">
        <img v-if="$store.state.musichash.imgUrl" :src="($store.state.musichash.imgUrl).replace('{size}',400)" alt />
      </div>
      <audio autoplay ref="audio" :src="$store.state.musichash.url"></audio>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Vue from 'vue';
import { Icon } from 'vant';
import { Circle } from 'vant';
import { formatDate } from '../../js/timer'
import 'vant/lib/icon/local.css';

Vue.use(Circle);
Vue.use(Icon);
export default {
  name: "palyMusic",
  data:()=>({
      hash:'',
      listData:[],
      show:false,
      listShow:true,
      angle:0,
      timer:null,
      porTimer:null,
      index:0,
      rate:0,
      currentRate:0,
      startX: 0,
      moveX: 0,
      playTime:0,
      allTime:0,
      wh:0,
      showTime:false,
      w:true,
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      }
  }),
  filters:{
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "mm:ss");
    }
  },
  watch:{
      hash(){
          this.formData()
          clearInterval(this.timer)
          clearInterval(this.porTimer)
          this.porTimer = setInterval(this.progressBar,16.7);
          this.timer = setInterval(this.rotateApi,30);
      },
      wh(){
        if(this.$refs.play.clientWidth >= (this.$refs.play.clientHeight)){
        this.w = false
      }else{
        this.w =true
      }
      }
  },
  methods: {
    ...mapActions(["getDataFromMusicHash"]),
    dataKey(){
        this.hash = this.$route.query.hash;
        this.index = this.$route.query.index;
        if(this.$store.state.rankid.songs.list && this.$route.query.key == 0){
        this.listData = this.$store.state.rankid.songs.list
        }else if(this.$store.state.singerid.songs.list && this.$route.query.key == 1){
          this.listData = this.$store.state.singerid.songs.list
        }else if(this.$store.state.musicKey.data.info && this.$route.query.key == 2){
          this.listData = this.$store.state.musicKey.data.info
        }else if(this.$store.state.listmusic.list.list.info && this.$route.query.key == 3){
          this.listData = this.$store.state.listmusic.list.list.info
        }
        clearInterval(this.timer)
        this.timer = setInterval(this.rotateApi,30);
    },
    hashApi(hash,i){
        this.hash = hash;
        this.index = i
        this.songList();
        this.show = false;
        clearInterval(this.timer)
        this.timer = setInterval(this.rotateApi,30);
    },
    formData() {
      this.getDataFromMusicHash(this.hash);
    },
    getClose(id){
      this.listData = this.listData.filter(item => item.audio_id != id)
    },
    getPlay() {
      this.$refs.audio.play();
      this.show = !this.show;
      clearInterval(this.timer)
      this.timer = setInterval(this.rotateApi,30)
    },
    getPause() {
      this.$refs.audio.pause();
      this.show = !this.show;
      clearInterval(this.timer)
    },
    getLast(){
      this.index--;
      if(this.index < 0){
        this.index = this.listData.length - 1
      }
      this.hash = this.listData[this.index].hash
    },
    getNext(){
      this.index++;
      if(this.index > this.listData.length - 1){
        this.index = 0
        this.hash = this.listData[this.index].hash
      }else if(this.hash){
      this.hash = this.listData[this.index].hash
      }
    },
    rotateApi(){
        if(this.$refs.album){
        this.angle++
        this.$refs.album.style.transform = "rotate("+this.angle+"deg)"
        }
    },
    progressBar(){
      this.wh = this.$refs.play.clientWidth
      this.playTime = this.$refs.audio.currentTime * 1000
      if(this.$refs.audio.duration>=0){
        this.allTime = this.$refs.audio.duration * 1000
      }
      this.rate = (this.$refs.audio.currentTime/this.$refs.audio.duration) *100
      this.$refs.bar.style.width = (this.$refs.audio.currentTime/this.$refs.audio.duration)*100 +'%'
      if(this.$refs.audio.currentTime >= this.$refs.audio.duration){
        clearInterval(this.timer)
        this.getNext();
      }else if(this.$refs.audio.buffered.length != 0){
        this.$refs.cache.style.width = this.$refs.audio.buffered.end(this.$refs.audio.buffered.length - 1)/this.$refs.audio.duration *100 + "%"
      }
    },
    songList(){
        this.listShow = !this.listShow
    },
    startTime(evt){
      this.showTime = !this.showTime
      clearInterval(this.timer)
      clearInterval(this.porTimer)
      this.$refs.audio.pause();
      let palyPlan = evt.touches[0].pageX / this.$refs.progress.clientWidth *100 
      this.$refs.bar.style.width = palyPlan +"%"
      this.rate = palyPlan
      this.show = !this.show;
    },
    touchMove(evt){
      let palyPlan = evt.touches[0].pageX / this.$refs.progress.clientWidth *100 
      this.$refs.bar.style.width = palyPlan +"%"
      this.rate = palyPlan
      this.$refs.audio.currentTime = this.$refs.audio.duration * palyPlan / 100
      this.playTime = this.$refs.audio.currentTime * 1000
    },
    endTime(evt){
      this.showTime = !this.showTime
      this.porTimer = setInterval(this.progressBar,16.7);
      this.$refs.audio.play();
      this.show = !this.show;
      this.timer = setInterval(this.rotateApi,30)
      let palyPlan = evt.changedTouches[0].pageX / this.$refs.progress.clientWidth
      this.$refs.audio.currentTime = this.$refs.audio.duration * palyPlan
    },
    backApi(){
      this.$router.go(-1)
    }
  },
  mounted() {
    clearInterval(this.timer)
    clearInterval(this.porTimer)
    this.dataKey();
    this.porTimer = setInterval(this.progressBar,16.7);
  },
  beforeDestroy() {
      clearInterval(this.timer)
      clearInterval(this.porTimer)
  }
};
</script>

<style lang="scss" scoped>
.play {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;

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
  line-height: 2.2rem;
  text-align: center;
  border-bottom: 2px solid #000;
  position: relative;

  .back {
    position: absolute;
    top: 50%;
    left: 0.7rem;
    margin-top: -.25rem;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    transform: rotate(135deg);
  }
}

.container{
  width: 100%;
  height: 82.5%;
  position: relative;
}

.album {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -5.65rem;
  margin-left: -5.65rem;
  width: 11.3rem;
  height: 11.3rem;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    padding: .45rem;
  }

  .van-circle{
    position: absolute;
    top: 0;
    left: 0;
  }
}

.bottom {
  width: 100%;
  height: 2.7rem;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  background: rgb(2,0,36);
  background: linear-gradient(0deg, rgba(2,0,36,0.5) 0%, rgba(9,9,121,0.5) 35%, rgba(0,212,255,0.5) 100%);

  .progressBox{
    position: absolute;
    top: -.3rem;
    left: 0;
    width: 100%;
    height: .3rem;
  }

  .time{
    position: absolute;
    top: -1.5rem;
    left: 50%;
    margin-left: -2.2rem;
    color: #fff;
    font-size: .6rem;
    line-height: .7rem;
    padding: 0rem .5rem;
    border: 1px solid #000;
    border-radius: 2rem;
    background-color: rgba(0, 0, 0, 0.4);
    box-sizing: border-box;
  }

  .play_time{
    display: block;
    width: 1.3rem;
    height: .6rem;
    position: absolute;
    top: -1rem;
    right: -.8rem;
    color: #000;
    font-size: .5rem
  }

  .progress{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: .1rem;
    background-color: #f5f5f5;

    .cache{
      position: absolute;
      background-color: #ccc;
      width: 0%;
      height: 100%;
      box-sizing: border-box;
    }

    .bar{
      position: absolute;
      background-color: red;
      width: 0%;
      height: 100%;
      box-sizing: border-box;
    }
  }
  
  .icon_last{
        position: absolute;
        top: 50%;
        left: 35%;
        margin-top: -1rem;
        margin-left: -1rem;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        opacity:.8;
        border-radius: 50%;
  }

  .icon_next{
        position: absolute;
        top: 50%;
        left: 65%;
        margin-top: -1rem;
        margin-left: -1rem;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        opacity:.8;
        border-radius: 50%;
  }

  .icon_play{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        opacity:.8;
        border: 2px solid #fff;
        box-sizing: border-box;
        border-radius: 50%;
    }

    .icon_pause{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        opacity:.8;
        border: 2px solid #fff;
        box-sizing: border-box;
        border-radius: 50%;
    }

    .list_show{
        position: absolute;
        top: 50%;
        left: 85%;
        margin-top: -1rem;
        margin-left: -1rem;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        opacity:.8;
        border-radius: 50%;
    }

    .list_hide{
        position: absolute;
        top: 50%;
        left: 85%;
        margin-top: -1rem;
        margin-left: -1rem;
        width: 2rem;
        height: 2rem;
        text-align: center;
        line-height: 2rem;
        opacity:.8;
        border-radius: 50%;
    }

    .playList{
        position: absolute;
        right: 0;
        bottom: 3rem;
        width: 8rem;
        max-height: 13rem;
        font-size: .6rem;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
    }

    .box{
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0.3);
        color: #fff;
        position: relative;
        &.active{
          background-color: #000fff;
        }

        span{
            display: block;
            padding: .3rem 1rem .3rem .3rem;
        }

        .omit{
            position: absolute;
            top: 50%;
            margin-top: -.29rem;
            right: .3rem;
        }
    }

  .imgHead {
    position: absolute;
    top: 0;
    left: 0;
    width: 2.7rem;
    height: 2.7rem;
    text-align: center;
    font-size: 2rem;

    img {
      width: 100%;
      padding: 0.2rem;
    }
  }
}
</style>
