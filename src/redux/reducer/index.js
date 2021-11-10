import { combineReducers } from 'redux';
import status from './login';

const rootreducer = combineReducers({
    status: status

});
export default rootreducer;