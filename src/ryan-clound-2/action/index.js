import React from 'react'

import {Table,Button,Modal,Form,Input,Radio,Row,Col,message} from 'antd'
const FormItem = Form.Item
var Action = React.createClass({
    render(){
        const {visible,action,onNew,onRename,onCancel,oldValue,newValue,onChange} = this.props

        var onOk = this.getOk()
        var title = this.getTitle()
        return (
            <div>
                <Modal
                    visible={visible}
                    title={title}
                    onCancel={onCancel}
                    onOk={onOk}
                >
                    <Input value={newValue} onChange={onChange}/>

                </Modal>
            </div>
        )
    },
    getOk(){
        const {visible,action,onNew,onRename,onCancel,oldValue,newValue,onChange} = this.props
        if(action == 'rename'){
            return ()=>onRename(newValue)
        }
        if(action == 'newFolder'){
            return ()=>onNew(newValue)
        }

        return function () {
            console.log('unkonwn action')
        }
    },
    getTitle(){
        const {visible,action,onNew,onRename,oldValue,newValue} = this.props
        if(action == 'rename'){
            return '给文件'+oldValue+'重命名'
        }
        if(action == 'newFolder'){
            return '新建文件夹'
        }
        return 'unknown action'
    }
})

export default Action