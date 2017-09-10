import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router'
var Nav = React.createClass({
    render(){
        var that = this


        var to = ''
        var nodes = this.props.value.map(function (o,i ) {
            to = to +'/' + o
            return (
                <Breadcrumb.Item key={i}>
                    <Link to={to}>{o}</Link>
                </Breadcrumb.Item>
            )
        })

        return(
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to={'/'}>home</Link>
                    </Breadcrumb.Item>
                    {nodes}
                </Breadcrumb>
            </div>
        )
    }
})
export default Nav