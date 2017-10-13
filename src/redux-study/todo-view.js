import React from 'react'


//因为只有render方法，没有处理数据的逻辑了，现在我们把他叫
//展示性组件
import ReactDOM from 'react-dom';
export default class Todo extends React.Component{
    render(){
        const {items,dispatch,active} = this.props
        let nodes;
        if(active === 'all'){
            nodes = items.map((obj,id)=>{
                return (
                    <p key={id}>
                        <span  onClick={(e)=>dispatch({type:'active-item',text:obj.name})} style={{textDecoration:!obj.active?'line-through':''}}>{obj.name}</span>
                        <button onClick={(e)=>this.handleDelete(obj.name)}>删除</button>
                    </p>
                )
            })
        }
        if(active === 'active'){
            nodes = items.map((obj,id)=>{
                return obj.active ?  (
                    <p key={id}>
                        <span onClick={(e)=>dispatch({type:'active-item',text:obj.name})} style={{textDecoration:!obj.active?'line-through':''}}>{obj.name}</span>
                        <button onClick={(e)=>this.handleDelete(obj.name)}>删除</button>
                    </p>
                ) : null
            })
        }
        if(active === 'complete'){
            nodes = items.map((obj,id)=>{
                return !obj.active ?  (
                    <p key={id}>
                        <span  onClick={(e)=>dispatch({type:'active-item',text:obj.name})} style={{textDecoration:!obj.active?'line-through':''}}>{obj.name}</span>
                        <button onClick={(e)=>this.handleDelete(obj.name)}>删除</button>
                    </p>
                ) : null
            })
        }




        return(
            <div>
                <input onSubmit={this.submit} ref="input"/><button onClick={this.handleClick}>增加</button>
                <div>
                    {nodes}
                </div>
                <div>
                    <button onClick={(e)=>dispatch({type:'active',value:'all'})}>all</button>--
                    <button onClick={(e)=>dispatch({type:'active',value:'active'})}>active</button>--
                    <button onClick={(e)=>dispatch({type:'active',value:'complete'})}>complete</button>
                </div>
            </div>
        )
    }
    handleDelete = (name)=>{
        const {dispatch} = this.props
        dispatch({
            type:'remove',
            text:name
        })
    }
    handleClick=(e)=>{
        const {dispatch} = this.props
        var value = ReactDOM.findDOMNode(this.refs.input).value
        dispatch({
            type:'add',
            text:value
        })
    }
}
