// @zeit/next-css使得nextJs项目可以直接在组件中引入css文件
const withCss = require('@zeit/next-css');

if (typeof require !== 'undefined') {
    require.extensions['.css']=file=>{}
}

module.exports = withCss({})