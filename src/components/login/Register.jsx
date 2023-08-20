import React, { useState } from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { NavLink, useNavigate } from 'react-router-dom';
import { Message } from "primereact/message";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

import { errorMessages, firebaseErrorCodes } from "../../resources/literals";
import routes from "../../resources/routes";

import { emailValidator, weakPasswordValidator, passwordsEqualValidator } from '../../utils/Validators';

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailAlreadyInUseError, setEmailAlreadyInUseError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);
    const [weakPasswordError, setWeakPasswordError] = useState(false);
    const [passwordsDoNotMatchError, setPasswordsDoNotMatchError] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        
        let errors = false;
        setEmailAlreadyInUseError(false);
        setInvalidEmailError(false);
        setWeakPasswordError(false);
        setPasswordsDoNotMatchError(false);

        if (!emailValidator(email)) {
            setInvalidEmailError(true);
            errors = true;
        }

        if (!weakPasswordValidator(password)) {
            setWeakPasswordError(true);
            errors = true;
        }

        if (!passwordsEqualValidator(password, confirmPassword)) {
            setPasswordsDoNotMatchError(true);
            errors = true;
        }
        
        if (errors) {
            return;
        }

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate(routes.LOGIN);
            })
            .catch((error) => {
                const errorCode = error.code;
                switch (errorCode) {
                    case firebaseErrorCodes.EMAIL_ALREADY_IN_USE_FIREBASE_ERROR:
                        setEmailAlreadyInUseError(true);
                        break;
                    case firebaseErrorCodes.INVALID_EMAIL_FIREBASE_ERROR:
                        setInvalidEmailError(true);
                        break;
                    case firebaseErrorCodes.WEAK_PASSWORD_FIREBASE_ERROR:
                        setWeakPasswordError(true);
                        break;
                    default:
                        alert(errorMessages.DEFAULT_ERROR)
                        break;
                }
            });
    }

    return (
        <section className="h-screen">
            <div className="container h-full px-6 py-24">
                <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
                    {/* <!-- Left column container with background--> */}
                    <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
                        <img
                            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    {/* <!-- Right column container with form --> */}
                    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                        <h2 className="text-4xl font-medium leading-tight mb-3">Register</h2>
                        <div className="error-messages grid gap-1 mb-3">
                            <Message severity="error" text={errorMessages.EMAIL_ALREADY_IN_USE_ERROR} style={{ display: emailAlreadyInUseError ? 'block' : 'none' }} />
                            <Message severity="error" text={errorMessages.INVALID_EMAIL_ERROR} style={{ display: invalidEmailError ? 'block' : 'none' }} />
                            <Message severity="error" text={errorMessages.WEAK_PASSWORD_ERROR} style={{ display: weakPasswordError ? 'block' : 'none' }} />
                            <Message severity="error" text={errorMessages.PASSWORDS_DO_NOT_MATCH_ERROR} style={{ display: passwordsDoNotMatchError ? 'block' : 'none' }} />
                        </div>
                        <form>
                            {/* <!-- Email input --> */}
                            <TEInput
                                type="email"
                                label="Email address"
                                size="lg"
                                className="mb-6"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></TEInput>
                            
                            {/* <!--Password input--> */}
                            <TEInput
                                type="password"
                                label="Password"
                                className="mb-6"
                                size="lg"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></TEInput>
                            {/* <!--Confirm Password input--> */}
                            <TEInput
                                type="password"
                                label="Confirm Password"
                                className="mb-6"
                                size="lg"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            ></TEInput>

                            {/* <!-- Submit button --> */}

                            <TERipple rippleColor="light" className="w-full">
                                <button
                                    type="button"
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={onSubmit}
                                >
                                    Register
                                </button>
                            </TERipple>
                        </form>
                        <p>
                            Already have an account?{' '}
                            <NavLink to="/login" className={"underline text-primary"} >
                                Log in
                            </NavLink>
                        </p>  
                    </div>
                </div>
            </div>
        </section>
    );
}
