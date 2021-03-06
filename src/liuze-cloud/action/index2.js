import React from 'react';
import {Model,Input} from 'antd';

export  default class Action extends  React.Component{
    render(){
        const {newValue,onChange,onCancel,visible} = this.props;
        var title = this.getTitle();
        var onOK = this.getOk();
        return (
            <Model
                title={title}
                visible={visible}
                onOk={(e)=>onOK(newValue)}
                onCancel={onCancel}
            >
                <Input value={newValue} onChange={onChange}/>
            </Model>
        )
    }
    getOk = ()=>{
        const {type,onRename,onNewFolder} = this.props;
        if(type==='rename'){
            return onRename;
        }
        if(type==='newFolder'){
            return onNewFolder
        }
        return '未知操作'
    }
    getTitle= ()=>{
        const {oldValue,type} = this.props;
        if(type==='rename'){
            return '给'+oldValue+'重命名'
        }
        if(type==='newFolder'){
            return '新建文件夹'
        }
        return '未知操作'
    }
}
