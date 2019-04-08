const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookid } = ctx.request.query

  try {
    const commentList = await mysql('comments')
      .select('comments.*', 'csessioninfo.user_info')
      .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')
      .where('bookid', bookid)

    ctx.state.data = {
      commentList: commentList.map((item) => {
        item.user_info = JSON.parse(item.user_info)
        return item
      })
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
