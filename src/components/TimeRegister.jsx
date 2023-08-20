
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export default function TimeRegister({ rowId, timeRegister, deleteRow }) {
    
    const [initialTime, setInitialTime] = useState(timeRegister.initialTime);
    const [endTime, setEndTime] = useState(timeRegister.endTime);
    const [endTimeDisabled, setEndTimeDisabled] = useState(timeRegister.endTime === null ? true : false);
    const [minDate, setMinDate] = useState(undefined);

    const handleInitialTime = (e) => {
        setInitialTime(e.value);

        let disableEndTime = e.value === null ? true : false;
        setEndTimeDisabled(disableEndTime);

        let minDate = e.value === null ? undefined : e.value;
        setMinDate(minDate);
    };

    const handleEndTime = (e) => {
        setEndTime(e.value);
    };

    const handleDeleteRow = () => {
        deleteRow(rowId);
    };

    return (
        <div id={rowId} className="grid grid-cols-6 gap-3 place-content-center place-items-center">
            <div id="initialTime" className="col-start-2 col-span-2">
                <label htmlFor="calendar-timeonly-start" className="block">Entrada</label>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-clock"></i>
                    </span>
                    <Calendar id="calendar-timeonly-start" value={initialTime} onChange={handleInitialTime} timeOnly
                        inputClassName="p-inputtext-sm" />
                </div>
            </div>
            <div id="endTime" className="col-span-2">
                <label htmlFor="calendar-timeonly-end" className="block">Salida</label>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-clock"></i>
                    </span>
                    <Calendar id="calendar-timeonly-end" value={endTime} onChange={handleEndTime} timeOnly 
                        disabled={endTimeDisabled} minDate={minDate} inputClassName="p-inputtext-sm" />
                </div>
            </div>
            <div className="place-self-start">
                <p className="text-white">dasdas</p>
                <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Delete" onClick={handleDeleteRow} />
            </div>
        </div>
    )
}
        