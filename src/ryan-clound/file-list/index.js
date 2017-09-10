import React from 'react'
import {Icon} from 'antd'
import './index.css'

import Loading from '../loading'

import fileType from './file-type'

const root = 'http://101.200.129.112:9527/static/'
var FileItem = React.createClass({
    render(){
        const {name,onChange,path,isFolder} = this.props
        const type = fileType(name,isFolder)
        console.log(type)
        return(
            <li className="file-item" onClick={this.handleClick}>
                <span className="file-item-icon">
                    <Icon type={type} />
                </span>
                <span className="file-item-name">{name}</span>
            </li>
        )
    },
    handleClick(){
        const {name,onChange,path,ext,isFolder} = this.props
        console.log(name,ext,isFolder)
        if(isFolder){
            onChange(path)
        }else {
            console.log(root+path)
            window.open(root+path)
        }
    }
})



var FileList = React.createClass({
    render(){
        const {path,file,onChange,loading,Load} = this.props
        var nodes = file.map(function (obj) {
            return (
                <FileItem
                    name={obj.name}
                    path={obj.path}
                    ext={obj.ext}
                    isFolder={obj.isFolder}
                    key={path+'-'+obj.name}
                    onChange={onChange}
                />
            )
        })



        if(loading){
            nodes = Load
        }

        return(
            <div className="file-content">
                <ul className="file-list" style={{display:loading?'none':'block'}}>
                    {nodes}
                </ul>

                <div style={{display:loading?'block':'none'}}>
                    <Loading/>
                </div>

            </div>

        )
    }
})
export default FileList