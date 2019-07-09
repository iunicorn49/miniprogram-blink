import { config, tips } from '../config.js'

class HTTP {
  request(params) {
    let { url, method, data, success, fail } = params
    if (!method) method = 'GET'
    wx.request({
      url: config.api_base_url + url,
      method,
      data,
      header: {
        'content-type': 'application/json',
        appkey: config.appkey
      },
      success: res => {
        let code = `${res.statusCode}`
        if (code.startsWith('2')) {
          success && success(res.data)
        } else {
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: err => {
        this._show_error()
        fail && fail(err)
      }
    })
  } // request

  _show_error(error_code = 1) {
    const tip = tips[error_code]
    wx.showToast({
      title: tip || tips[1],
      icon: 'none',
      duration: 2000
    })
  } // _show_error
}

export { HTTP }
