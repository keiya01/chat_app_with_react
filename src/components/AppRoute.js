import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import HomeScreen from '../containers/HomeScreen'


export default class AppRoute extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path='/' component={HomeScreen} />
                </div>
            </BrowserRouter>
        )
    }
}