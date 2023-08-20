import React, { useState } from 'react'
import Header from './Header'
import TimeRegister from './TimeRegister'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api';
import { calendarLocale } from '../resources/literals';
import { createRegister, getRegistersByYearMonth } from '../repository/firestore/TimeRegisterFirestoreRepository';
import { getUser } from '../repository/localStorage/LocalStorageUserRepository'

const emptyTimeRegister = {
    initialTime: null,
    endTime: null
};

const user = getUser();

const Home = () => {
    addLocale('es', calendarLocale);
    const filledDates = {}
    
    const dateTemplate = (date) => {
        let isDateFilled = false;
        isDateFilled = filledDates[date.day] ? true : false;
        return (
            <span className={isDateFilled ? 'filled-date' : 'empty-date'}>{date.day}</span>
        );
    };
    
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState(new Date());

    const rowsData = [];

    if (user !== null) {
        const rowsData = getRegistersByYearMonth(getUser().uid, date.getFullYear(), date.getMonth());
    }
    console.log(rowsData);

    const handleOnChange = (e) => {
        setDate(e.value);
    };

    const deleteRow = (index) => {
        const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)];
        setRows(newRows);
    };

    const addRow = () => {
        const newRows = [...rows, emptyTimeRegister];
        setRows(newRows);
    };

    const deleteAllRows = () => {
        setRows([]);
    };

    const handleSave = () => {
        alert('Guardado');
    };

    return (
        <div className="m-2">
            <Header />
            <div className="flex justify-center mt-3">
                <Calendar inline maxDate={new Date()} locale='es' value={date}
                    dateTemplate={dateTemplate} onChange={handleOnChange} />
            </div>
            <div className="grid justify-center mt-2">
                <span className="p-buttonset">
                    <Button label="Añadir" icon="pi pi-plus" size='small' onClick={addRow} />
                    <Button label="Eliminar todo" icon="pi pi-trash" size='small' onClick={deleteAllRows} />
                    <Button label="Guardar" icon="pi pi-save" size='small' onClick={handleSave} />
                </span>
            </div>
            <div className="justify-center mt-3 grid-flow-row auto-rows-max grid">
                {
                    rows.map((timeRegister, index) => (
                        <TimeRegister key={index} rowId={index} timeRegister={timeRegister} deleteRow={deleteRow} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home