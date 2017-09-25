
import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { Table, Button, Modal } from 'antd';
import { observer } from 'mobx-react';

@observer
export default class Component extends React.Component<any, any> {
    state = {
        loading: false,

    };
    start = () => {
        console.log(this.props.Store);

        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 1000);
    }
    showModal = () => {
        this.props.Store.editModalDisplay(true);
    }
    render() {
        const selectlength = this.props.Store.selectedRowKeys.length;
        const hasSelected = selectlength > 0;
        return (
            <div>
                <div className="table-row-buttons" >
                    <Button type="primary" onClick={this.showModal} loading={this.state.loading}> 添加角色</Button>
                    <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={this.state.loading} >设置权限功能</Button>
                </div>
                <div style={{ padding: "2px" }}>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectlength} items` : ''}
                    </span>
                </div>
            </div>
        );
    }
}