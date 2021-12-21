export const isLoggedIn = (data) => {
  return {
    type: "STATUS",
    payload: data,
  };
};
export const todoDatas = (todoData) => {
  return {
    type: "TODO",
    payload: todoData,
  };
};
export const jobsDatas = (jobsData) => {
  return {
    type: "JOBS",
    payload: jobsData,
  };
};
export const Apply = (AppliedJob) => {
  return {
    type: "APPLYJOB",
    payload: AppliedJob,
  };
};
