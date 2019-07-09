import {
  HTTP
} from '../util/http-p.js'

class KeywordModel extends HTTP {

  HISTORY_KEY = 'HISTORY_KEY'

  MAX_LENGTH = 10

  getHistory() {
    return wx.getStorageSync(this.HISTORY_KEY) || []
  }

  getHot() {
    return this.request({
      url: '/book/hot_keyword'
    })
  }
  
  addToHistory(keyword) {
    let words = this.getHistory()
    const index = words.indexOf(keyword)
    if (index > -1) {
      if (index > 0) {
        words.splice(index, 1)
        words.unshift(keyword)
      }
    } else {
      words.unshift(keyword)
    }
    if (words.length >= this.MAX_LENGTH) {
      words.pop()
    }
    wx.setStorageSync(this.HISTORY_KEY, words)
  }
}

export { KeywordModel }
