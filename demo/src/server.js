const Vue = require('vue');
const path = require("path");
const express = require('express');
const server = express();
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync(path.join(__dirname, 'index.template.html'), 'utf-8')
});
const createApp = require('./entry-server.js');
server.use("/d3", express.static(path.join(__dirname, 'd3.html')));

// server.get('*', (req, res) => {
//     const context = {
//         url: req.url
//     }
//     const app = createApp(context)
//     renderer.renderToString(app, (err, html) => {
//         if (err) {
//             res.status(500).end(err)
//             return
//         }
//         // 处理错误……
//         res.end(html)
//     })
// })
// server.get('*', (req, res) => {
//     const app = new Vue({
//         data: {
//             url: req.url
//         },
//         template: `<div>访问的 URL 是： {{ url }}</div>`
//     })
//     renderer.renderToString(app, (err, html) => {
//         if (err) {
//             res.status(500).end('Internal Server Error')
//             return
//         }
//         res.end(`
//       <!DOCTYPE html>
//       <html lang="en">
//         <head><title>Hello</title></head>
//         <body>${html}</body>
//       </html>
//     `)
//     })
// })
server.listen(4004)