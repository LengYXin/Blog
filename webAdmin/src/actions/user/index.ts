// Action 描述一个事件的行为 就是  触发一个事件要干什么，
import * as jquery from "jquery"

/*
 * action 类型
 */
export const GET_USER = 'GET_USER';
export const LOGIN = 'LOGIN';


/*
 * action 创建函数
 */
export function getUser() {
    return (dispatch, getState) => {
        // 模拟加载慢
        setTimeout(function () {
            jquery.get("/api/user/userContext").then(x => {
                dispatch({ type: GET_USER, data: x.data })
            });
        }, 1500);
    }
}
// 登录 和  退出 行为一致 所以可以同用一个 type
export function login(uid, pwd, Callback?) {
    return (dispatch, getState) => {
        setTimeout(function () {
            console.log("jquery",jquery);
            jquery.post("/api/login", { uid, pwd }).then(x => {
                Callback ? Callback() : undefined;
                dispatch({ type: LOGIN, data: x.data })
            });
        }, 1000);
    }
}
export function loginOut() {
    return (dispatch, getState) => {
        jquery.post("/api/loginOut").then(x => {
            console.log(x.data);
            dispatch({ type: LOGIN, data: x.data })
        });
    }
}
