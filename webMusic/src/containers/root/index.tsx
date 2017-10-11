import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config'
import { observer, inject } from 'mobx-react';
import CSSTransition from 'react-transition-group/CSSTransition';


import './style.css'

/**
 * RootApp
 */
@inject('UserContextStore')
export class RootApp extends React.Component<any, any>{
    state = {
        // CSSTransitionShow: false,
        collapsed: false,
        current: this.props.location.pathname,
        openKeys: ['0'],
    };
    componentDidMount() {
        // this.setState({ CSSTransitionShow: true });
    }


    render() {
        return (
            <div>
                <header>头</header>
                {renderRoutes(this.props.route.routes)}
                <footer>尾</footer>
            </div>
        );
    }
}