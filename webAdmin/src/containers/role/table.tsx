
import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { Table, Button, Modal, Popconfirm, notification } from 'antd';
import { observer } from 'mobx-react';

@observer
export default class Component extends React.Component<any, any> {
    componentDidMount() {
        // 获取数据
        this.props.Store.init();
    }
    //-----------------------------------------------------------
    columns = [{
        title: '序号',
        dataIndex: 'key',
    }, {
        title: '角色名称',
        dataIndex: 'name',
    }, {
        title: '功能权限',
        dataIndex: 'address',
    }, {
        title: 'operation',
        dataIndex: '',
        key: 'x',
        width: 150,
        render: (text, record) => {
            return (
                <div>
                    <Button type="primary" onClick={() => { this.onUpdate(record) }}>修改</Button>
                    <Popconfirm placement="bottom" title={`确定要删除 ${record.name}?`} onConfirm={() => { this.onDelete(record) }} onCancel={() => { }} okText="Yes" cancelText="No">
                        <Button type="danger">删除</Button>
                    </Popconfirm>
                </div>
            );
        },
    }];
    onUpdate = (record) => {
        this.props.Store.editModalDisplay(true, record);
    }
    onDelete = (record) => {
        this.props.Store.delete(record.key).then(x => {
            notification['success']({
                duration: 3,
                message: '提示',
                description: x,
            });
        }).catch(e => {
            notification['error']({
                duration: 3,
                message: '提示',
                description: e,
            });
        });;
    }
    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.props.Store.pagination };
        console.log(pagination);
        this.props.Store.pagination = pagination;
    }
    onSelectChange = (selectedRowKeys) => {
        this.props.Store.selectedRowKeys = [...selectedRowKeys];
    }

    render() {
        const rowSelection = {
            selectedRowKeys: this.props.Store.selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        return (
            <Table
                rowSelection={rowSelection}
                columns={this.columns}
                dataSource={this.props.Store.data}
                pagination={this.props.Store.pagination}
                loading={this.props.Store.loading}
                rowKey={(record: any) => record.key}
                onChange={this.handleTableChange.bind(this)}
            />
        );
    }
}