const firebaseErrorCodes = {
    EMAIL_ALREADY_IN_USE_FIREBASE_ERROR: 'auth/email-already-in-use',
    INVALID_EMAIL_FIREBASE_ERROR: 'auth/invalid-email',
    WEAK_PASSWORD_FIREBASE_ERROR: 'auth/weak-password',
    POPUP_CLOSED_BY_USER_FIREBASE_ERROR: 'auth/popup-closed-by-user',
};

const errorMessages = {
    DEFAULT_ERROR: 'Ha ocurrido un error',
    EMAIL_ALREADY_IN_USE_ERROR: 'Este email ya está en uso',
    INVALID_EMAIL_ERROR: 'Formato de email inválido',
    WEAK_PASSWORD_ERROR: 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número',
    PASSWORDS_DO_NOT_MATCH_ERROR: 'Las contraseñas no coinciden',
    POPUP_CLOSED_BY_USER_ERROR: 'El usuario no completó el registro',
};

const calendarLocale = {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar'
};

export { firebaseErrorCodes, errorMessages, calendarLocale };
