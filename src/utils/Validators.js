const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const weakPasswordValidator = (password) => {
    // must be longer than 6 chars
    // must contain a number
    // must contain a uppercase letter
    // must contain a lowercase letter
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    return re.test(password);
};

const passwordsEqualValidator = (password, passwordConfirmation) => {
    return password === passwordConfirmation;
};

export { emailValidator, weakPasswordValidator, passwordsEqualValidator };