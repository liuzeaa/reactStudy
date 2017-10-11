import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Container from  './container';
import reducer from './reducer2';

var store = createStore(reducer);

export  default class ReduxStudy extends React.Component{
    render(){
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        )
    }
}