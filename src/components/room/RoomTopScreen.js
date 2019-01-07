import React, { Component, Fragment } from 'react'
import { StyleSheet, css } from 'aphrodite'
import Headers from '../common/Header'


export default class RoomTopScreen extends Component {
    render() {
        const {
            message,
            handleChange,
            echo
        } = this.props
        const headerNav = {
            uri: "/rooms/new",
            title: "新規作成"
        }
        return (
            <Fragment>
               <Headers title="ルームリスト" nav={headerNav} />
               
            </Fragment>
        )
    }
}
