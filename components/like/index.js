// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean
    },
    count: {
      type: Number
    },
    readOnly: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: './images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function (e) {
      if (this.properties.readOnly) return
      let { like, count } = this.properties
      like = !like
      count = like ? count + 1 : count - 1
      this.setData({ count, like })

      let behavior = this.properties.like ? 'like' : 'cancel'
      this.triggerEvent('like', { behavior })
    }
  }
})
