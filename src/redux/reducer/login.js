

const data = {
    loginStatus: false,
    user: null,
};

const status = (state = data, action) => {
    switch (action.type) {
        case 'STATUS':
            return { ...action.payload };

        default:
            return state;
    }
};

export default status;