
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import RoomTopScreen from '../../components/room/RoomTopScreen'
import * as RoomAction from '../../modules/room'

const display = "RoomTopScreen"
const component = RoomTopScreen

const initialProps = {
    rooms: [],
    authors: [],
    page: 1,
    isLoading: false,
    user: {}
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
    getRoomList: () => {
        dispatch(RoomAction.getRoomList(ownProps.page))
    }
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidMount() {
        this.props.getRoomList()
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