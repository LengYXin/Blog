/**
 * 第三方依赖库
 */
/**低版本浏览器兼容垫片 */
// import "babel-polyfill"
/*---------redux---------*/
import 'redux'
import 'redux-thunk'
/*---------react---------*/
import 'react'
import 'react-dom'
import 'react-redux'
import 'react-router'
import 'react-router-dom'
import 'react-router-config'
import 'history'
/*-----------ui------------*/
import 'antd'
// import '../node_modules/antd/dist/antd.css' 这个 css 放到了 index.tsx 中引入 webpack 独立css 现在好像没有支持多入口css合并
/*---------杂七杂八的---------*/
import "jquery"
// import "tether"
// import 'bootstrap'
// import '../assets/bootstrap/scss/bootstrap.scss'