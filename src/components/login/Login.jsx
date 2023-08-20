import React, { useContext, useState } from 'react';
import { GoogleAuthProvider, getAuth, inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { TEInput, TERipple } from "tw-elements-react";
import routes from '../../resources/routes';
import { GlobalContext } from '../../context/GlobalState';
import { setUser } from '../../repository/localStorage/LocalStorageUserRepository';
import { createRegister } from '../../repository/firestore/TimeRegisterFirestoreRepository';

export default function Login() {
    const { userActions } = React.useContext(GlobalContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate(routes.HOME)
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    const signInWithGoogle = async () => {
        try {
           
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("user",user)
            setUser(user.acessToken);
            const timeRegister = {
                2023: {
                    3: "pepe",
                    4: "pepe",
                }
            };
            createRegister(user.uid, timeRegister);
            navigate(routes.HOME);
        } catch (err) {
            console.error(err);
        }
    };

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
                        <h2 className="text-4xl font-medium leading-tight mb-3">Iniciar sesión</h2>
                        <form>
                            {/* <!-- Email input --> */}
                            <TEInput
                                type="email"
                                label="Email"
                                size="lg"
                                className="mb-6"
                                onChange={(e) => setEmail(e.target.value)}
                            ></TEInput>

                            {/* <!--Password input--> */}
                            <TEInput
                                type="password"
                                label="Contraseña"
                                className="mb-6"
                                size="lg"
                                onChange={(e) => setPassword(e.target.value)}
                            ></TEInput>

                            {/* <!-- Submit button --> */}

                            <TERipple rippleColor="light" className="w-full">
                                <button
                                    type="button"
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={onLogin}
                                >
                                    Iniciar sesión
                                </button>
                            </TERipple>

                            {/* <!-- Divider --> */}
                            <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                    O
                                </p>
                            </div>

                            {/* <!-- Social login buttons --> */}
                            <TERipple rippleColor="light" className="w-full">
                                <a
                                    className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    style={{ backgroundColor: "#ea4335" }}
                                    href="#!"
                                    role="button"
                                    onClick={signInWithGoogle}
                                >
                                    {/* <!-- Google --> */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-3.5 w-3.5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Google
                                </a>
                            </TERipple>
                        </form>
                        <p>
                            Aún no tienes cuenta?{' '}
                            <NavLink to="/register" className={"underline text-primary"} >
                                Registro
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}