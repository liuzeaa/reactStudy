import React from 'react'

import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd'
const FormItem = Form.Item
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
import 'antd/dist/antd.css'

import request from 'superagent'
import FileList from './file-list'
import Menu from './menu'
import Nav from './nav'

import {getFileList} from './api'
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
            pos:{
                show:false,
                x:0,
                y:0
            },
            loading:false
        }
    },
    render(){
        return(
            <div className="app" onContextMenu={(e)=>e.preventDefault()} onMouseDown={this.mouseDown}>
                <h3 className="app-title">ryan-云盘</h3>
                <Nav
                    value={this.state.path}
                    onChange={(path)=>hashHistory.push(path)}
                />
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    onChange={(path)=>hashHistory.push(path)}
                    loading={this.state.loading}
                />
                <Menu
                    display={this.state.pos.show}
                    pos={{x:this.state.pos.x,y:this.state.pos.y}}
                />
            </div>
        )
    },
    mouseDown(e){
        if(e.button ==2){
            this.setState({
                pos:{
                    show:true,
                    x:e.clientX,
                    y:e.clientY
                }
            })
        }else {
            this.setState({
                pos:{
                    show:false,
                    x:e.clientX,
                    y:e.clientY
                }
            })
        }

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
        console.log(splat)

    },
    componentWillReceiveProps(nextProps){
        const {params} = nextProps
        const {splat} = params
        this.getFile(splat)


    }
})





export default R