import React, { useEffect, useState } from 'react'
import moment from 'moment'
export default function App() {
        const [calendarDate, setCalendarDate] = useState(moment());
        const [selectedDate, setSelectedDate] = useState(moment());
        const [selected, setSelected] = useState(moment().format('D'));

        const incrementMonth = () => {
          setCalendarDate(calendarDate.clone().add(1, 'month'));
        };

        const decrementMonth = () => {
          setCalendarDate(calendarDate.clone().subtract(1, 'month'));
        };

        const incrementDate = () => {
                let newSelectedDate = selectedDate.clone().add(1, 'day');

                if (newSelectedDate.date() === 1) {
                  // If the next day would be the 1st day of the next month
                  setCalendarDate(calendarDate.clone().add(1, 'month'));
                }

                setSelectedDate(newSelectedDate);
                setSelected(newSelectedDate.format('D'));
        };

        const decrementDate = () => {
            let newSelectedDate = selectedDate.clone().subtract(1, 'day');

            if (newSelectedDate.date() === 1) {
              // If the previous day would be the last day of the previous month
              setCalendarDate(calendarDate.clone().subtract(1, 'month'));
            }

            setSelectedDate(newSelectedDate);
            setSelected(newSelectedDate.format('D'));

        };

        const drawDatesgrid = () => {
            const monthDays = calendarDate.daysInMonth();
            const firstDay = calendarDate.startOf('month').format('d');

            let empty = [];

            // Getting empty cells data
            for (let i = 0; i < firstDay; i++) {
                empty.push(<td key={`${new Date().getTime()}${i}`} className="pt-6">{''}</td>);
            }

            let days = [];

            // Getting dates cells data
            for (let day = 1; day <= monthDays; day++) {
                const activeDate = day === +selected ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base text-white bg-indigo-700 rounded-full' : 'text-gray-500 dark:text-gray-100';
                days.push(<td key={day} onClick={() => onDateClick(day)}>
                    <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                        <p className={`w-8 h-8 text-base flex items-center justify-center font-medium ${activeDate}`}>{day}</p>
                    </div>
                </td>);
            }

            // Merging empty cells with dates cells
            let datesData = [...empty, ...days];

            let dateRows = [];
            let dateCells = [];

            // Mapping dates to each row object
            datesData.forEach((row, i) => {
                if (i % 7 !== 0) {
                    dateCells.push(row);
                } else {
                    dateRows.push(dateCells);
                    dateCells = [];
                    dateCells.push(row);
                }

                if (i === datesData.length - 1) {
                    dateRows.push(dateCells);
                }
            });

            // Creating array of rows elements
            return dateRows.map((datesRow, index) => (
                <tr key={index}>
                    {datesRow}
                </tr>
            ));
        };

        const dayLabels = () => {
            const days = moment.weekdaysShort();
            return days.map((day) => (
                <th key={day}>
                    <div className="w-full flex justify-center">
                        <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">{day}</p>
                    </div>
                </th>
            ));
        };

        const onDateClick = (date) => {
            const newCalendarDate = calendarDate.clone().date(date);
            setSelectedDate(newCalendarDate);
            setSelected(date);
        };

        return (
            <>
                <div className="flex items-center justify-center px-4">
                    <div className="w-full border rounded">
                        <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
                            <div className="px-4 flex items-center justify-between">
                                <span tabIndex="0" className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{calendarDate.format('MMMM')} {calendarDate.format('YYYY')}</span>
                                <div className="flex items-center">
                                    <button aria-label="calendar backward" className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100" onClick={decrementDate}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="15 6 9 12 15 18" />
                                        </svg>
                                    </button>
                                    <button aria-label="calendar forward" className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100" onClick={incrementDate}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="9 6 15 12 9 18" />
                                        </svg>
                                    </button>

                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-12 overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr>{dayLabels()}</tr>
                                    </thead>
                                    <tbody>{drawDatesgrid()}</tbody>
                                </table>
                            </div>
                        </div>
                        <div className="md:py-8 py-5 md:px-16 px-5 dark:bg-gray-700 bg-gray-50 rounded-b">
                            <div className="px-4">
                                <div className="border-b pb-4 border-gray-400 border-dashed">
                                    <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
                                    <a tabIndex="0" className="focus:outline-none text-base font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
                                    <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
                                </div>
                                <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
                                    <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">10:00 AM</p>
                                    <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Orientation session with new hires</a>
                                </div>
                                <div className="border-b pb-4 border-gray-400 border-dashed pt-5">
                                    <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">9:00 AM</p>
                                    <a tabIndex="0" className="focus:outline-none text-lg font-medium leading-5 text-gray-800 dark:text-gray-100 mt-2">Zoom call with design team</a>
                                    <p className="text-sm pt-2 leading-4 leading-none text-gray-600 dark:text-gray-300">Discussion on UX sprint and Wireframe review</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }