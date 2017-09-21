import React from 'react';
import {
    BreadCrumb,
    Icon
} from 'antd';

import {Link} from 'react-router';

export  default class Nav extends React.Component{
    render(){
        const {value} = this.props;
        var to = '';
        const nodes = value.map(function(o,i){
            to = to+'/'+o
            return (
                <BreadCrumb.Item href="" key={i}>
                    <Link to={to}>{o}</Link>
                </BreadCrumb.Item>
            )
        })
        return(
            <div>
                <BreadCrumb>
                    <BreadCrumb.Item href="">
                        <Link to={'/'}>
                            <Icon type="home"/>home
                        </Link>
                    </BreadCrumb.Item>
                    {nodes}
                </BreadCrumb>
            </div>
        )
    }
}
