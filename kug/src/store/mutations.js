import * as types from './mutation-types'
export default {
    [types.MUSIC_CHART](state, rank) {
        state.rank = rank
    },
    [types.RANK_MUSIC_CHART](state, rankid) {
        state.rankid = rankid
    },
    [types.MUSIC_PLAY_LIST](state, plist) {
        state.plist = plist
        state.carousel = state.plist.slice(0, 5);
    },
    [types.MUSIC_PLAYLIST_ID](state, listmusic) {
        state.listmusic = listmusic
    },
    [types.SINGER_CLASSIFICATION](state, singer) {
        state.singer = singer
    },
    [types.SINGER_CLASS_ID](state, singerclass) {
        state.singerclass = singerclass
    },
    [types.SINGER_INFORMATION](state, singerid) {
        state.singerid = singerid
    },
    [types.DETAILS_OF_THE_SONG](state, musichash) {
        state.musichash = musichash
    },
    [types.MUSIC_DETAILS](state, musicLyrics) {
        state.musicLyrics = musicLyrics
    },
    [types.MUSIC_SEARCH](state, musicKey) {
        state.musicKey = musicKey
    },
    [types.MUSIC_HOT_SEARCH](state, hotSearch) {
        state.hotSearch = hotSearch
    },
}