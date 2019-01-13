
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import AppRoute from '../components/AppRoute'
import * as UserAction from '../modules/user'

const display = "AppRoute"
const component = AppRoute

const initialProps = {
    user: {},
}

// propsの値を変更する
const handleChange = (ownProps) => {
    return (name, value) => {
        return {
            [name]: value
        }
    }
}

// propsの変更を行うhandler
const stateHandler = {
    handleChange,
}

// propsの変更を行わないhandler
const handleProps = (ownProps) => ({
    validate: () => {
        return () => {
            console.log("ownProps: ", ownProps)
        }
    },
})

const mapStateToProps = (state) => {
    const loginData = state.user
    const token = loginData.token
    if (token) {
        localStorage.setItem("token", token)
    }

    const user = loginData.data ? loginData.data : {}
    return {
        user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    getUser: (token, props) => {
        Promise.resolve(dispatch(UserAction.getUser(token))).then((state) => {
            if(Object.keys(state.user.data).length === 0){
                props.history.push("/login", {
                    message: "ログインしてください"
                })
            }
        })
    }
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentWillMount() {
        // ユーザ情報の保存
        const token = localStorage.getItem("token")
        if (Object.keys(this.props.user).length === 0 && token) {
            this.props.getUser(token, this.props)
        }
    },

}

const Enhance = compose(
    setDisplayName(display),
    withStateHandlers(
        initialProps,
        stateHandler
    ),
    withHandlers(handleProps),
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    lifecycle(lifeCycle),
    pure,
)

export default Enhance(component)