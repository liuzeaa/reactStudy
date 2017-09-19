import React from 'react'
import _ from 'underscore'

import Nav from './nav'
import Menu from './menu'
import Action from './action'
import FileList from './filelist'
import {getFileList,rename,newFolder,remove,paste,cut} from './api'
import './index.css'
import 'antd/dist/antd.css'
import {
    Router,
    Route,
    hashHistory
} from 'react-router';
import {Modal,message} from 'antd'

class R extends React.Component{
 render(){
     return (
         <Router history={hashHistory}>
             <Route path='*' component={Cloud}/>
         </Router>
     )
 }
}
class Cloud extends React.Component{
    constructor(props){
        super(props)
        this.state={
            file:[],
            copyItem:{},
            cutItem:{},
            path:[],
            loading:false,
            menu:{
                x:0,
                y:0,
                display:false
            },
            active:'',
            actionType:null,
            newValue:'',
            showAction:false
        }
    }
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
                    onPick={this.pickItem}
                    onCopy={this.copyItem}
                    loading={this.state.loading}
                    onRename={this.rename}
                />
                <Menu
                    display={this.state.menu.display}
                    x={this.state.menu.x}
                    y={this.state.menu.y}
                    canNewFolder={true}
                    canRename={!!this.state.active}
                    canDelete={!!this.state.active}
                    canCopy={this.state.active}
                    canPaste={_.keys(this.state.copyItem).length || _.keys(this.state.cutItem).length}
                    canCut={this.state.active}
                    onAction={(type)=>this.handleAction(type)}
                />
                <Action
                    visible={this.state.showAction}
                    type={this.state.actionType}
                    oldValue={this.state.active}
                    onChange={(e)=>this.setState({newValue:e.target.value})}
                    newValue={this.state.newValue}
                    onCancel={(e)=>this.hideAction()}

                    onRename={this.handleRename}
                    onNewFolder={this.handleNewFolder}
                />
            </div>
        )
    }

    deleteFile=()=>{
        var path = this.state.path.join('/') +'/' +  this.state.active
        var query = {
            path:path
        }
        var that = this
        Modal.confirm({
            title:'是否想删除这个文件',
            content:'该操作很危险，请小心',
            onOk:function () {
                remove(query,function (res) {
                    var file = that.state.file
                    var json = []
                    for(var i=0;i<file.length;i++){
                        if(file[i].name !== that.state.active){
                            json.push(file[i])
                        }
                    }

                    that.setState({
                        file:json
                    })
                    that.hideAction()
                    message.success('成功删除文件(夹)'+that.state.active)
                })
            },
            onCancel:function () {
                alert('cancel')
            }
        })


    }

    handleRename=(name)=>{
        var path = this.state.path.join('/') +'/' +  this.state.active
        var query = {
            name:name,
            path:path
        }
        var that = this
        rename(query,function (res) {
            console.log(res)
            var file =that.state.file
            var json = []
            file.map(function (obj) {
                if(obj.name === that.state.active){
                    json.push(res)
                }else {
                    json.push(obj)
                }
                return json
            })
            that.setState({
                file:json
            })
            that.hideAction()
            message.success('成功重命名文件'+that.state.active+'--->'+name)
            that.pickItem(name)
        })
    }
    handleNewFolder=(name)=>{
        console.log('handleNewFolder',name)
        var that =this
        var path = this.state.path.join('/')
        newFolder({
            name:name,
            path:path
        },function (res) {
            var file = that.state.file
            file.push(res)
            that.setState({file:file})
            that.hideAction()
            message.success('成功新建夹'+name)
        })
    }

    handleAction=(type)=>{
        var that = this
        this.hideMenu()
        this.setState({
            actionType:type
        })
        var times=0;
        var {file} = this.state;
        var item = {};
        var has = false
        if(type === 'newFolder'){
            file.map(function (obj) {
                if(/^新建文件夹/.test(obj.name)){
                    times++
                }
                return times
            })
            times = !times ? '' : times
            this.setState({
                newValue:'新建文件夹'+times
            })
            this.showAction()
        }

        if(type === 'rename'){
            this.setState({
                newValue:this.state.active
            })
            this.showAction()
        }

        if(type === 'delete'){
            this.deleteFile()
        }

        if(type === 'copy'){
            file.map(function (obj) {
                if(obj.name === that.state.active){
                    item = obj
                }
                return item
            })
            that.setState({
                copyItem:item
            })
            message.success('已经复制文件'+that.state.active+'到剪切板')
        }

        if(type === 'cut'){
            file.map(function (obj) {
                if(obj.name === that.state.active){
                    item = obj
                }
                return item;
            })
            that.setState({
                cutItem:item
            })
            message.success('已经复制文件'+that.state.active+'到剪切板')
        }

        if(type === 'paste'){
            var isCopy = !!_.keys(this.state.copyItem).length,
                isCut = !!_.keys(this.state.cutItem).length
            if(isCopy){
                for(var i=0;i<file.length;i++){
                    if(file[i].name === item.name){
                        has = true
                    }
                }
                var query={
                    old_path:that.state.copyItem.path,
                    new_path:that.state.path.join('/')+'/'+that.state.copyItem.name
                }
                if(has){
                    query.new_path = that.state.path.join('/')+'/'+that.state.copyItem.name+'-1'
                }
                paste(query,function (res) {
                    file.push(res)
                    that.setState({
                        file:file
                    })
                    message.success('成功复制文件'+that.state.active)
                },function () {
                    console.log('paste failed')
                })
            }
            if(isCut){
                for(var j=0;j<file.length;j++){
                    if(file[j].name === item.name){
                        has = true
                    }
                }
                if(has){
                    query.new_path = that.state.path.join('/')+'/'+that.state.cutItem.name+'-1'
                }
                cut(query,function (res) {
                    file.push(res)
                    that.setState({
                        file:file
                    })
                    message.success('成功复制文件'+that.state.active)
                },function () {
                    console.log('paste failed')
                })
            }
        }
    }
    showAction=()=>{
        this.setState({showAction:true})
    }
    hideAction=()=>{
        this.setState({showAction:false})
    }
    pickItem=(name)=>{
        this.setState({active:name,newValue:name})
    }
    unPickItem=(name)=>{
        this.setState({active:'',newValue:''})
    }
    showMenu=(e)=>{
        this.setState({
            menu:{
                x:e.clientX,
                y:e.clientY,
                display:true
            }
        })
    }
    hideMenu=()=>{
        this.setState({
            menu:{
                display:false,
            },
        })
    }
    mouseDown=(e)=>{
        if(e.button === 2){
            this.showMenu(e)
        }else {
            this.hideMenu(e)
            this.unPickItem()
        }
    }
    getFile=(path)=>{

        var that = this
        that.setState({
            loading:true
        })

        getFileList(path,function (res) {
            that.setState({
                file:res.file,
                path:res.path.split('/'),
                loading:false
            })
        },function (err) {
            console.log('err',err)
        })
    }
    componentDidMount(){

        const {params} = this.props
        const {splat} = params
        this.getFile(splat)
        console.log('componentDidMount',splat)
    }
    componentWillReceiveProps(nextProps){
        const {params} = nextProps
        const {splat} = params
        this.getFile(splat)
        console.log('componentWillReceiveProps',splat)
    }
}



export default R