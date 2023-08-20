import { collection, setDoc, getDocs, doc, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const createRegister = async (userId, timeRegister) => {
    try {
        await setDoc(doc(db, "time-register/", userId), timeRegister, { merge: true });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const getRegistersByYearMonth = async (userId, year, month) => {
    const registers = [];
    const querySnapshot = await getDocs(collection(db, "register/" + userId + "/" + year + "/" + month));
    console.log(querySnapshot);
    return registers;
};

export {
    createRegister,
    getRegistersByYearMonth
};