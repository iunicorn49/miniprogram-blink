import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLike({ detail: { behavior } }) {
    likeModel.like(behavior, this.data.book.id, 400)
  },

  onFakePost() {
    this.setData({ posting: true })
  },

  onCancel() {
    this.setData({ posting: false })
  },

  onPost(event) {
    const { text, value } = event.detail
    const comment = text || value
    if (comment.length > 12) {
      return wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
    }
    if (!comment || !comment.length) {
      return this.setData({ posting: false })
    }
    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      this.setData({
        comments: [{ content: comment, nums: 1 }, ...this.data.comments],
        posting: false
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({ bid }) {
    wx.showLoading({
      title: '加载中...',
    })
    const book = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)

    Promise.all([book, comments, likeStatus]).then(([book, { comments }, { like_status, fav_nums }]) => {
      this.setData({
        book,
        comments,
        likeStatus: like_status,
        likeCount: fav_nums
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})