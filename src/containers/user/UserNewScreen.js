
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import UserFormScreen from '../../components/user/UserFormScreen'
import * as UserAction from '../../modules/user'

const display = "UserFormScreen"
const component = UserFormScreen

const initialProps = {
    name: "",
    email: "",
    password: "",
    description: "",
    isDisplay: false,
    isLogin: false,
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
    
    if(Object.keys(loginData).length === 0) {
        return
    }

    const error = loginData.error;
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
    createUser: (props) => {
        const data = {
            name: ownProps.name,
            email: ownProps.email,
            password: ownProps.password,
            description: ownProps.description
        }
        Promise.resolve(dispatch(UserAction.createUser(data))).then((state) => {
            if (Object.keys(state.user.data).length !== 0) {
                props.history.push("/", {
                    message: "ログインしました"
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