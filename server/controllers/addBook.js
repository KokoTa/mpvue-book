/**
 * 新增图书
 * 1. 获取豆瓣信息
 * 2. 存入 mysql
 */
const https = require('https')
const { mysql } = require('../qcloud')

function getJSON (url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let str = ''
      res.on('data', data => {
        str += data
      })
      res.on('end', () => {
        const json = JSON.parse(str)
        if (json.title) {
          resolve(json)
        } else {
          reject(json)
        }
      })
    })
    .on('error', (e) => reject(e)) // 连接报错不处理会导致应用崩溃
  })
}
module.exports = async ctx => {
  const { isbn, openid } = ctx.request.body
  if (isbn && openid) {
    // 判断图书是否已存在
    try {
      const book = await mysql('books').select().where('isbn', isbn)
      if (book.length) {
        ctx.state = {
          code: -1,
          data: {
            message: '图书已存在'
          }
        }
        return
      }
    } catch (error) {
      ctx.state = {
        code: -1,
        data: {
          message: error.sqlMessage
        }
      }
      return
    }

    // 存储图书
    let res
    try {
      res = await getJSON(`https://api.douban.com/v2/book/isbn/${isbn}`)
    } catch (error) {
      console.log(error)
      ctx.state = {
        code: -1,
        data: {
          message: error
        }
      }
      return
    }

    const rate = res.rating.average
    const { title, image, alt, publisher, summary, price } = res
    const tags = res.tags.map((item) => `${item.title} ${item.count}`).join(',')
    const author = res.author.join(',')

    try {
      await mysql('books').insert({
        isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
      })
      ctx.state = {
        code: 0,
        data: {
          message: '图书已添加'
        }
      }
    } catch (error) {
      ctx.state = {
        code: -1,
        data: {
          message: error.sqlMessage
        }
      }
    }
  }
}
