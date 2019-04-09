const { mysql } = require('../qcloud')

// 获取书名或用户下的评论
module.exports = async ctx => {
  const { bookid, openid } = ctx.request.query

  try {
    const sql = mysql('comments')
      .select('comments.*', 'csessioninfo.user_info')
      .join('csessioninfo', 'comments.openid', 'csessioninfo.open_id')

    let commentList
    if (bookid) {
      commentList = await sql.where('bookid', bookid)
    } else if (openid) {
      commentList = await sql.where('openid', openid)
    }

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
