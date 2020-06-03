import React from 'react'
import './form.css'

import Output from './output'
// redux
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { submitForm, getSlug } from '../actions/fieldsActions'


class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            email: '',
            gender: '',
            state: '',
            contact: '',
            hidden: ''
        }
        this.initForm = this.initForm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        console.log('Next props:', nextProps);
        this.initForm(nextProps.fields)
    }

    initForm(fieldsArray) {
        fieldsArray.map((field, idx) => {
            let fieldSlug = getSlug(field)

            // if contain deault
            if (field.default) {
                this.setState({
                    [`${fieldSlug}`]: field.default
                })
            }
            // if hidden (no label)
            if (!field.label) {
                this.setState({
                    [`${fieldSlug}`]: field.value
                })
            }
        })
    }

    handleSubmit(event, fields) {
        event.preventDefault();

        const values = {
            email: this.state.email,
            gender: this.state.gender,
            state: this.state.state,
            contact: this.state.contact,
            hidden: this.state.hidden,
        }

        // call action // embeds result to this.props.result
        this.props.submitForm(this.props.fields, values)

        // resut form
        return this.setState({
            submitted: true,
            email: '',
            contact: '',
            hidden: '',
        })
    }

    handleChange(event, field) {
        event.preventDefault();
        if (event)
            return this.setState({
                submitted: false,
                [`${field}`]: event.target.value
            });
    }

    render() {
        return (
            <React.Fragment >
                <form onSubmit={(e) => this.handleSubmit(e, this.props.fields)} className="form">
                    {
                        this.props.fields.map((field, idx) => {
                            // bind to state values
                            let fieldSlug = getSlug(field)
                            return (
                                <>
                                    {
                                        (field.type === 'email' || field.type === 'telephone' || field.type === 'text') ?
                                            <div key={idx} className="inputContainer">
                                                <label>{field.label}</label>
                                                <input type={field.type}
                                                    value={this.state[`${fieldSlug}`]}
                                                    defaultValue={field.default}
                                                    placeholder={field.default}
                                                    className="input"
                                                    required={!field.isOptional}
                                                    hidden={field.isHidden}
                                                    onChange={(event) => { this.handleChange(event, fieldSlug) }}
                                                />
                                            </div> :
                                            // this is causing the key warning
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
                                                                checked={this.state[`${fieldSlug}`] === val}
                                                                onChange={(event) => { this.handleChange(event, fieldSlug) }}
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
                                            <select
                                                name={field.label}
                                                id={field.label}
                                                style={{ outline: 'none' }}
                                                value={this.state[`${fieldSlug}`]}
                                                onChange={(event) => { this.handleChange(event, fieldSlug) }}
                                            >
                                                {
                                                    field.value.map((val, idx) => {
                                                        return (
                                                            <>
                                                                {
                                                                    <option key={idx} value={val}>
                                                                        {val}
                                                                    </option>
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
                                                value={this.state[`${fieldSlug}`]}
                                                onChange={(event) => { this.handleChange(event, fieldSlug) }}
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
                {
                    this.state.submitted &&
                    <Output />
                }
            </React.Fragment >
        )
    }
}

// redux
const mapStateToProps = state => ({
    result: state.fields.result,
    fields: state.fields.items
})

Form.propTypes = {
    submitForm: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    result: PropTypes.array
}

export default connect(mapStateToProps, { submitForm })(Form)

