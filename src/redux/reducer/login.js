const data = {
    email:"",
    firstname:"",
    lastname: "",
    role:"",
    uid:"",
    gender: "",
    dateofbirth:"",

};

const status = (state = data, action) => {
    switch (action?.type) {
        case 'STATUS':
            return {
                ...state,
                ...action.payload
            }


        default:
            return state;
    }
};

export default status;