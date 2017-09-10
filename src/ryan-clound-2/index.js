import React from 'react'

import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import 'antd/dist/antd.css'

import request from 'superagent'
import FileList from './file-list'
import Nav from './nav'
import Menu from './menu'
import {getFileList,rename} from './api'
import './index.css'

import {
    Router,
    Route,
    hashHistory
} from 'react-router';

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
            active:''
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
                    action={{

                    }}
                    active={this.state.active}
                    onPick={(name)=>this.setState({active:name})}
                    loading={this.state.loading}
                    onRename={this.rename}
                />
                <Menu
                    display={this.state.menu.display}
                    x={this.state.menu.x}
                    y={this.state.menu.y}
                    onClickRename={(e)=>console.log(this.state.active)}
                />
            </div>
        )
    },
    mouseDown(e){
        if(e.button == 2){
            this.setState({
                menu:{
                    x:e.clientX,
                    y:e.clientY,
                    display:true
                }
            })
        }else {
            console.log('zhuomian click')
            this.setState({
                menu:{
                    x:e.clientX,
                    y:e.clientY,
                    display:false,
                },
                active:''
            })
        }
    },
    rename(query){
        rename(query,function () {
            console.log('success ful')
        })
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