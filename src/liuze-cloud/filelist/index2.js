import React from 'react';
import {Icon} from 'antd';
import './index.css';
import {hashHistory} from 'react-router';
import loading from '../loading';
const host = 'http://101.200.129.112.:9527/static';

function getIcon(ext,isFolder){
    if(isFolder){
        return 'folder'
    }
    switch (ext){
        case '.html':
            return 'code'
        case '.css':
            return 'code'
        case '.js':
            return 'code'
        case '.jpg':
            return 'picture'
        case '.png':
            return 'picture'
        case '.gif':
            return 'picture'
        default:
            break
    }
    return 'frown-o'
}

class FileItem extends React.Component{
    render(){
        const {name,ext,isFolder,active} = this.props;
        const type = getIcon(ext,isFolder);
        const act = name===active;
        return(
            <li className={act?'file-item active':'file-item'}>
                <span
                    className="file-item-icon"
                    onClick={this.handleClick}
                    onMouseDown={this.mousedown}
                >
                    <Icon type={type} />
                </span>
                <span className="file-item-name">{name}</span>
            </li>
        )
    }
    mousedown=(e)=>{
        const {name,onPick} = this.props;
        if(e.button===2){
            onPick(name)
        }
    }
    handleClick=()=>{
        const {name,path,isFolder,onPick} = this.props;
        onPick(name);
        if(isFolder){
            hashHistory.push(path)
        }else{
            window.open(host+path);
        }
    }
}

export default class FileList extends  React.Component{
    render(){
        const {path,file,onChange,loading,Load,action,onRename,active,onPick}  = this.props;
        var nodes  =file.map((obj)=>{
            return (
                <FileItem
                    name={obj.name}
                    path={obj.path}
                    ext={obj.ext}
                    isFolder={obj.isFolder}
                    key={path+'-'+obj.name}
                    onChange={onChange}
                    action={action}
                    onRename={onRename}
                    active={active}
                    onPick={onPick}
                />
            )
        })
        if(loading){
            nodes = Load
        }
        return (
            <div className="file-content">
                <ul className="file-list" style={{display:loading?'none':'block'}}>
                    {nodes}
                </ul>
                <div style={{display:loading?'block':'none'}}>
                    <Loading />
                </div>
            </div>
        )
    }
}
