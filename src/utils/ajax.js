// const urlPath =
//   process.env.NODE_ENV === 'development'
//     ? 'http://192.168.168.104:8324/'
//     : 'https://www.shoufacm.com/'
import $ from 'jquery'
import qs from 'qs'

const ajax = (type, data, url, headersType) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${process.env.V_API_PATH}${url}`,
      type: type || 'post',
      dataType: 'JSON',
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        'Content-Type': headersType || 'application/x-www-form-urlencoded'
      },
      beforeSend: (xhr) => {
        // 可以设置token
        // if (token) {
        //   xhr.setRequestHeader('token', token)
        // }
      },
      processData: false,
      contentType: false,
      success: (res) => {
        if (res.code === 0) {
          resolve(res)
        }
      },
      error: (res) => {
        reject(res)
      }
    })
  })
}

export default ajax
