
import { compose, withStateHandlers, setDisplayName, lifecycle, pure, withHandlers } from 'recompose'
import { connect } from 'react-redux'

import SubmitButton from '../../components/common/SubmitButton'

const display = "SubmitButton"
const component = SubmitButton

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
}

const mapDispatchToProps = (dispatch, ownProps) => ({
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