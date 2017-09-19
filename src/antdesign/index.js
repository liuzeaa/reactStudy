import React from 'react'
import 'antd/dist/antd.css';
import Action from './Action';
import request from 'superagent';

import {Table,Button,Modal,message} from 'antd'

const header = [
    {title:'id',dataIndex:'id'},
    {title:'name',dataIndex:'name'},
    {title:'age',dataIndex:'age'},
    {title:'sex',dataIndex:'sex'},
    {
        title:'single',
        dataIndex:'single',

        render:(single, obj)=>(
            <div>
                {obj.name} 这只 {single ? '单身狗':'恩爱狗'}
                是个{obj.sex} 他今年{obj.age}岁了
            </div>
        )
    },
]


const api = 'http://101.200.129.112:9527/react1/student/'

console.log(request)



class ReactTest extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading : false,
            items :[],
            name:'',
            age:'',
            sex:'boy',
            single:true,

            action:null,
            selectedRowKeys: [],
        }
    }
    onSelectChange = (selectedRowKeys)=> {
        var id = selectedRowKeys[0]
        if(!id){
            this.setState({
                selectedRowKeys: selectedRowKeys
            })
            return
        }
        var items = this.state.items
        const obj = items.filter((item)=>{
            return item.id===id
        })
        this.setState({
            selectedRowKeys:selectedRowKeys ,
            name:obj[0].name,
            age:obj[0].age,
            sex:obj[0].sex,
            single:obj[0].single,
        });
    }

    render() {
        var selectedRowKeys = this.state.selectedRowKeys
        var rowSelection = {
            selectedRowKeys:selectedRowKeys,
            onChange: this.onSelectChange,
        };
        var disabled = selectedRowKeys.length !==1

        return (
            <div className="dongnao">
                <h3>动脑学院学生信息系统</h3>

                <div className="content">
                    <Button icon="plus" type='primary' onClick={(e)=>this.setState({action:'add'})}>增加</Button>&nbsp;
                    <Button icon='edit' disabled={disabled} onClick={(e)=>this.setState({action:'edit'})} type='ghost'>编辑</Button>&nbsp;
                    <Button icon='delete' disabled={disabled} onClick={this.handleDelete} type='danger'>删除</Button>
                    <br/><br/>
                    <Table
                        loading={this.state.loading}
                        columns={header}
                        rowSelection={rowSelection}
                        dataSource={this.state.items}/>
                </div>

                <Action
                    name={this.state.name}
                    age={this.state.age}
                    sex={this.state.sex}
                    single={this.state.single}
                    onChange={this.handleChange}
                    onAdd={this.handleSave}
                    onEdit={this.handleEdit}
                    action={this.state.action}

                    visible={!!this.state.action}

                    onCancel={(e)=>this.setState({action:null})}
                />

            </div>
        )
    }
    handleEdit = ()=>{
        var that = this
        var id = that.state.selectedRowKeys[0]
        var obj = {
            name:that.state.name,
            sex:that.state.sex,
            age:that.state.age,
            single:that.state.single
        }
        var editRequest = api + id + '/';
        debugger;
        request
            .patch(editRequest)
            .send(obj)
            .end(function (err, res) {
                var items = that.state.items

                items= items.map(function (o) {
                    if(o.id === id){
                        obj.id= o.id;
                        obj.key = o.id;
                        o = obj;
                    }
                    return o
                })

                that.setState({
                    items:items,
                    action:null,
                    selectedRowKeys:[]
                })
                message.success('成功更新数据'+id)
            })
    }
    handleDelete=()=>{
        var that = this
        Modal.confirm({
            title:'删除学生信息',
            content:'你确定要删除这条学生记录吗？该操作很危险，请小心使用',
            onOk:function () {
                message.success('成功删除了一条数据')
                var id = that.state.selectedRowKeys[0]
                console.log(id)
                var deleteRequest = api + id + '/'
                console.log(deleteRequest)
                request
                    .delete(deleteRequest)
                    .end(function (err, res) {
                        var items = []
                        var student = that.state.items
                        for(var i=0;i<student.length;i++){
                            if(student[i].id !== id){
                                items.push(student[i])
                            }
                        }
                        that.setState({
                            items:items
                        })
                        message.success('成功删除数据'+id)
                    })
            }
        })
    }
    handleSave=()=>{
        var that = this
        var data = {
            name : this.state.name,
            age : this.state.age,
            sex : this.state.sex,
            single : this.state.single
        }
        request
            .post(api)
            .send(data)
            .end(function (err, res) {
                var item = res.body
                item.key = item.id
                var items = that.state.items
                items.unshift(res.body)
                that.setState({
                    items:items,
                    action:null,
                    selectedRowKeys:[]
                })
                message.success('成功添加数据'+item.name)
            })
    }
    handleChange=(e,type)=>{
        var value = e.target.value,
            obj = {}
        obj[type] = value
        this.setState(obj)
    }
    componentDidMount(){

        var that = this

        this.setState({
            loading:true
        })
        request
            .get(api)
            .end(function (err,res) {

                if(err){return console.log(err)}

                res.body = res.body.map(function (obj) {
                    obj.key = obj.id
                    return obj
                })
                console.log(res.body)
                that.setState({
                    items:res.body,
                    loading:false
                })
            })
    }
}


export default ReactTest
