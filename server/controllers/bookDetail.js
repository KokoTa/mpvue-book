const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const { id } = ctx.request.query

  try {
    await mysql('books').where('id', id).increment('count', 1)
    ctx.state.data = {
      message: '访问量已递增'
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
