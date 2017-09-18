import React from 'react'
import {
    Breadcrumb,
    Icon
} from 'antd'

import {Link} from 'react-router'
var Nav = React.createClass({
    render(){
        const {value} = this.props



        var to = ''
        const nodes = value.map(function (o,i) {
            to = to + '/' + o

            return (
                <Breadcrumb.Item href="" key={i}>
                    <Link to={to}>{o}</Link>
                </Breadcrumb.Item>
            )
        })

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href="">
                        <Link to={'/'}>
                            <Icon type="home" />home
                        </Link>
                    </Breadcrumb.Item>

                    {nodes}
                </Breadcrumb>
            </div>
        )
    }
})

export default Nav