import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'

var Component = React.createClass({
    render:function () {
        return(
            <div>component
                <Link activeStyle={{color:'red'}} to="component">sss</Link>
            </div>
        )
    }
})

export default Component