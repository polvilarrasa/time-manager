import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar({ filledDates = {} }) {
    const [value, setValue] = useState(new Date());

    function onChange(nextValue) {
        setValue(nextValue);
    }

    function tileDisabled({ date, view }) {
        // disable all future dates
        return date > new Date();    
    }

    function tileClassName({ date, view }) {
        let stringDate = date.toLocaleDateString();
        // extract day, mont and year from dd/mm/yyyy using split / regex
        let day = stringDate.split("/")[0];
        let month = stringDate.split("/")[1];
        let year = stringDate.split("/")[2];

        let isDateFilled = filledDates[year] && 
            filledDates[year][month] && 
            filledDates[year][month][day];

        return isDateFilled ? "filled-date" : null;
    }

    return (
        <Calendar
            onChange={onChange}
            value={value}
            tileDisabled={tileDisabled}
            tileClassName={tileClassName}
        />
    );
}

export default MyCalendar;