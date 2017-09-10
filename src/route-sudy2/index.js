import React from 'react'
import ReactDOM from 'react-dom'
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

const Sider = React.createClass({
    getInitialState() {
        return {
            theme: 'light',
        };
    },
    changeTheme(value) {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    },
    handleClick(e) {
        // console.log('click ', e);
        // this.setState({
        //     current: e.key,
        // });
        // hashHistory.push(e.key)
    },
    render() {
        return (
            <div>
                <Switch onChange={this.changeTheme} checkedChildren="Dark" unCheckedChildren="Light" />
                <br />
                <br />
                <Menu theme={this.state.theme}
                      onClick={this.handleClick}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >

                    <Menu.Item key="todomvc" ><Link activeStyle={{color:'red'}} to="todomvc">todo-mvc</Link></Menu.Item>
                    <Menu.Item key="component"><Link activeStyle={{color:'red'}} to="component">自定义组件</Link></Menu.Item>
                    <Menu.Item key="student"><Link activeStyle={{color:'red'}} to="student">学生信息管理系统</Link></Menu.Item>
                </Menu>
            </div>
        );
    },
});

var R = React.createClass({
    render:function () {
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
})
var App = React.createClass({
    render(){
        return(
            <div>
                <Sider/>
                {this.props.children}
            </div>
        )
    }
})



import { Menu, Icon, Switch ,Row,Col} from 'antd';
const SubMenu = Menu.SubMenu;









var RouteStudy2 = React.createClass({
    render:function () {
        return (
            <div>
                <R/>
            </div>
        )
    }
})

export default RouteStudy2