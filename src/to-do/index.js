import React,{Component,} from 'react'
import TodoList from './to-do-list'

class  Todo extends Component{
    constructor(props){
        super(props)
        this.state={
            items : [
                {text:'aaa',id:this.id(),type:'active'},
                {text:'bbb',id:this.id(),type:'no-active'},
                {text:'ccc',id:this.id()}
            ],
            value:'inp'
        }
    }
    id = ()=> {
        return Math.random().toString().replace(/\./,'')+'-'+Math.random().toString().replace(/\./,'')
    }
    render(){
        return (
            <div className="todo-mvc">
                <h3>todos</h3>

                <p>
                    <input value={this.state.value} onChange={this.handleChange}/>
                    <button onClick={this.handleAdd}>提交</button>
                </p>
                <TodoList
                    items={this.state.items}
                    onDelete={this.handleDelete}
                    onEdit={this.handleEdit}
                />
            </div>
        )
    }
    handleEdit=(obj)=> {
        alert(obj.text)
        let items = this.state.items;
        items = items.map(function (o) {
            console.log(obj.id,o.id)
            if(o.id == obj.id){

                o.text = obj.text
            }
            return o
        })
        console.log(items)
        this.setState({items:items})
    }

    handleDelete =(obj)=> {

        let items = this.state.items,
            json = []
        for(let i=0;i<items.length;i++){
            if(items[i].id != obj.id){
                json.push(items[i])
            }
        }
        this.setState({items:json})
    }
    handleAdd =()=> {
        let items = this.state.items,
            text = this.state.value
        items.push({
            text:text,
            id:this.id()
        })
        this.setState({
            items:items,
            value : ''
        })
    }
    handleChange =(e)=> {
        this.setState({
            value:e.target.value
        })
    }
}
export default Todo