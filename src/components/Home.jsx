import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'
import TimeRegister from './TimeRegister'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Toast } from 'primereact/toast'
import { ProgressSpinner } from 'primereact/progressspinner'
import { addLocale } from 'primereact/api';
import { calendarLocale } from '../resources/literals';
import { createRegister, getRegistersByUser } from '../repository/firestore/TimeRegisterFirestoreRepository';
import { getUser } from '../repository/localStorage/LocalStorageUserRepository'

const emptyTimeRegister = {
    initial: {hours: null, minutes: null},
    end: {hours: null, minutes: null}
};

const user = getUser();

const Home = () => {
    const toast = useRef(null);

    const showAlert = (type, title, message) => {
        toast.current.show({ severity: type, summary: title, detail: message });
    };
    addLocale('es', calendarLocale);
    
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const registersPromise = getRegistersByUser(user?.uid);
        registersPromise.then((data) => {
            let firebaseData = data[date.getFullYear()][date.getMonth() + 1][date.getDate()];
            setRows(firebaseData ?? []);
            setIsLoading(false);
        });
    }, [date]);


    const dateTemplate = (date) => {
        let isDateFilled = false;
        console.log('rows', rows[date.year]?.[date.month + 1]?.[date.day]);
        isDateFilled = rows[date.year]?.[date.month + 1]?.[date.day] ? true : false;
        return (
            <span className={isDateFilled ? 'filled-date' : 'empty-date'}>{date.day}</span>
        );
    };

    const handleOnChange = (e) => {
        setDate(e.value);
        console.log('date', e.value);
    };

    const deleteRow = (index) => {
        const newRows = [...rows.slice(0, index), ...rows.slice(index + 1)];
        setRows(newRows);
    };

    const deleteAllRows = () => {
        setRows([]);
    };

    const addRow = () => {
        const newRows = [...rows, emptyTimeRegister];
        setRows(newRows);
    };

    const handleOnChangeRow = (index, value) => {
        const newRows = [...rows];
        newRows[index] = value;
        console.log('newRows', newRows);
        setRows(newRows);
    };

    const handleSave = () => {
        if (rows.length === 0) {
            showAlert('warn', 'Atención', 'No hay datos para guardar');
            return;
        }

        let timeRegister = {
            [date.getFullYear()]: {
                [date.getMonth() + 1]: {
                    [date.getDate()]: rows
                }
            }
        };
        try {
            createRegister(user?.uid, timeRegister);
            showAlert('success', 'Éxito', 'Se han guardado los datos');
        } catch (error) {
            showAlert('error', 'Error', 'No se pudo guardar los datos: ' + error);
        }
    };

    return (
        <div className="m-2">
            <Header />
            <Toast ref={toast} />
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
                    isLoading 
                    ? <ProgressSpinner /> 
                    : rows.map((timeRegister, index) => (
                        <TimeRegister key={index} rowId={index} timeRegister={timeRegister} 
                            deleteRow={deleteRow} editRow={handleOnChangeRow} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home