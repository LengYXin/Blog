module.exports = app => {
    let user = {
        name: "测试用户",
        state: false,
    };
    const list = [];
    for (var i = 0; i < 10; i++) {
        list.push({
            Id: i,
            state: true,
            Name: `我是第${i}条数据！`,
            completed: false,
        })
    }
    // 转换统一返回格式 code 失败=0 
    toData = (data, code = 0) => ({
        code: code,
        data: data,
    });
    // 登录
    app.post('/api/login', function (req, res) {
        // console.log("req.body",req);
        user.state = true
        // 这里没有 body 中间件 拿不到参数
        // user.name = user.uid = req.body.uid
        // user.pwd = req.body.pwd
        res.json(toData(user, 1));
    });
    // 退出登录
    app.post('/api/loginOut', function (req, res) {
        user.state = false
        res.json(toData(user, 1));
    });
    app.get('/api/user', function (req, res) {
        res.json(toData(user, 1));
    });
    app.get('/api/list', function (req, res) {
        res.json(toData(list, 1));
    });
    app.get('/api/add/:Name', function (req, res) {
        try {
            list.push({
                Id: list.length,
                state: true,
                Name: req.params.Name,
                completed: false
            });
            res.json(toData('成功', 1));
        } catch (error) {
            res.json(toData('失败', 1));
        }
    });
    app.get('/api/updata/:id', function (req, res) {
        try {
            list.filter(x => {
                if (x.Id == req.params.id) {
                    x.completed = !x.completed;
                }
            });
            res.json(toData('成功', 1));
        } catch (error) {
            res.json(toData(error, 1));
        }
    });
    app.get('/api/details/:id', function (req, res) {
        try {
            let data = list.filter(x => x.Id == req.params.id)[0] || {};
            res.json(toData(data, 1));
        } catch (error) {
            res.json(toData('', 1));
        }
    });
}