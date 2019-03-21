const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { page } = ctx.request.query || 0
  const size = 10
  const books = await mysql('books')
    .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')
    .limit(size)
    .offset(page * size)
    .orderBy('books.id', 'desc')

  ctx.state.data = {
    list: books.map((obj) => {
      obj.user_info = JSON.parse(obj.user_info)
      return obj
    })
  }
}
