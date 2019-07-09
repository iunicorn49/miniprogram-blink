import { classBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classBeh],
  properties: {
    musicSrc: String,
    musicTitle: String
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    tagSrc: 'images/music@tag.png',
    playing: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      const { playing } = this.data
      if (!playing) {
        this.setData({
          playing: true
        })
        mMgr.title = this.properties.musicTitle
        mMgr.src = this.properties.musicSrc
      } else {
        this.setData({
          playing: false
        })
        mMgr.stop()
      }
    }, // onPlay
    // 根据条件是否重置播放状态
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
      } else if (mMgr.src === this.properties.musicSrc) {
        this.setData({
          playing: true
        })
      }
    }, // _recoverStatus
    // 监听小程序后台音乐的事件
    _monitorSwitch: function() {
      // 播放
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      // 暂停
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      // 关闭
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      // 音乐播放结束
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  },

  /** 组件所在页面的生命周期 */
  lifetimes: {
    attached: function(event) {
      // 在组件实例进入页面节点树时执行
      this._monitorSwitch()
      this._recoverStatus()
    }
  }
})
