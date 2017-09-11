import React from 'react'
import {Link} from 'react-router'


export default class Component extends React.Component{
    render(){
        return (
            <div>component
                <Link activeStyle={{color:'red'}} to="component">sss</Link>
            </div>
        )
    }
}