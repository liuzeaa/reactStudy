import React from 'react'
import './index.css'
const Panel = React.createClass({
    render(){
        return (
            <ul className="rightkey-menu"
                style={{display:this.props.display ? 'block' : 'none',
                    left:this.props.pos.x+'px',top:this.props.pos.y+'px'}}
                onClick={this.handleClick}
            >

                <li className="allow" >新建文件夹</li>
                <li className="allow" onClick={this.rename}>重命名</li>
                <li className="allow" >删除</li>
                <li className="allow" >复制</li>
                <li className="allow" >粘贴</li>
                <li className="allow" >粘贴</li>
            </ul>
        )
    }
})

export default Panel