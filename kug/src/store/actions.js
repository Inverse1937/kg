import axios from "axios"
import * as types from './mutation-types'

export default {
    // 音乐排行榜
    async getDataFromServer({commit}){
        let rank = await axios('/app/rank/list&json=true')
        rank = rank.data.rank.list
        console.log(rank)
        commit(types.MUSIC_CHART,rank)
    },
    //排行榜分类歌曲列表
    async getDataFromRankid({commit},urlData){
        let rankli = await axios(`/app/rank/info/?rankid=${urlData.rankid}&page=${urlData.page}&json=true`)
        rankli = rankli.data
        console.log(rankli)
        commit(types.RANK_MUSIC_CHART,rankli)
    },
    //音乐歌单
    async getDataFromPlist({commit}){
        let plist = await axios('/app/plist/index&json=true')
        plist = plist.data.plist.list.info
        console.log(plist)
        commit(types.MUSIC_PLAY_LIST,plist)
    },
    //歌单下的音乐列表
    async getDataFromPlistMusic({commit},plistmusic){
        let music = await axios(`/app/plist/list/${plistmusic}?json=true`)
        music = music.data
        console.log(music)
        commit(types.MUSIC_PLAYLIST_ID,music)
    },
    //歌手分类
    async getDataFromSinger({commit}){
        let music = await axios('/app/singer/class&json=true')
        music = music.data.list
        console.log(music)
        commit(types.SINGER_CLASSIFICATION,music)
    },
    //歌手分类下的歌手列表
    async getDataFromSingerClass({commit},singerclass){
        let music = await axios(`/app/singer/list/${singerclass}?json=true`)
        music = music.data.singers.list
        console.log(music)
        commit(types.SINGER_CLASS_ID,music)
    },
    //歌手信息
    async getDataFromSingerId({commit},singerid){
        let music = await axios(`/app/singer/info/${singerid}&json=true`)
        music = music.data 
        console.log(music)
        commit(types.SINGER_INFORMATION,music)
    },
    //歌曲详情
    async getDataFromMusicHash({commit},musichash){
        let music = await axios(`/app/app/i/getSongInfo.php?cmd=playInfo&hash=${musichash}`)
        music = music.data
        console.log(music)
        commit(types.DETAILS_OF_THE_SONG,music)
    },
    //音乐详情-带歌词
    async getDataFromMusicLyrics({commit},musicLyrics){
        let music = await axios(`/lyric/yy/index.php?r=play/getdata&hash=${musicLyrics}`)
        console.log(`/lyric/yy/index.php?r=play/getdata&hash=${musicLyrics}`)
        music = music.data
        console.log(music)
        commit(types.MUSIC_DETAILS,music)
    },
    //音乐搜索
    async getDataFromMusicKey({commit},musicKey){
        let music = await axios(`/api/v3/search/song?format=json&keyword=${musicKey}&pagesize=20&showtype=1`)
        music = music.data
        console.log(music)
        commit(types.MUSIC_SEARCH,music)
    },
    //热门搜索
    async getDataFromHotSearch({commit}){
        let hotSearch = await axios(`/api/v3/search/hot?format=json&plat=0&count=30`)
        hotSearch = hotSearch.data.data.info
        console.log(hotSearch)
        commit(types.MUSIC_HOT_SEARCH,hotSearch)
    }
}