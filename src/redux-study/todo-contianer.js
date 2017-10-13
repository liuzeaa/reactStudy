import Todo from './todo-view'
import {connect} from 'react-redux'

var mapState2props = function (store) {

    return {
        items:store.todo.items,
        name:store.todo.name,
        active:store.todo.active
    }
}
//connect连接器
//链接strore,返回值是给所连接的组件当属性用的
export default connect(mapState2props)(Todo)