import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config'
import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { RootApp, Login, Home } from '../containers/'
import { Back } from '../utils/Back'
import './style.css'
// 路由起始根节点

// 路由结构是向下传递的 如果上层（父组件）没有定义好路由 在子组件中访问子子组件的路由是访问不到的。
// BrowserRouter 全局顶层 一个 多个会出现 路由错乱== 未知错误
export default class RootRoutes extends React.Component<any, any> {
    NoMatch = ({ location }) => (
        <div>
            <h3>无法匹配 <code>{location.pathname}</code></h3>
        </div>
    )
    routes: RouteConfig[] = [
        {
            path: '/login',
            component: Login,
        },
        {
            component: RootApp,
            routes: [
                {
                    path: "/",
                    exact: true,
                    component: Home,
                },
                // 没有匹配的路由
                {
                    component: this.NoMatch as any
                }
            ],
        },

    ]
    render() {
        return (
            <BrowserRouter>
                <div>
                    {/*<Back />*/}
                    {renderRoutes(this.routes)}
                </div>
            </BrowserRouter>
        );
    }
}