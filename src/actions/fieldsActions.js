import { FETCH_FIELDS, SUBMIT_FORM, FORM_ERROR } from './types'
import axios from 'axios'

const CORSanywhere = 'https://cors-anywhere.herokuapp.com/'
const formApi = 'https://ansible-template-engine.herokuapp.com/form'

export function fetchFields() {
    return async function (dispatch) {
        console.log('Fetching fields...')
        const res = await axios.get(`${CORSanywhere}${formApi}`)
            .catch((error) => {
                console.log('Error occured:', error);
                // if error
                dispatch({
                    type: FORM_ERROR,
                    error
                })
                return false
            })
        if (res) {
            dispatch({
                type: FETCH_FIELDS,
                fields: res.data
            })
        }
    }
}

export const submitForm = (fields, SubmittedValues) => dispatch => {
    let result = []
    // create json object and store in list
    fields.map((field, idx) => {
        let fieldSlug = getSlug(field)
        let value = SubmittedValues[`${fieldSlug}`]
        let obj = {
            label: field.label ? field.label : '(no label)',
            value: value,
            isValid: validate(field, value)
        }
        result.push(obj)
    })
    // OK
    dispatch({
        type: SUBMIT_FORM,
        result: result
    })
}

function validate(field, value) {
    let valid = true
    // check mandatory
    if (!field.isOptional && !value) valid = false
    // email has been validated by form

    // check value format
    if (field.type === 'telephone') {
        if (!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/))
            valid = false
    }
    // taken from
    // https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript

    return valid
}

export function getSlug(field) {
    return field.label ?
        `${field.label.split(" ")[0].toLowerCase()}` :
        'hidden'
}

