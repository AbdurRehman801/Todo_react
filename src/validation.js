

const validation = (values) => {
    let errors = {}
    if (!values.firstName || values.firstName === "") {
        errors.firstName = "FirstName is Required"
    }
    if (!values.lastName || values.lastName === "") {
        errors.lastName = "LastName is Required"
    }
    if (!values.email || values.email === "") {
        errors.email = "Email is Required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid"
    }
    if (!values.password || values.password === "") {
        errors.password = "Password is Required"
    } else if (values.password.length < 6) {
        errors.password = "Password must be more than 6 character"
    } else if (values.password.length > 10) {
        errors.password = "Password must be less than 10 character"
    }
    if (!values.currentPassword || values.currentPassword === "") {
        errors.currentPassword = "Password is Required"
    } else if (values.currentPassword?.length < 6) {
        errors.currentPassword = "Password must be more than 6 character"
    } else if (values.currentPassword?.length > 10) {
        errors.currentPassword = "Password must be less than 10 character"
    }
    if (!values.newPassword || values.newPassword === "") {
        errors.newPassword = "Password is Required"
    } else if (values.newPassword?.length < 6) {
        errors.newPassword = "Password must be more than 6 character"
    } else if (values.newPassword?.length > 10) {
        errors.newPassword = "Password must be less than 10 character"
    }
    if (!values.companyName || values.companyName===""){
        errors.companyName = "This field is Required"
    }
    if (!values.email || values.email === "") {
        errors.email = "Email is Required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid"
    }
    if (!values.vacancies || values.vacancies){
        errors.vacancies = "This Field is required"
    }
    if (!values.dateOfApply || values.dateOfApply){
        errors.dateOfApply = "This Field is required"
    }
    if (!values.experience || values.experience===""){
        errors.experience = "This Field is Required"
    }
    if (!values.skills || values.skills===""){
        errors.skills = "This Field is Required"
    }
    if (!values.jobType || values.jobType===""){
        errors.jobType = "This Field is Required"
    }
    if (!values.description || values.description===""){
        errors.description = "This Field is Required"
    }
    if (!values.companyName || values.companyName===""){
        errors.companyName = "This field is Required"
    }
    if (!values.email || values.email === "") {
        errors.email = "Email is Required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is invalid"
    }
    if (!values.vacancies || values.vacancies===""){
        errors.vacancies = "This Field is required"
    }
    if (!values.dateOfApply || values.dateOfApply===""){
        errors.dateOfApply = "This Field is required"
    }
    if (!values.experience || values.experience===""){
        errors.experience = "This Field is Required"
    }
    if (!values.skills || values.skills===""){
        errors.skills = "This Field is Required"
    }
    if (!values.jobType || values.jobType===""){
        errors.jobType = "This Field is Required"
    }
    if (!values.description || values.description===""){
        errors.description = "This Field is Required"
    }
    if (!values.fullName || values.fullName===""){
        errors.fullName = "This Field is Required"
    }
    if (!values.fatherName || values.fatherName===""){
        errors.fatherName = "This Field is Required"
    }
    if (!values.address || values.address===""){
        errors.address = "This Field is Required"
    }
    if (!values.qualification || values.qualification===""){
        errors.qualification = "This Field is Required"
    }
    if (!values.phoneNumber || values.phoneNumber===""){
        errors.phoneNumber = "This Field is Required"
    }else if (values.newPassword?.length < 3000000000) {
        errors.newPassword = "Please Type Correct Format"
    } else if (values.newPassword?.length > 4999999999) {
        errors.newPassword = "Please Type Correct Format"
    }

    return errors;
}
export default validation;


    
