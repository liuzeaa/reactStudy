import React from 'react'

import {Provider} from 'react-redux'
import {createStore,compose} from 'redux'
import reducer from './reducer'
import Container from './todo-contianer'

//单一的reducer,等待传入的action 来处理数据


var store = createStore(reducer,compose(
    window.devToolsExtension()
))

export default class ReduxStudy extends React.Component{
    render(){
        return(
            <Provider store={store} >
                <Container/>
            </Provider>
        )
    }
}
