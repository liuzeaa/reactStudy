import Todo from './todo-view';
import {connect} from 'react-redux';

var mapState2props = function(store){
    return {
        items:store.todo.items,
        name:store.todo.name,
        active:store.todo.active
    }
}

export default connect(mapState2props)(Todo);
