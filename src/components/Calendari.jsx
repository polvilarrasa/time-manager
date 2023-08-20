import React,{ useState } from 'react'
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { calendarLocale } from '../resources/literals';
import { createRegister, getRegistersByYearMonth } from '../repository/firestore/TimeRegisterFirestoreRepository';
const Calendari = () => {
    const [date, setDate] = useState(new Date());
    addLocale('es', calendarLocale);    
    //onMonthChange per quan s'hagi de posar el punt verd sobre els dies

    /*
    useEffect(()=>{
        getRegistersByYearMonth
    },[])
    */

    const filledDates = {
        18: [
            {
                initialTime: "08:00",
                endTime: "10:00"
            },
            {
                initialTime: "10:00",
                endTime: "12:00"
            }
        ],
        19: [
            {
                initialTime: "08:00",
                endTime: "10:00"
            },
            {
                initialTime: "10:00",
                endTime: "12:00"
            }
        ]
    };

    // should return ReactNode
    const dateTemplate = (date) => {
        let isDateFilled = false;
        isDateFilled = filledDates[date.day] ? true : false;
        return (
            <span className={isDateFilled ? 'filled-date' : 'empty-date'}>{date.day}</span>
        );
    };

    const handleOnChange = (e) => {
        setDate(e.value);
    };

    return (
        <>
            <Calendar inline maxDate={new Date()} locale='es' value={date}
                dateTemplate={dateTemplate} onChange={handleOnChange} />
        </>
    )
}

export default Calendari