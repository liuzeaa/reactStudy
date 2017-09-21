import React from 'react';
import {Icon} from 'antd';
import './index.css';

export default class loading extends React.Component{
    render(){
        return(
            <div className="loading">
                <div className="loading-content">
                    <span className="loading-icon">
                        <Icon type="loading" />
                    </span>
                    <p>正在加载...</p>
                </div>
            </div>
        )
    }
}

