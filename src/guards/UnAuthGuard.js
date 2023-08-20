import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import routes from '../resources/routes';
import { getUser } from '../repository/localStorage/LocalStorageUserRepository';

const UnAuthGuard = ({component}) => {
    const { user } = React.useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (getUser() !== null) {
            navigate(routes.HOME);
        }
    }, [component]);

    return <React.Fragment>{component}</React.Fragment>
}

export default UnAuthGuard;