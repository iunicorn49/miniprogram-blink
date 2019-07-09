import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP {
  getLatest(callback) {
    this.request({
      url: '/classic/latest',
      success: res => {
        this._setLatestIndex(res.index)
        wx.setStorageSync(this._getKey(res.index), res)
        callback(res)
      }
    })
  } // getLatest

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  } // _setLatestIndex

  _getLatestIndex() {
    return wx.getStorageSync('latest')
  } // _getLatestIndex

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    return index === this._getLatestIndex() ? true : false
  }

  getClassic(index, nextOrPrevious, callback) {
    const key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    const classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `/classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          callback(res)
        }
      })
    } else {
      callback(classic)
    }
  } // getClassic

  _getKey(index) {
    return 'classic-' + index
  }

  getMyFavor(callback) {
    this.request({
      url: '/classic/favor',
      success: res => {
        callback(res)
      }
    })
  } // getLatest
}

export { ClassicModel }
