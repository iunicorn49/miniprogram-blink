// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function (newVal) {
        // 永远不要在一个属性的observer函数中去改变这个属性本身的值
        const val = newVal < 10 ? `0${newVal}` : newVal
        this.setData({ _index: val })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    year: 0,
    month: '',
    _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  /** 生命周期 */
  lifetimes: {
    attached: function () { // 在组件实例进入页面节点树时执行
      const date = new Date()
      const year = date.getFullYear()
      const month = this.properties.months[date.getMonth()] + '月'

      this.setData({ year, month })
    },
  }
})
