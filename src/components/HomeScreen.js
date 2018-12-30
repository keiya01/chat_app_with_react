import React, { Component } from 'react'

export default class HomeScreen extends Component {
    render() {
        const {
            message,
            handleChange,
            echo
        } = this.props
        return (
            <div onClick={echo}>
                {(() => {
                    console.log(this.props)
                })()}
                <p onClick={() => handleChange("message", "Hello World")}>{message}</p>
            </div>
        )
    }
}
