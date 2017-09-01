const createApp = require('./app');
module.exports = context => {
    const {
        app
    } = createApp()
    return app
}