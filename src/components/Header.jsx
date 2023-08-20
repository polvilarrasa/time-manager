import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import routes from '../resources/routes';
import { removeUser } from '../repository/localStorage/LocalStorageUserRepository';


function Header() {
    const auth = getAuth();
    const navigate = useNavigate();
    const handleLogout = () => {               
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate(routes.LOGIN);
            removeUser(null);
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
            console.log("Error signing out", error)
        });
    }

    const start = <img alt="logo" src="/logo.png" height="40" width="50" className="mr-2"></img>;
    const end = <Button label="Logout" icon="pi pi-fw pi-power-off" onClick={handleLogout} size='small'
                    severity='secondary' text />

    return (
        <div className="card h-50">
            <Menubar start={start} end={end} />
        </div>
    )
}

export default Header;