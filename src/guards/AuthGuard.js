import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import routes from '../resources/routes';
import { getUser } from '../repository/localStorage/LocalStorageUserRepository';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const AuthGuard = ({ component }) => {
    const auth = getAuth();
    const { user } = React.useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        const idToken = getUser();
        const checkRevoked=true
        
        getAuth()
        .verifyIdToken(idToken, checkRevoked)
        .catch((error) => {
            navigate(routes.LOGIN);
        });
    }, []);

    return <React.Fragment>{component}</React.Fragment>
}

export default AuthGuard;