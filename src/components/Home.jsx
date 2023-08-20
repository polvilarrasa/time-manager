import React, { useState } from 'react'
import Header from './Header'
import Calendari from './Calendari'
import TimeRegister from './TimeRegister'
import { Button } from 'primereact/button'

const Home = () => {

    const emptyTimeRegister = {
        initialTime: null,
        endTime: null
    };

    const rowsData = [
        {
            initialTime: new Date(2023,8,19,8,0,0),
            endTime: new Date(2023,8,19,10,0,0)
        },
        {
            initialTime: new Date(2023,8,19,10,0,0),
            endTime: new Date(2023,8,19,12,0,0)
        }
    ];

    const [rows, setRows] = useState(rowsData);

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
                <Calendari />
            </div>
            <div className="grid justify-center mt-2">
                <span className="p-buttonset">
                    <Button label="Añadir" icon="pi pi-plus" size='small' onClick={addRow} />
                    <Button label="Eliminar todo" icon="pi pi-trash" size='small' onClick={deleteAllRows} />
                    <Button label="Guardar" icon="pi pi-save" size='small' onClick={handleSave} />
                </span>
            </div>
            <div className="justify-center mt-3 grid-flow-row auto-rows-max grid">
                {rows.length > 0 ? 
                    rows.map((timeRegister, index) => (
                        <TimeRegister key={index} rowId={index} timeRegister={timeRegister} deleteRow={deleteRow} />
                    )) 
                    : <TimeRegister key={0} rowId={0} timeRegister={emptyTimeRegister} deleteRow={deleteRow} />
                }
            </div>
        </div>
    )
}

export default Home