
import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { Table, Button, Modal, Input, Form, notification, Spin } from 'antd';
import { observer } from 'mobx-react';
const FormItem = Form.Item;

@observer
class Component extends React.Component<any, any> {
    state = {
        loading: false
    }
    showModal = () => {

    }
    hideModal = () => {
        this.props.Store.editModalDisplay();
    }
    onOk = () => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({ loading: true });
            // console.log(values);
            this.props.Store.edit(Object.assign({ ...this.props.Store.editModel }, values)).then(x => {
                notification['success']({
                    duration: 3,
                    message: '提示',
                    description: x,
                });
                this.props.Store.editModalDisplay();
                this.props.form.resetFields();
                this.setState({ loading: false });
            }).catch(e => {
                notification['error']({
                    duration: 3,
                    message: '提示',
                    description: e,
                });
                this.setState({ loading: false });
            });
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.Store.editModel.key ? "修改角色" : "添加角色"}
                visible={this.props.Store.editModalVisible}
                onOk={this.onOk}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消"
            >
                <Spin spinning={this.state.loading} tip="提交中..." >
                    <Form >
                        <FormItem label="角色名称" labelCol={{ sm: { span: 4 } }} wrapperCol={{ sm: { span: 20 } }}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please input the name !' }],
                                initialValue: this.props.Store.editModel.name
                            })(
                                <Input placeholder="角色名称" />
                                )}
                        </FormItem>
                        {/* <FormItem label="功能权限">
                        {getFieldDecorator('description')(<Input type="textarea" />)}
                    </FormItem> */}
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
const Formcom = Form.create()(Component);
export default class FormComponent extends React.Component<any, any> {
    render() {
        return <Formcom {...this.props} />
    }
}
