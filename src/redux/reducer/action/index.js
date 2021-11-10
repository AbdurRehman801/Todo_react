export const isLoggedIn = (data) => {
    return {
        type: "STATUS",
        payload: data
    }
};
