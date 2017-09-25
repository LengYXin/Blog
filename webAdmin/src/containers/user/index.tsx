import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { observer } from 'mobx-react';
import './style.css'
@observer(['UserContextStore'])
export class UserComponent extends React.Component<any, any> {
    render() {
        return <div>
            UserComponent{JSON.stringify(this.props.UserContextStore.UserContext)}
        </div>
    }
}