const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { id } = ctx.request.query

  try {
    await mysql('books').where('id', id).increment('count', 1) // 递增访问量
    const bookInfo = await mysql('books')
      .select('books.*', 'csessioninfo.user_info')
      .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
      .where('id', id)
      .first() // 获取书籍信息
    bookInfo.user_info = JSON.parse(bookInfo.user_info)

    ctx.state.data = {
      data: bookInfo
    }
  } catch (err) {
    ctx.state = {
      code: -1,
      data: {
        message: err.sqlMessage
      }
    }
  }
}
