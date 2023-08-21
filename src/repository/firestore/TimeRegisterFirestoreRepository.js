import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const createRegister = async (userId, timeRegister) => {
    await setDoc(doc(db, "time-register/", userId), timeRegister, { merge: true });
};

const getRegistersByUser = async (userId) => {
    let registers = {};
    const docRef = doc(db, "time-register", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        registers = docSnap.data();
    }
    return registers;
};

export {
    createRegister,
    getRegistersByUser
};