import React from 'react'
import './form.css'

import Output from './output'


class Form extends React.Component {
    constructor() {
        super()
        this.state = {
            submitted: false,
            email: '',
            gender: '',
            state: '',
            contact: '',
            hidden: '',
            data: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.initForm = this.initForm.bind(this)
        this.getSlug = this.getSlug.bind(this)
        this.validate = this.validate.bind(this)
    }

    initForm() {
        // set default values
        this.props.fields.map((field, idx) => {
            let fieldSlug = this.getSlug(field)

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

    componentWillMount() {
        this.initForm()
    }

    getSlug(field) {
        return field.label ?
            `${field.label.split(" ")[0].toLowerCase()}` :
            'hidden'
    }

    validate(field, value) {
        let valid = true
        // check mandatory
        if (!field.isOptional && !value) valid = false
        // email has been validated by form

        // check value type
        if (field.type === 'telephone') {
            if (!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/))
                valid = false
        }
        // taken from
        // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript

        return valid
    }

    async handleSubmit(event, fields) {
        event.preventDefault();

        let result = []
        // create json object and store in list
        fields.map((field, idx) => {
            let fieldSlug = this.getSlug(field)
            let value = this.state[`${fieldSlug}`]
            let obj = {
                label: field.label ? field.label : '(no label)',
                value: value,
                isValid: this.validate(field, value)
            }
            result.push(obj)
        })

        // store result in state
        this.setState({
            submitted: true,
            data: result,
            // reset
            email: '',
            gender: '',
            state: '',
            contact: '',
            hidden: '',
        })

        // reinit form
        this.initForm()
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
                            let fieldSlug = this.getSlug(field)
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
                    <Output data={this.state.data} />
                }
            </React.Fragment >
        )
    }
}

export default Form

