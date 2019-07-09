import {
  KeywordModel
} from '../../models/keyword.js'

import {
  BookModel
} from '../../models/book.js'

import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
    loadingCenter: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBookTap({ detail: { id } }) {
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${id}`,
      })
    },
    
    loadMore() {
      if (this.isLocked() || !this.data.q) return
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        }, err => {
          this.unLocked()
        })
      }
    },
    onCancel() {
      this.triggerEvent('cancel')
      this.initialize()
    },
    onConfirm({ detail: { value, text } }) {
      const v = value || text
      this._showResult(v)
      this._showLoadingCenter()
      bookModel.search(0, v).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(v)
        this._hideLoadingCenter()
      })
    },
    onDelete() {
      this._closeResult()
      this.initialize()
    },
    _showResult(q) {
      this.setData({ searching: true, q })
    },
    _closeResult() {
      this.setData({ searching: false, q: '' })
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  },
  // 生命周期
  lifetimes: {
    attached: function () {
      keywordModel.getHot().then(res => {
        this.setData({
          hotWords: res.hot,
          historyWords: keywordModel.getHistory()
        })
      })
    }
  }
})
