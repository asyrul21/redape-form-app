import React from 'react'
import './main.css'
import axios from 'axios'

//React Reveal Animation
// import Fade from 'react-reveal/Fade';

const CORSanywhere = 'https://cors-anywhere.herokuapp.com/'
const formApi = 'https://ansible-template-engine.herokuapp.com/form'

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            fieldsObtained: false,
            apiError: false,
            fields: [],
            values: {
                email: '',
                gender: '',
                state: '',
                contact: '',
                hidden: ''
            }
        }

        this.loadFormFields = this.loadFormFields.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                values: {
                    email: '',
                    gender: '',
                    state: '',
                    contact: '',
                    hidden: ''
                }
            })
        }
    }

    componentWillMount() {
        this.loadFormFields(this.state.currentPage)
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log('State fields: ' + this.state.fields);
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
                    <form onSubmit={this.handleSubmit} className="form">
                        {
                            this.state.fields.map((field, idx) => {
                                return (
                                    <>
                                        {
                                            (field.type === 'email' || field.type === 'telephone') ?
                                                <div key={idx} className="inputContainer">
                                                    <label>{field.label}</label>
                                                    <input type={field.type}
                                                        value={this.state.fields[`${field.label.split(" ")[0].toLowerCase()}`]}
                                                        defaultValue={field.default}
                                                        placeholder={field.default}
                                                        className="input"
                                                        required={!field.isOptional}
                                                        hidden={field.isHidden} />
                                                </div> :
                                                null
                                        }
                                        {
                                            field.type === 'radio' &&
                                            <div key={idx} className="radioContainer">
                                                {
                                                    field.value.map((val, idx) => {
                                                        return (
                                                            <div key={idx}>
                                                                <input
                                                                    type="radio"
                                                                    id={val}
                                                                    name={field.label}
                                                                    value={val}
                                                                    required={!field.isOptional} />
                                                                <label htmlFor={val}>{val}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        }
                                        {
                                            field.type === 'select' &&
                                            <div key={idx} className="selectContainer">
                                                <label htmlFor={field.label}>{field.label}:</label>
                                                <select name={field.label} id={field.label} style={{ outline: 'none' }}>
                                                    {
                                                        field.value.map((val, idx) => {
                                                            return (
                                                                <>
                                                                    {
                                                                        val === field.default ?
                                                                            <option key={idx}
                                                                                value={val}
                                                                                selected={val}
                                                                                defaultValue={val}>
                                                                                {val}
                                                                            </option> :
                                                                            <option key={idx} value={val}>{val}</option>
                                                                    }
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        }
                                        {
                                            field.type === 'hidden' &&
                                            <div key={idx} className="inputContainer">
                                                <label>{field.label}</label>
                                                <input type={field.type}
                                                    value={this.state.fields.hidden}
                                                    defaultValue={field.default}
                                                    placeholder={field.default}
                                                    className="input"
                                                    required={!field.isOptional}
                                                    hidden={field.isHidden} />
                                            </div>
                                        }
                                    </>
                                )
                            })
                        }
                        <input type="submit" value="Submit" className="submitButton" />
                    </form>
                }
            </React.Fragment>
        )
    }
}

export default Main;