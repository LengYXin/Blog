import * as React from 'react'
import { connect } from 'react-redux'
import { addTodo, getTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../../Actions'
import { AddTodo, TodoList, Footer } from '../../components'
import { message } from 'antd';

function selectTodos(todos, filter) {
      switch (filter) {
            case VisibilityFilters.SHOW_ALL:
                  return todos
            case VisibilityFilters.SHOW_COMPLETED:
                  return todos.filter(todo => todo.completed)
            case VisibilityFilters.SHOW_ACTIVE:
                  return todos.filter(todo => !todo.completed)
      }
}
let mapStateToProps = state => {
      return {
            visibleTodos: selectTodos(state.todos, state.visibilityFilter),
            visibilityFilter: state.visibilityFilter
      }
};
// @connect<any,any,any>(
//   state => ({todos: state.todos}),
//   dispatch => bindActionCreators({addTodo,completeTodo}, dispatch)
// )
class Component extends React.Component<any, any> {
      constructor(props) {
            super(props);

      }
      componentWillMount() {
            console.log("Home----componentDidMount", this.props);
            // 获取数据
            this.props.dispatch(getTodo());
      }
      render() {
            // Injected by connect() call:
            const { dispatch, visibleTodos, visibilityFilter } = this.props
            return (
                  <div>
                        <AddTodo
                              onAddClick={text =>
                                    dispatch(addTodo(text, x => {
                                          message.success(x.data);
                                    }))
                              } />
                        <TodoList
                              todos={visibleTodos}
                              onTodoClick={(index, todo) =>
                                    dispatch(completeTodo(index, todo, x => {
                                            message.success(x.data); 
                                    }))
                              } />
                        <Footer
                              filter={visibilityFilter}
                              onFilterChange={nextFilter =>
                                    dispatch(setVisibilityFilter(nextFilter))
                              } />
                  </div>
            )
      }
}

const Cop = connect(mapStateToProps)(Component)
export class Home extends React.Component<any, any> {
      render() {
            // console.log("this.props", this.props);
            return (
                  <div>
                        <Cop />
                  </div>
            )
      }
}