import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config'
import { observer } from 'mobx-react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { Layout, Menu, Breadcrumb, Icon, BackTop, Spin, Tabs, Modal } from 'antd';
const { SubMenu, Item } = Menu;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import { MenusList } from './Menu';

import './style.css'

/**
 * RootApp
 */
@observer(['UserContextStore'])
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
    onLoginOut() {
        // this.props.dispatch(loginOut());
        confirm({
            title: '提示！',
            content: '确定要退出登录么?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                this.props.UserContextStore.loginOut().then(x => {
                    // console.log("login", this.props);
                })
            },
            // onCancel() {
            //     console.log('Cancel');
            // },
        });

    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleClick = (e) => {
        if (e.key == "loginout") {
            this.onLoginOut();
        }
        if (e.key == "/") {
            // console.log( this.props);
            this.props.history.push("/");
        }
        console.log('Clicked: ', e);
        this.setState({ current: e.key });
    }
    onOpenChange = (openKeys) => {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }
    getAncestorKeys = (key) => {
        const map = {
            sub3: ['sub2'],
        };
        return map[key] || [];
    }
    renderSubMenu = (Menu) => {
        // const renderMenuItem = (Menu) => {
        //     console.log(Menu);
        //     return
        // }
        // console.log(Menu.Menus);
        return <SubMenu
            key={Menu.Key}
            title={<span><Icon type="user" /><span>{Menu.Name}</span></span>}
        >
            {Menu.Menus.map(x =>
                <Item key={x.Url}>
                    <Link to={x.Url}>{x.Name}</Link>
                </Item>)
            }
        </SubMenu>
    }

    render() {
        // 没有登录重定向到 登录页面
        if (!this.props.UserContextStore.State) {
            return (<div>
                <Redirect to={{
                    pathname: '/login',
                }} />
            </div>)
        } else {
            return (
                <Layout style={{ height: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.toggle}
                    >
                        <div className="logo" />
                        <Menu theme="dark"
                            defaultOpenKeys={['0']}
                            openKeys={this.state.openKeys}
                            selectedKeys={[this.props.location.pathname]}
                            mode="inline"
                            onOpenChange={this.onOpenChange}
                            onClick={this.handleClick}
                        >
                            <Menu.Item key="/">
                                <Icon type="desktop" />
                                <span>首页</span>
                            </Menu.Item>
                            {MenusList.map(x => this.renderSubMenu(x))}
                            <Menu.Item key="loginout">
                                <Icon type="logout" />
                                <span>退出登录</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        {/* <Header className="header">

                            <Menu
                                theme="dark"
                                mode="horizontal"
                                selectedKeys={[this.props.location.pathname]}
                                style={{ lineHeight: '64px' }}
                            >
                                <Menu.Item key="1">
                                    <Icon
                                        className="trigger"
                                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                        onClick={this.toggle}
                                    />
                                </Menu.Item>
                                <Menu.Item key="/">
                                    <Link to="/">主页</Link>
                                </Menu.Item>
                                <Menu.Item key="/about">
                                    <Link to="/about">About</Link>
                                </Menu.Item>
                                <Menu.Item key="/topics">
                                    <Link to="/topics">Topics（无效）</Link>
                                </Menu.Item>
                                <Menu.Item key="/about/B">
                                    <Link to="/about/B">about/B</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                    <a onClick={this.onLoginOut.bind(this)}>退出登录</a>
                                </Menu.Item>
                            </Menu>
                        </Header> */}
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item> */}
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, }}>
                                {renderRoutes(this.props.route.routes)}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            );
        }
    }
}