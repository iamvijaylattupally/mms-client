import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext.js";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from "@schedule-x/calendar";
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import '@schedule-x/theme-default/dist/index.css';

const Calendar = () => {
    const { user } = useContext(AuthContext); 
    const calendar = useCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events: [
            {
                id: '1',
                title: 'Event 100',
                start: '2024-12-22 10:00', // Dec 22, 2024, at 10:30 AM
                end: '2024-12-22 11:00',   // Dec 22, 2024, at 12:00 PM
            },
            {
                id: '2',
                title: 'Event 99',
                start: '2024-12-23 10:00', // Dec 22, 2024, at 10:30 AM
                end: '2024-12-23 11:00',   // Dec 22, 2024, at 12:00 PM
            }
        ],
        calendars: {
            leisure: {
                colorName: 'leisure',
                lightColors: {
                    main: '#1c7df9',
                    container: '#d2e7ff',
                    onContainer: '#002859',
                },
                darkColors: {
                    main: '#c0dfff',
                    onContainer: '#dee6ff',
                    container: '#426aa2',
                },
            },
        },
        plugins: [createDragAndDropPlugin(), createEventModalPlugin()]
    });
    return (
        <>
            {user?.ismentor && (
                <div className="home">
                    <h1>Welcome Mentor</h1>
                    <p>Here you can view the list of students and their details.</p>
                </div>
            )}
            {user?.isadmin && (
                <div className="home">
                    <h1>Welcome Admin</h1>
                    <p>Here you can view the list of mentors and their details.</p>
                </div>
            )}
            {!user?.isadmin && !user?.ismentor && (
                <div style={{ width: '80%', height: '500px',marginTop:"30px", margin: 'auto' }}>
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            )}
        </>
    );
};

export default Calendar
