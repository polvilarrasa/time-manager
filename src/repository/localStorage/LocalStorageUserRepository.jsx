import { getAuth } from "firebase/auth";

/**
 * Cerca l'usuari de login en el context, sino el troba el busca a la local storage
 */
function getUser() {
    const auth = getAuth();
    return auth.currentUser;
};

/**
 * Guarda l'usuari al local storage
 */
function setUser(token) {
    localStorage.setItem("user",token)
};

function removeUser() {
   const auth = getAuth();
   auth.signOut();
}

export {
    getUser,
    setUser,
    removeUser
}