

const validation = (values) => {
    let errors = {}
    if (!values.firstName || values.firstName === "") {
        errors.firstName = "firstName is Required"
    }
    if (!values.lastName || values.lastName === "") {
        errors.lastName = "LastName is Required"
    }
    if (!values.email || values.email === "") {
        errors.email = "email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "email is invalid"
    }
    if (!values.password || values.password === "") {
        errors.password = "Password is required"
    } else if (values.password.length < 6) {
        errors.password = "Password must be more than 6 character"
    } else if (values.password.length > 10) {
        errors.password = "Password must be less than 10 character"
    }
    return errors;
}
export default validation;
