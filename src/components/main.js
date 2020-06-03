import React from 'react'
import './main.css'
import axios from 'axios'
import Form from './form'

const CORSanywhere = 'https://cors-anywhere.herokuapp.com/'
const formApi = 'https://ansible-template-engine.herokuapp.com/form'

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            fieldsObtained: false,
            apiError: false,
            fields: []
        }

        this.loadFormFields = this.loadFormFields.bind(this)
    }

    // load form fields
    async loadFormFields() {
        const res = await axios.get(`${CORSanywhere}${formApi}`)
            .catch((error) => {
                console.log('Error occured:', error);
                return false;
            })

        if (!res) {
            return this.setState({
                apiError: true
            })
        } else {
            console.log(res.data);
            this.setState({
                fieldsObtained: true,
                apiError: false,
                fields: res.data,
            })
        }
    }

    componentWillMount() {
        this.loadFormFields(this.state.currentPage)
    }

    render() {
        return (
            <React.Fragment>
                <div className="welcome">
                    <h1 className="header">Welcome to the Form App!</h1>
                    <p className="headerText">This is a small web development project, built as a technical assessment to Redape Solution's application for the Software Developer role. The app is built using React and vanilla CSS (no bootstrap). The API endpoint of interest can be found <a href="https://ansible-template-engine.herokuapp.com/form">here</a>. It returns a list of fields to be rendered as a form, which users are then able to fill in and submit. On submit, the app simply outputs the values on the page as json. The API also occassionally returns code 500 errors at random times which the app is supposed to handle.</p>
                </div>
                {
                    this.state.apiError &&
                    <p className="sessionText loginError">Error while obtaining form fields. Please refresh the page.</p>
                }
                {
                    this.state.fieldsObtained &&
                    <Form fields={this.state.fields}></Form>
                }
            </React.Fragment>
        )
    }
}

export default Main;