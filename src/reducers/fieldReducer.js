import { FETCH_FIELDS, SUBMIT_FORM, FORM_ERROR } from '../actions/types'

const initialState = {
    items: [],
    result: [],
    formError: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_FIELDS: // OK
            return {
                ...state,
                items: action.fields
            };
        case SUBMIT_FORM: //OK
            return {
                ...state,
                result: action.result
            }
        case FORM_ERROR: //OK
            return {
                ...state,
                formError: true
            }
        default:
            return state;
    }
}