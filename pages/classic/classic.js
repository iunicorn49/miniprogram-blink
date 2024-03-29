// pages/classic/classic.js
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classicData: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  onLike: function({ detail }) {
    const { behavior } = detail
    const { id, type } = this.data.classicData
    likeModel.like(behavior, id, type)
  },

  onNext: function() {
    this._updateClassic('next')
  },

  onPrevious: function() {
    this._updateClassic('previous')
  },

  _updateClassic: function(nextOrPrevious) {
    const { index } = this.data.classicData
    classicModel.getClassic(index, nextOrPrevious, res => {
      const { index } = res
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        first: classicModel.isFirst(index),
        latest: classicModel.isLatest(index)
      })
    })
  },

  _getLikeStatus: function(artId, category) {
    likeModel.getClassicLikeStatus(artId, category, res => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest(res => {
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})
