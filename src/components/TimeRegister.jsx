
import React, { useState, useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';

export default function TimeRegister({ rowId, timeRegister, deleteRow, editRow }) {

    useEffect(() => {
        setInitialTime(timeRegister.initial);
        setEndTime(timeRegister.end);
        setEndTimeDisabled(timeRegister.end === null ? true : false);
        setMinDate(timeRegister.initial === null ? undefined : timeRegister.initial);
    }, [timeRegister, ]);

    const [initialTime, setInitialTime] = useState(timeRegister.initial ?? {hours: null, minutes: null});
    const [endTime, setEndTime] = useState(timeRegister.end ?? {hours: null, minutes: null});
    const [endTimeDisabled, setEndTimeDisabled] = useState(timeRegister.end === null ? true : false);
    const [minDate, setMinDate] = useState(undefined);

    const handleInitialTime = (e) => {
        setInitialTime({
            hours: e.value?.getHours(),
            minutes: e.value?.getMinutes()
        });

        let disableEndTime = e.value === null ? true : false;
        setEndTimeDisabled(disableEndTime);

        editRow(rowId, {
            initial: {
                hours: e.value?.getHours(),
                minutes: e.value?.getMinutes()
            },
            end: endTime
        });
    };

    const handleEndTime = (e) => {
        setEndTime({
            hours: e.value?.getHours(),
            minutes: e.value?.getMinutes()
        });
        editRow(rowId, {
            initial: initialTime,
            end: {
                hours: e.value?.getHours(),
                minutes: e.value?.getMinutes()
            }
        });
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
                    <Calendar id="calendar-timeonly-start" value={new Date(0,0,1,initialTime.hours, initialTime.minutes)} onChange={handleInitialTime} timeOnly
                        inputClassName="p-inputtext-sm" />
                </div>
            </div>
            <div id="endTime" className="col-span-2">
                <label htmlFor="calendar-timeonly-end" className="block">Salida</label>
                <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                        <i className="pi pi-clock"></i>
                    </span>
                    <Calendar id="calendar-timeonly-end" value={new Date(0,0,1,endTime.hours, endTime.minutes)} onChange={handleEndTime} timeOnly 
                        disabled={endTimeDisabled} inputClassName="p-inputtext-sm" />
                </div>
            </div>
            <div className="place-self-start">
                <p className="text-white">dasdas</p>
                <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Delete" onClick={handleDeleteRow} />
            </div>
        </div>
    )
}
        