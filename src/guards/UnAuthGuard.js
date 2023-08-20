import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase';
import routes from '../resources/routes';
import { removeUser, setUser } from '../repository/localStorage/LocalStorageUserRepository';

const UnAuthGuard = ({ component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate(routes.HOME);
                setUser(user);
            } else {
                removeUser();
            }
        });
    }, [component]);

    return <React.Fragment>{component}</React.Fragment>
}

export default UnAuthGuard;