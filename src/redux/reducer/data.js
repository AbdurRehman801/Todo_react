const todoData = {
    items :[]
}

const todo = (state = todoData, action) => {
    switch (action?.type) {
        case 'TODO':
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
};

export default todo;