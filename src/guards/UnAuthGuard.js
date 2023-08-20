import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import routes from '../resources/routes';
import { getUser } from '../repository/localStorage/LocalStorageUserRepository';
import { onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '../firebase';

const UnAuthGuard = ({component}) => {
    const { user } = React.useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        const idToken = getUser();
        const checkRevoked=true

        auth
        .verifyIdToken(idToken, checkRevoked)
        .then((payload) => {
            navigate(routes.HOME);
        });
       // if (getUser() !== null) {
         //   navigate(routes.HOME);
       // }
    }, [component]);

    return <React.Fragment>{component}</React.Fragment>
}

export default UnAuthGuard;