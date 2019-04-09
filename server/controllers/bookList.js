const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { page, openid } = ctx.request.query || 0
  const size = 10
  const sql = mysql('books')
    .select('books.*', 'csessioninfo.user_info')
    .join('csessioninfo', 'books.openid', 'csessioninfo.open_id')

  let books
  if (page) {
    books = await sql
      .limit(size)
      .offset(page * size)
      .orderBy('books.id', 'desc')
  } else if (openid) {
    books = await sql
      .where('books.openid', openid)
  }

  ctx.state.data = {
    list: books.map((obj) => {
      obj.user_info = JSON.parse(obj.user_info)
      return obj
    })
  }
}
