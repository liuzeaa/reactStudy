import React from 'react';
import {
    Router,
    Route,
    hashHistory
} from 'react-router';
import Cloud from './index';
export default class R extends React.Component{
    render(){
        return (
            <Router history={hashHistory}>
                <Route path='*' component={Cloud}/>
            </Router>
        )
    }
}
