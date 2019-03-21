const { mysql } = require('../qcloud')

module.exports = async ctx => {
  const tops = await mysql('books').select('*').orderBy('count', 'desc').limit(9)
  ctx.state.data = {
    list: tops
  }
}
