import { combineReducers } from 'redux';
import status from './login';
import todo from './data';  
import jobForm from './CompanyJobsForm';

const rootreducer = combineReducers({
    status: status,
    todo : todo,
    jobForm: jobForm

});
export default rootreducer;