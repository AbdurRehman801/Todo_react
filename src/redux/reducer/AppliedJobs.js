const apply = {
  
}

const AppliedJob = (state = apply, action) => {
    switch (action?.type) {
        case 'APPLYJOB':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
};

export default AppliedJob;