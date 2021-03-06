const Vue = require('vue');
const App = require('./vue');
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
module.exports = function createApp() {
    const app = new Vue({
        // 根实例简单的渲染应用程序组件。
        render: h => h(App)
    })
    return {
        app
    }
}