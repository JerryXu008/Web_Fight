// 这个JS文件就是专门用于管理请求各种接口地址的
import Network from './network'

// 封装各种接口请求
export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('top/artists?offset=0&limit=5')
      .then(function (result) {
        console.log('呵呵哒下载了')
        resolve(result.artists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let letterArtists = []
    Network.all([
      Network.get(`artist/list?cat=1001&limit=5&initial=${letter}`),
      Network.get(`artist/list?cat=1002&limit=5&initial=${letter}`),
      Network.get(`artist/list?cat=1003&limit=5&initial=${letter}`),
      Network.get(`artist/list?cat=2001&limit=5&initial=${letter}`),
      Network.get(`artist/list?cat=2002&limit=5&initial=${letter}`),
      Network.get(`artist/list?cat=2003&limit=5&initial=${letter}`)
    ])
      .then(function (result) {
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    let list = [getHotArtists()]

    // console.log(list)
    let keys = ['热']
    for (let i = 65; i < 91; i++) {
      let letter = String.fromCharCode(i)
      keys.push(letter)
      list.push(getLetterArtists(letter))
    }

    Promise.all(list)
    // Network.all(list)
      .then(function (result) {
        // console.log('执行几次', result)
        let obj = {}
        obj.keys = keys
        obj.artists = result
        //  console.log('结果:', result)
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getSingerSongs = (data) => Network.get('artists', data)
export const getTopList = () => {
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 31 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (result) {
        result.list.forEach(function (item) {
          for (let key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (item.name === category[key][i].name) {
                category[key][i].rank = item
                break
              }
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = (data) => Network.get('top/list', data)
export const getSearchHot = () => Network.get('search/hot')
// export const getSearchSuggest = (data) => Network.get('search/suggest?type=mobile', data)
export const getSearchSuggest = (data) => Network.get('search?type=1', data)
/*
let timerId = null
let flag = true
export const getSearchSuggest = (data) => {
  if (!flag) {
    return
  }
  flag = false
  timerId && clearTimeout(timerId)
  return new Promise((resolve, reject) => {
    timerId = setTimeout(() => {
      Network.get('search/suggest?type=mobile', data)
        .then(function (result) {
          resolve(result)
        })
        .catch(function (err) {
          reject(err)
        })
    }, 500)
  })
}
 */
