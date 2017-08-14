import * as React from 'react';

export  class Todo extends React.Component<any, any> {
    render() {
        return (
            <li
                onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ? 'line-through' : 'none',
                    cursor: this.props.completed ? 'default' : 'pointer'
                }}>
                {this.props.Name}
            </li>
        );
    }
}
