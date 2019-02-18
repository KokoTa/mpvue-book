# my-mpvue

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 关于项目的一些注释

> 该项目由 mpvue 官网构建工具初始化

1. mpvue 其实就是一个 Vue 项目，当构建时会转化生成一个原生小程序项目，注意如果新增文件的话热加载是无效的，需要重新 npm run dev

2. mpvue 项目中每个页面不只是一个 vue 文件，还包含了 js 和 json 文件，js 是固定写法可以用于新增状态树(vuex)，json 同原生小程序的配置文件

3. 原生小程序有一个 globalData，在 mpvue 中可以用 vuex 实现

4. 关于服务器及本地开发，见 [serever/README.md](server/README.md)
