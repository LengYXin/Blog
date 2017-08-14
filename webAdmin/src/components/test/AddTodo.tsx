import * as React from 'react';
import { findDOMNode } from "react-dom";
import { Button, Input, Row, Col } from 'antd';
export class AddTodo extends React.Component<any, any> {
    render() {
        return (
            <Row>
                <Col span={10}>  <Input placeholder="Basic usage" ref='input' /></Col>
                <Col span={2}> <Button type="primary" onClick={e => this.handleClick(e)} ghost>Add</Button></Col>
            </Row>
        );
    }

    handleClick(e) {
        const node: HTMLInputElement = findDOMNode(this.refs.input) as any;
        const text = node.value.trim();
        this.props.onAddClick(text);
        node.value = '';
    }
}
