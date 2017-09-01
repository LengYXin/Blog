const Vue = require('vue');
module.exports = new Vue({
    data: {
        url: "context.url"
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
})