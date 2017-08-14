import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config'
import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Breadcrumb, Icon, BackTop, Spin, Tabs } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
import { loginOut } from '../../Actions'
import { Nav } from './Nav'
import { Back } from '../../utils/Back'
import './style.css'

// 路由起始根节点
class Component extends React.Component<any, any> {
    state = {
        collapsed: false,
        current: this.props.location.pathname,
        openKeys: ['sub1'],
    };
    onLoginOut() {
        this.props.dispatch(loginOut());
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    handleClick = (e) => {
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
    render() {
        // 还在获取当前登录状态
        if (this.props.user.inLoad) {
            return <div className="example">
                <Spin size="large" />
            </div>
        }
        // 登录状态
        if (this.props.user.state) {
            console.log(this.props.location.pathname);
            return (
                <Layout style={{ height: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.toggle}
                    >
                        <div className="logo" />
                        <Menu theme="dark"
                            defaultOpenKeys={['sub1']}
                            openKeys={this.state.openKeys}
                            selectedKeys={[this.props.location.pathname]}
                            mode="inline"
                            onOpenChange={this.onOpenChange}
                            onClick={this.handleClick}
                        >

                            <SubMenu
                                key="sub1"
                                title={<span><Icon type="user" /><span>User</span></span>}
                            >
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
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={<span><Icon type="team" /><span>Team</span></span>}
                            >
                                <Menu.Item key="1">Team 1</Menu.Item>
                                <Menu.Item key="2">Team 2</Menu.Item>
                                <Menu.Item key="3">Team 2</Menu.Item>
                                <Menu.Item key="4">Team 2</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="8">
                                <Icon type="file" />
                                <span>File</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="header">

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
                        </Header>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content style={{ background: '#fff', padding: 24, }}>
                                {renderRoutes(this.props.route.routes)}
                                <br />...<br />...<br />...<br />...<br />...<br />...
        <br />...<br />...<br />...<br />...<br />...<br />...
        <br />...<br />...<br />...<br />...<br />...<br />...
        <br />...<br />...<br />...<br />...<br />...<br />...
        <br />...<br />...<br />...<br />...<br />...<br />...
        <br />...<br />...<br />...<br />...<br />...<br />...
        <br />...<br />...<br />...<br />...<br />...<br />
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            );
        } else {
            // 没有登录重定向到 登录页面
            return (<div>
                <Redirect to={{
                    pathname: '/login',
                }} />
            </div>)
        }
    }
}
// 绑定 redux
const Root = connect(state => {
    return {
        user: state.user
    }
})(Component);
export class RootApp extends React.Component<any, any> {
    render() {
        return (
            <div>
                <BackTop visibilityHeight={50} />
                {/*<Back />*/}
                <Root {...this.props} />
            </div>
        )
    }
}