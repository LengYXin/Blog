import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { observer } from 'mobx-react';
// import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';
const FormItem = Form.Item;
// import { login } from '../../Actions'
import './style.css'

// 路由起始根节点

@observer(['UserContextStore'])
class Component extends React.Component<any, any> {
    componentWillMount() {
        // console.log("Login", this.props);
    }
    onLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const hide = message.loading("登录中。。。", 0);
                // this.props.UserContextStore.State = true;
                this.props.UserContextStore.onLogin().then(hide)
                // console.log('Received values of form: ', values);
                // this.props.dispatch(login(values.userName, values.password, hide));
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // 还在获取当前登录状态
        // if (this.props.user.inLoad) {
        //     return <div>加载中。。。。。</div>
        // }
        // 登录了重定向到 home
        if (this.props.UserContextStore.State) {
            return (<div>
                <Redirect to={{
                    pathname: '/',
                }} />
            </div>)
        } else {
            return <form onSubmit={this.onLogin.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                        )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
                    Or <a href="">register now!</a>
                </FormItem>
            </form>
        }
    }
}
// 这里需要创建表单 
// export const LoginForm = (props) => {
//     const Formcom = Form.create()(Component);
//     return <CSSTransition timeout={500}
//     classNames="fade">
//         <Formcom {...props} />
//     </CSSTransition>

// };
const Formcom = Form.create()(Component);
export class LoginForm extends React.Component<any, any> {
    // state = { show: false }
    // componentDidMount() {
    //     this.setState({ show: true });
    // }
    render() {
        return <Formcom {...this.props} />
    }
}
// 这里绑定 redux 
// const Root = connect(state => {
//     return {
//         user: state.user
//     }
// })(WrappedNormalLoginForm);
// @observer(['UserContextStore'])
// export class Login extends React.Component<any, any> {
//     render() {
//         return <WrappedNormalLoginForm />;
//     }
// }