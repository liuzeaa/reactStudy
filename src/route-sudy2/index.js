import React from 'react'
import ReactDOM from 'react-dom'
import { Menu, Icon, Switch ,Row,Col} from 'antd';
const SubMenu = Menu.SubMenu;
import {
    Router,
    Route,
    hashHistory ,
    browserHistory,
    IndexRoute,
    Redirect,
    Link,
    IndexLink
}from 'react-router';

import Todo from './homework/todomvc'
import Component from './homework/component'
import Student from './homework/student'

class Sider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme:'light'
        }
    }
    changeTheme=(value)=>{
        this.setState({
            theme:value?'dark':'light'
        })
    }
    handleClick(e){

    }
    render(){
        return (
            <div>
                <Switch onChange={this.changeTheme} checkedChildren="Dark" unCheckedChildren="Light"/>
                <Menu theme={this.state.theme}
                      onClick={this.handleClick}
                      selectedKey={[this.state.current]}
                      mode="inline"
                >
                    <Menu.Item key="totomv"><Link activeStyle={{color:'red'}} to="todomv">todo-mvc</Link></Menu.Item>
                    <Menu.Item key="component"><Link activeStyle={{color:'red'}} to="component">自定义组件</Link></Menu.Item>
                    <Menu.Item key="student"><Link activeStyle={{color:'red'}} to="student">学生信息管理系统</Link></Menu.Item>
                </Menu>
            </div>
        )
    }
}

class R extends React.Component{
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Student}/>
                    <Route path="todomvc" component={Todo}/>
                    <Route path="component" component={Component}/>
                    <Route path="student" component={Student}/>
                </Route>
            </Router>
        )
    }
}
class App extends React.Component{
    render(){
        return (
            <div>
                <Sider/>
                {this.props.children}
            </div>
        )
    }
}



class RouteStudy2 extends React.Component{
    render(){
        return (
            <div>
                <R/>
            </div>
        )
    }
}


export default RouteStudy2