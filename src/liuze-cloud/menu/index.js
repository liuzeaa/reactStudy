import React from 'react'
import './index.css'


export default class Menu extends React.Component{

    render(){
        const {canNewFolder,canRename,canDelete,canCopy,canPaste,canCut} = this.props
        return (
            <ul className="rightkey-menu"
                style={{display:this.props.display ? 'block' : 'none',
                    left:this.props.x+'px',top:this.props.y+'px'}}
                onClick={this.handleClick}
            >

                <li style={{display:this.getShow(canNewFolder)}} className="allow" onMouseDown={(e)=>this.mousedown(e,'newFolder')}>新建文件夹</li>
                <li style={{display:this.getShow(canRename)}} className="allow" onMouseDown={(e)=>this.mousedown(e,'rename')}>重命名</li>
                <li style={{display:this.getShow(canDelete)}} className="allow" onMouseDown={(e)=>this.mousedown(e,'delete')} >删除</li>
                <li style={{display:this.getShow(canCopy)}} className="allow" onMouseDown={(e)=>this.mousedown(e,'copy')} >复制</li>
                <li style={{display:this.getShow(canPaste)}} className="allow"  onMouseDown={(e)=>this.mousedown(e,'paste')}>粘贴</li>
                <li style={{display:this.getShow(canCut)}} className="allow"  onMouseDown={(e)=>this.mousedown(e,'cut')}>剪切</li>
            </ul>
        )
    }
    getShow=(bool)=>{
        if(bool){
            return 'block'
        }
        return 'none'
    }
    mousedown=(e,type)=>{
        const {onAction} = this.props
        e.preventDefault()
        e.stopPropagation()
        onAction(type)
    }
}
