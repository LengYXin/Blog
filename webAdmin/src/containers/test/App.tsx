import * as React from 'react'
import { connect } from 'react-redux'
import { addTodo, getTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../../Actions'
import { AddTodo, TodoList, Footer } from '../../components'
import { bindActionCreators } from "redux";
import { Nav } from './Nav'
import * as jquery from "jquery"

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
class AAA extends React.Component<any, any> {
  constructor(props) {
    super(props);
   
  }
  componentWillMount() {
    console.log("AAA----componentDidMount", this.props);
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
            dispatch(addTodo(text))
          } />
        <TodoList
          todos={visibleTodos}
          onTodoClick={index =>
            {/* dispatch(completeTodo(index)) */}
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

const II = connect(mapStateToProps)(AAA)
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；

export class App extends React.Component<any, any> {
  render() {
    // console.log("this.props", this.props);
    return (
      <div>
        <II />
      </div>
    )
  }
}