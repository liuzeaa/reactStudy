import React from 'react';

import {Provider,connect} from 'react-redux';
import {createStore,compose} from 'redux';
import reducer from './reducer';

var store = createStore(reducer,compose(
    window.devToolsExtension()
))

import Container from './todo-container';

export default class ReduxStudy extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        )
    }
}
