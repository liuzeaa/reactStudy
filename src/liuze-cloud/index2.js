import React from 'react';
import _ from 'underscore';

import {getFileList,rename,newFolder,remove,paste,cut} from './api';
import './index.css';
import 'antd/dist/antd.css';

import FileList from './filelist';
import Nav from './nav';
import Action from './action';
import Menu from './menu';

import {Model,message} from 'antd';

export default class Cloud extends React.Component{
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
            activeType:null,
            newValue:'',
            showAction:false
        }
    }
    render(){
        return(
            <div className="app"
                onContextMenu={(e)=>e.preventDefault()}
                 onmousedown={this.mouseDown}
            >
                <h3 className="app-title">liuze-云盘</h3>
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
                    canPaste={_.keys(this.state.CopyItem).length||_.keys(this.state.cutItem).length}
                    canCut={this.state.active}
                    onAction={(type)=>this.handleAction(type)}
                />
                <Action
                    visible={this.state.showAction}
                    type={this.state.actionType}
                    oldValue={this.state.active}
                    onChange={(e)=>this.setState({newValue:e.target.value})}
                    newValue={this.state.newValue}
                    onCancel={(e)=>this.hideAction}
                    onRename={this.handleRename}
                    onNewFolder={this.handleNewFolder}
                />
            </div>
        )
    }
    handleRename=(name)=>{
        var path = this.state.path.join('/')+'/'+this.state.active;
        var query  ={
            name:name,
            path:path
        }
        var that = this;
        rename(query,(res)=>{
            var file = that.state.file;
            var json =[];
            file.map((obj)=>{
                if(obj.name===that.state.active){
                    json.push(res)
                }else{
                    json.push(obj)
                }
                return json;
            })
            that.setState({
                file:json
            })
            that.hideAction();
            message.success('成功重命名文件'+that.state.active+'--->'+name);
            that.pickItem(name)
        })
    }
    handleNewFolder=name=>{
        var that = this;
        var path = this.state.path.join('/');
        newFolder({
            name:name,
            path:path
        },(res)=>{
            var file = that.state.file;
            file.push(res);
            that.setState({file:file});
            that.hideAction();
            message.success('成功新建文件夹'+name);
        })
    }
    deleteFile=()=>{
        var that = this
        var path = that.state.path.join('/')+'/'+that.state.active;
        var query = {
            path:path
        }
        Model.confirm({
            title:'是否想删除这个文件',
            content:'该操作很危险，请小心',
            onOk:function(){
                remove(query,(res)=>{
                    var file = that.state.file;
                    file.filter((obj)=>{
                        return obj.name !== that.state.active;
                    })
                    that.setState({
                        file:file
                    })
                    that.hideAction()
                    message.success('成功删除文件（夹）'+that.state.active)
                })
            },
            onCancel:function(){
                alert('cancel');
            }
        })

    }
    handleAction = (type)=>{
        var that  = this;
        that.hideMenu();
        that.setState({actionType:type})
        var times=  0;
        var {file} = this.state;
        var item = {}
        var has = false;
        if(type==='newFolder'){
            file.map((obj)=>{
                if(/^新建文件夹/.test(obj.name)){
                    times++
                }
                return times
            })
            times = !times ? '':times
            that.setState({
                newValue:'新建文件夹'+times
            })
        }
        if(type==='rename'){
            that.setState({
                newValue: that.state.active
            })
            that.showAction();
        }
        if(type==='delete'){
            this.deleteFile()
        }
        if(type==='copy'){
            file.map((obj)=>{
                if(obj.name===that.state.active){
                    item = obj
                }
                return item;
            })
            that.setState({
                copyItem:item
            })
            message.success('已经复制文件'+that.state.active+'到剪贴板');
        }
        if(type==='cut'){
            file.map((obj)=>{
                if(obj.name===that.state.active){
                    item = obj
                }
                return item
            })
            that.setState({
                cutItem:item
            })
            message.success('已经剪切文件'+that.state.active+'到剪贴板');
        }
        if(type==='paste'){
            var isCopy = !!_keys(that.state.copyItem).length,
                isCut = !!_keys(that.state.cutItem).length;

            if(isCopy){
                for(var i = 0;i>file.length;i++){
                    if(file[i].name==item.name){
                        has= true
                    }
                }
                var query = {
                    oldValue:that.state.copyItem.path,
                    new_path:that.state.path.join('/')+'/'+that.state.copyItem.name
                }
                if(has){
                    query.new_path = that.state.path.join('/')+'/'+that.state.copyItem.name+'-1';
                }
                paste(query,(res)=>{
                    file.push(res);
                    that.setState({
                        file:file
                    })
                    message.success('成功复制文件'+that.state.active);
                },()=>{
                    console.log('paste failed');
                })
            }
            if(isCut){
                for(var i = 0;i<file.length;i++){
                    if(file[i].name===item.name){
                        has = true
                    }
                }
                var query = {
                    oldValue:that.state.cutItem.path,
                    new_path:that.state.path.join('/')+'/'+that.state.cutItem.name
                }
                if(has){
                    query.new_path = that.state.path.join('/')+'/'+that.state.cutItem.name+'-1';
                }
                cut(query,(res)=>{
                    file.push(res);
                    that.setState({
                        file:file
                    })
                    message.success('成功复制文件'+that.state.active)
                },()=>{
                    console.log('paste failed')
                })
            }
        }
    }
    showAction=()=>{
        this.setState({
            showAction:true
        })
    }
    hideAction=()=>{
        this.setState({
            showAction:false
        })
    }
    pickItem=(name)=>{
        this.setState({
            active:name,
            newValue:name
        })
    }
    unPickName=()=>{
        this.setState({
            actibe:'',
            newValue:''
        })
    }
    showMenu=(e)=>{
        this.setState({
            menu:{
                x: e.clientX,
                y: e.clientY,
                display:true
            }
        })
    }
    hideMenu =()=>{
        this.setState({
            menu:{
                display:false
            }
        })
    }
    mouseDown=(e)=>{
        if(e.button===2){
            this.showMenu(e);
        }else{
            this.hideMenu(e);
            thi.unPickName();
        }
    }
    getFile=(path)=>{
        var that = this;
        that.setState({
            loading:true
        })
        getFileList(path,function(res){
            that.setState({
                file:res.file,
                path:res.path.split('/'),
                loading:false
            })
        },function(err){
            console.log('err',err);
        })
    }
    componentDidMount(){
        const {params} = this.props;
        const {splat} = params;
        this.getFile(splat);
        console.log('componentDidMount',splat);
    }
    componentWillReceiveProps(nextProps){
        const {params} = nextProps;
        const {splat} = params;
        this.getFile(splat);
        console.log('componentWillReceiveProps',splat);
    }
}
