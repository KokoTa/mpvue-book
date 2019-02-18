module.exports = async ctx => {
    ctx.state = {
        code: 200,
        data: {
            message: '我是测试数据'
        }
    }
}
