/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(2);
app_1.default.bootstrap();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// /// <reference path="../../typings/typings.d.ts" />
// import * as AppConfig from "../../AppConfig.json";
const express = __webpack_require__(0);
const path = __webpack_require__(3);
// import * as favicon  from 'serve-favicon';
const logger = __webpack_require__(4);
// import * as cookieParser  from 'cookie-parser';
const bodyParser = __webpack_require__(5);
const routes = __webpack_require__(6);
// error TS2688: Cannot find type definition file for 'localforage'.  运行 npm i --save-dev -d @types/localforage
class App {
    constructor(PORT) {
        this.PORT = process.env.PORT || 4001;
        this.app = express();
        this.config();
        this.routes();
        // this.error();
        if (PORT) {
            this.PORT = PORT;
        }
    }
    static bootstrap(PORT) {
        return new App().init(PORT);
    }
    /**
     * 启动
     * @param PORT  端口
     */
    init(PORT) {
        this.app.set('port', PORT || this.PORT);
        this.app.listen(this.app.get("port"), () => {
            console.log("App is running at http://localhost:%d ", this.app.get("port"));
        });
        return this;
    }
    /**
     * 注册路由
     */
    routes() {
        let router = express.Router();
        let routestest = [];
        const getPaht = (RootPath, Router, routes) => {
            Router.stack.map(x => {
                if (x.route) {
                    routes.push(RootPath + x.route.path);
                }
                else {
                    // getPaht(RootPath, x.handle, []);
                    // 中间件 以及匹配正则
                    routes.push(RootPath + "  -----  use  -----  " + x.regexp.source);
                }
            });
        };
        routes.modularList.map(x => {
            // this.app.use(new x.Router().App);
            this.app.use(x.Url, x.Router);
            routestest.push(`-----------------${x.Url}-----------------`);
            getPaht(x.Url, x.Router, routestest);
            routestest.push("");
        });
        // routestest.push(`-----------------静态-----------------`);
        // routestest.push("/react.html");
        this.app.get("/", (req, res) => {
            res.render("index", {
                title: "路由列表",
                routers: routestest
            });
        });
        console.log("");
        console.log("----------------- routers --------------------");
        console.log(routestest);
        console.log("----------------- routers --------------------");
        console.log("");
    }
    /**
     * 错误
     */
    error() {
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handler
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
    /**
     * 配置项
     */
    config() {
        // view engine setup
        this.app.set('views', path.join(path.dirname(__dirname), 'views'));
        this.app.set('view engine', 'pug');
        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // app.use(cookieParser());
        // console.log(express.static(path.join(path.dirname(path.dirname(__dirname)),"webAdmin","build")));
        this.app.use("/react", express.static(path.join(path.dirname(path.dirname(__dirname)), "webAdmin", "build")));
        // this.app.use("img", express.static(path.join(path.dirname(__dirname), 'public', 'images')));
        // this.app.use(express.static(path.join(path.dirname(__dirname), 'react')));
        this.app.use((req, res, next) => {
            // After successful login, redirect back to the intended page
            if (!req.user &&
                req.path !== "/login" &&
                req.path !== "/signup" &&
                !req.path.match(/^\/auth/) &&
                !req.path.match(/\./)) {
                // req.session.returnTo = req.path;
                console.log("--------------req---------------", req.path);
            }
            else if (req.user && req.path == "/account") {
                // req.session.returnTo = req.path;
                console.log("--------------req---------------", req.path);
            }
            next();
        });
    }
}
exports.default = App;
// 启动
// export let App = Server.bootstrap();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let modularList = [];
exports.modularList = modularList;
const users = __webpack_require__(7);
const user = __webpack_require__(8);
const login = __webpack_require__(9);
modularList.push({ Url: "/users", Router: users.RouterUse });
modularList.push({ Url: "/user", Router: user.RouterUse });
modularList.push({ Url: "/authentication", Router: login.RouterUse });


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
exports.RouterUse = express_1.Router();
// 路由列表
let routers = [];
exports.RouterUse.get("/", (req, res) => {
    routers = exports.RouterUse.stack.map(x => {
        return (x.route ? req.baseUrl + x.route.path : '这是一个中间件');
    });
    res.render("index", {
        title: "路由列表 ----- " + req.baseUrl,
        routers: routers
    });
});
exports.RouterUse.get("/index", (req, res) => {
    res.send('respond with a resource');
});
exports.RouterUse.get("/error", (req, res) => {
    let err = parseInt('a111a');
    throw "报错了";
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
exports.RouterUse = express_1.Router();
// 路由列表
let routers = [];
exports.RouterUse.get("/", (req, res) => {
    routers = exports.RouterUse.stack.map(x => {
        return (x.route ? req.baseUrl + x.route.path : '这是一个中间件');
    });
    res.render("index", {
        title: "路由列表 ----- " + req.baseUrl,
        routers: routers
    });
});
// RouterUse.use("/userList/:id?", users.RouterUse);
// RouterUse.use("/userList/a", users.RouterUse);
// RouterUse.use("/userList", users.RouterUse);
exports.RouterUse.get("/userContext", (req, res) => {
    res.json({
        Name: "LENG",
    });
});
exports.RouterUse.get("/index/:id", (req, res) => {
    res.json({
        title: "Express User"
    });
});
exports.RouterUse.get("/verifyCellPhone", (req, res) => {
    res.json({
        code: 200,
        Data: {
            Phone: 18611111111
        }
    });
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __webpack_require__(0);
const help_1 = __webpack_require__(10);
exports.RouterUse = express_1.Router();
// 路由列表
let routers = [];
exports.RouterUse.get("/", (req, res) => {
    routers = exports.RouterUse.stack.map(x => {
        return (x.route ? req.baseUrl + x.route.path : '这是一个中间件');
    });
    res.render("index", {
        title: "路由列表 ----- " + req.baseUrl,
        routers: routers
    });
});
exports.RouterUse.post("/login", (req, res) => {
    console.log(req.body);
    res.json(help_1.default.ResFormatData(Object.assign({ state: true, name: "LENG" }, req.body)));
});
exports.RouterUse.get("/userContext", (req, res) => {
    res.json({
        Name: "LENG",
    });
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    /**
     * 响应数据格式化
     * @param data
     */
    static ResFormatData(data = {}, code = 0) {
        return {
            code,
            data
        };
    }
}
exports.default = default_1;


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map