import * as React from 'react';
import { Todo } from './Todo';
export class TodoList extends React.Component<any, any> {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo, index) =>
          /* {...todo} 解构  属性到 Todo 上 相当于  text=todo.text  completed =todo.completed*/
          <Todo {...todo}
            key={index}
            onClick={() => this.props.onTodoClick(index, todo)} />
        )}
      </ul>
    )
  }
}