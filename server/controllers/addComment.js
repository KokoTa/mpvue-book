const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { bookid, openid, comment, location, phone } = ctx.request.body

  try {
    await mysql('comments').insert({ bookid, openid, comment, location, phone })
    ctx.state = {
      code: 0,
      data: {
        message: '评论提交成功'
      }
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
