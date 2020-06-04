import React from 'react'
import './main.css'
import Form from './form'

// redux
import { connect } from 'react-redux'
import { fetchFields } from '../actions/fieldsActions'
import PropTypes from 'prop-types'

class Main extends React.Component {
    componentWillMount() {
        this.props.fetchFields()
    }

    render() {
        return (
            <React.Fragment>
                <div className="welcome">
                    <h1 className="header">Welcome to the Form App!</h1>
                    <p className="headerText">This is a small web development project, built as a technical assessment to Redape Solution's application for the Software Developer role. The app is built using React and vanilla CSS (no bootstrap). The API endpoint of interest can be found <a href="https://ansible-template-engine.herokuapp.com/form">here</a>. It returns a list of fields to be rendered as a form, which users are then able to fill in and submit. On submit, the app simply outputs the values on the page as json. The API also occassionally returns code 500 errors at random times which the app is supposed to handle.</p>
                </div>
                {
                    this.props.error ?
                        <p className="sessionText loginError">Error while obtaining form fields. Please refresh the page.</p> :

                        <Form></Form>
                }
            </React.Fragment>
        )
    }
}

// redux
const mapStateToProps = state => ({
    fields: state.fields.items,
    error: state.fields.formError
})

Main.propTypes = {
    fetchFields: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    error: PropTypes.bool
}

// export default Main;
export default connect(mapStateToProps, { fetchFields })(Main);