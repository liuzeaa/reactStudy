import React,{Component} from 'react'
import './index.css'
class TodoList extends Component{
    constructor(props){
        super(props)
    }
    render(){
        var that = this
        var nodes = this.props.items.map(function (o) {
            return (
                <TodoItem id={o.id} edit={that.props.onEdit} o={o} key={o.id} text={o.text} delete={that.props.onDelete}/>
            )
        })
        return (
            <ul>{nodes}</ul>
        )
    }
}
class TodoItem extends Component{
    constructor(props){
        super(props)
        this.state={
            value : this.props.text
        }
    }
    render() {
        return (
            <li>
                {this.props.text}<button onClick={(e)=>this.props.delete(this.props.o)}>删除</button><br/>
                <input value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.handleEdit}>确定</button>
                <button onClick={this.handeCancel}>取消</button>
                <br/><br/>
            </li>
        )
    }
    handeCancel =()=> {
        this.setState({
            value:this.props.text
        })
    }
    handleChange= (e)=> {
        this.setState({
            value:e.target.value
        })
    }
    handleEdit =()=> {
        var obj = {
            id:this.props.id,
            text:this.state.value
        }
        this.props.edit(obj)
    }
}
export default TodoList;
