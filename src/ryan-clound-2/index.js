import React from 'react'
import request from 'superagent'
import FileList from './file-list'
import Nav from './nav'
import Menu from './menu'
import Action from './action'
import {getFileList,rename,mkdir,remove} from './api'
import './index.css'

import {
    Router,
    Route,
    hashHistory
} from 'react-router';
import 'antd/dist/antd.css'
import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;



var R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='*' component={Cloud}/>
            </Router>
        )
    }
})



var Cloud = React.createClass({
    getInitialState:function () {
        return {
            file:[],
            path:[],
            loading:false,
            menu:{
                x:0,
                y:0,
                display:false
            },
            active:'',
            newValue:'',
            action:null,
            showAction:false
        }
    },
    render(){
        return(
            <div className="app"
                 onContextMenu={(e)=>e.preventDefault()}
                 onMouseDown={this.mouseDown}
            >
                <h3 className="app-title">ryan-云盘</h3>
                <Nav
                    value={this.state.path}
                />
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    active={this.state.active}
                    onPick={(name)=>this.pickItem(name)}
                    loading={this.state.loading}
                />
                <Menu
                    display={this.state.menu.display}
                    x={this.state.menu.x}
                    y={this.state.menu.y}
                    onAction={(action)=>this.menuClick(action)}
                />
                <Action
                    action={this.state.action}
                    onRename={this.rename}
                    onNew={this.newFolder}
                    oldValue={this.state.active}
                    newValue={this.state.newValue}
                    visible={this.state.showAction}
                    onCancel={this.hideAction}
                    onChange={(e)=>this.setState({newValue:e.target.value})}
                />

            </div>
        )
    },
    menuClick(action){
        var hasPicked = !!this.state.active
        if(action == 'rename' && !hasPicked){
            Modal.error({
                title:'文件重命名',
                content:'请右键选中你要命名的文件(夹)'
            })
            return
        }

        if(action == 'rename' || action == 'newFolder'){
            this.setState({action:action})
            this.showAction()
            return
        }
        if(action == 'delete' && !hasPicked){
            Modal.error({
                title:'文件删除',
                content:'请右键选中你要命名的文件(夹)'
            })
            return
        }
        if(action == 'delete'){
            this.deleteFile()
        }

        this.hideMenu()
    },
    mouseDown(e){
        if(e.button == 2){
            this.showMenu(e)
        }else {
            this.hideMenu()
            this.unPickItem()
        }
    },
    deleteFile(){
        var that = this
        var path = this.state.path.join('/')+'/'+this.state.active
        remove({
            path:path
        },function () {
            var file = []
            var f = that.state.file
            for(var i=0;i<f.length;i++){
                if(f[i].name!=that.state.active){
                    file.push(f[i])
                }
            }
            message.success('操作成功')
            that.setState({file})
            that.unPickItem()
        })
    },
    rename(newName){
        var path = this.state.path.join('/')+'/'+this.state.active

        var query = {
            name:newName,
            path:path
        }
        var that = this
        rename(query,function (res) {
            that.hideAction()
            var file = that.state.file.map(function (obj) {

                if(obj.name == that.state.active){
                    obj = res
                }
                return obj
            })
            message.success('操作成功')
            that.setState({file:file})
            that.pickItem(newName)
            that.hideAction()
        })
    },
    newFolder(name){
        var that = this
        var path = this.state.path.join('/')+'/'+this.state.active
        mkdir({
            path:path,
            name:name
        },function (res) {
            var file = that.state.file
            file.push(res)
            that.setState({file})
            that.pickItem(name)
            that.hideAction()
            message.success('操作成功')
        })
    },
    showAction(){
        this.setState({showAction:true})
    },
    hideAction(){
        this.setState({showAction:false})
    },
    showMenu(e){
        this.setState({
            menu:{
                x:e.clientX,
                y:e.clientY,
                display:true
            }
        })
    },
    hideMenu(){
        this.setState({menu:{display:false}})
    },
    pickItem(name){
        this.setState({active:name,newValue:name})
    },
    unPickItem(){
        this.setState({active:'',newValue:name})
    },
    getFile(path){

        var that = this
        that.setState({
            loading:true
        })

        getFileList(path,function (res) {
            console.log(res)
            that.setState({
                file:res.file,
                path:res.path.split('/'),
                loading:false
            })
        },function (err) {
            console.log('err',err)
        })
    },
    componentDidMount(){

        const {params} = this.props
        const {splat} = params
        this.getFile(splat)
        console.log('componentDidMount',splat)
    },
    componentWillReceiveProps(nextProps){
        const {params} = nextProps
        const {splat} = params
        this.getFile(splat)
        console.log('componentWillReceiveProps',splat)
    }
})





export default R