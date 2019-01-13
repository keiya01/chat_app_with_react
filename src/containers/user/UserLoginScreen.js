
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import UserFormScreen from '../../components/user/UserFormScreen'
import * as UserAction from '../../modules/user'

const display = "UserFormScreen"
const component = UserFormScreen

const initialProps = {
    user: {},
    isDisplay: false,
    message: "",
    email: "",
    password: "",
    isLogin: true,
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
    
    const error = loginData.error
    if(error && error.isError) {
        return {
            message: error.message
        }
    }

    const token = loginData.token
    if (token) {
        localStorage.setItem("token", token)
    }
    const user = loginData.data
    return {
        user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogin: (props) => {
        const {
            email,
            password,
        } = ownProps
        Promise.resolve(dispatch(UserAction.login({ email, password }))).then((state) => {
            if(Object.keys(state.user.data).length !== 0) {
                props.history.push("/", {
                    message: "ログインしました",
                })
            }else {
                props.handleChange("isDisplay", true)
            }
        })

    }
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentWillMount() {
        const nextPath = this.props.location.pathname
        const user = this.props.user
        const history = this.props.history
        console.log("location: ", nextPath)
        if (Object.keys(user).length !== 0 && nextPath === "/login") {
            history.push("/", {
                message: "すでにログインしています"
            })
        }
    },
    componentDidMount() {
        
    },
    componentWillUnmount() {
        console.log("unmount!!")
        
        this.props.handleChange("isDisplay", false)
    }

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