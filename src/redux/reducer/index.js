import { combineReducers } from 'redux';
import status from './login';
import todo from './data';  
import jobForm from './CompanyJobsForm';
import AppliedJob from './AppliedJobs';

const rootreducer = combineReducers({
    status: status,
    todo : todo,
    jobForm: jobForm,
    AppliedJob:AppliedJob

});
export default rootreducer;