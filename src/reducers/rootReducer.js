import todoReducer from './todoReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    todos:todoReducer
})

export default rootReducer