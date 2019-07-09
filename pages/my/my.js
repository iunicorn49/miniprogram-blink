import { ClassicModel } from '../../models/classic.js'
import { BookModel } from '../../models/book.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: []
  },

  getUserInfo({ detail: { userInfo } }) { // 用户手动授权
    if (userInfo) { // 用户同意的话, 就会有userInfo
      this.setData({ userInfo, authorized: true })
    }
  },

  userAuthorized() { // 获取用户数据
    wx.getSetting({ // 判断用户是否授权过 
      success: ({ authSetting }) => {
        if (authSetting['scope.userInfo']) {
          wx.getUserInfo({ // 只有当用户手动授权过后, 才能获取用户信息
            success: ({ userInfo }) => {
              this.setData({ userInfo, authorized: true })
            }
          }) 
        }
      }
    })
  },

  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then((({ count }) => {
      this.setData({ bookCount: count })
    }))
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({ classics: res })
    })
  },
  
  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  }
})