const jobsData = {
  
}

const jobForm = (state = jobsData, action) => {
    switch (action?.type) {
        case 'JOBS':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
};

export default jobForm;