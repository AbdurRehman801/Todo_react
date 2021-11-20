import { combineReducers } from 'redux';
import status from './login';
import todo from './data';  

const rootreducer = combineReducers({
    status: status,
    todo : todo
});
export default rootreducer;