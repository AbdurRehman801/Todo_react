export const isLoggedIn = (data) => {
    return {
        type: "STATUS",
        payload: data
    }
};
export const todoDatas = (todoData) =>{
    return{
        type: "TODO",
        payload: todoData
    }
};
