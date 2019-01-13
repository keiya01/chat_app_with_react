
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import RoomNewScreen from '../../components/room/RoomNewScreen'
import * as RoomAction from '../../modules/room'

const display = "RoomNewScreen"
const component = RoomNewScreen

const initialProps = {
    name: "",
    question: "",
    isLoading: false,
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
    echo: () => {
        return () => {
            console.log("ownProps: ", ownProps)
        }
    },
})

const mapStateToProps = (state) => {
    const user = state.user.data
    const {room} = state
    
    if (Object.keys(room).length > 0) {
        const {authors, roomData} = room.data.rooms
        return {
            user,
            authors,
            rooms: roomData,
        }
    }

    return {
        user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    createRoom: () => {
        const user = this.props.user
        const token = user.token
        dispatch(RoomAction.createRoom())
    }
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentWillMount() {
        const nextPath = this.props.location.pathname
        const user = this.props.user
        const history = this.props.history
        if ( Object.keys(user).length === 0 && nextPath === "/rooms/new" ) {
            history.push("/login", {
                message: "ログインしてください"
            })
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