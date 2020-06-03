// combine all our reducers

import { combineReducers } from 'redux';
import fieldReducer from './fieldReducer'

export default combineReducers({
    fields: fieldReducer,
})