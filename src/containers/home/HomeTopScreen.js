
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import HomeTopScreen from '../../components/home/HomeTopScreen'
import * as RoomAction from '../../modules/room'

const display = "HomeTopScreen"
const component = HomeTopScreen

const initialProps = {
    message: "Hello",
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
    return {
        ...state.room
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
})

// componentDidMountなどのライフサイクルを記述する
const lifeCycle = {
    componentDidMount() {
        console.log("componentDidMount_Success")
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