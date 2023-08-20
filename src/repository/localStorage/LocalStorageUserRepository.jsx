/**
 * Cerca l'usuari de login en el context, sino el troba el busca a la local storage
 */
function getUser() {
    return localStorage.getItem("user");
};

/**
 * Guarda l'usuari al local storage
 */
function setUser(user) {
    localStorage.setItem("user", user.accessToken);
};

function removeUser() {
    localStorage.removeItem("user");
}

export {
    getUser,
    setUser,
    removeUser
}