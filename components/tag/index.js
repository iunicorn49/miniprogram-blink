// components/tag/index.js
Component({
  options: {
    // 启用 slot
    multipleSlots: true
  },
  /**
   * 外部class传递
   */
  externalClasses: ['tag-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
