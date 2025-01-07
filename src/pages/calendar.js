import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext.js";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
    createViewDay,
    createViewWeek,
    createViewMonthGrid,
    createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import "@schedule-x/theme-default/dist/index.css";
import "../pagescss/form.css";
import { BACKENDURL } from "../constants.js";

// Utility function to format dates to yyyy-mm-dd hh:mm
const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const Calendar = () => {
    const { user } = useContext(AuthContext);

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [events, setEvents] = useState([]);

    const calendar = useCalendarApp({
        views: [
            createViewDay(),
            createViewWeek(),
            createViewMonthGrid(),
            createViewMonthAgenda(),
        ],
        events, // Bind `events` state here
        plugins: [createDragAndDropPlugin(), createEventModalPlugin()],
    });

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${BACKENDURL}/api/v1/mentor/getevents`);
                if (response.status === 200) {
                    const formattedEvents = response.data.data.map((event) => ({
                        id: event._id,
                        title: event.title,
                        start: formatDate(event.start),
                        end: formatDate(event.end),
                    }));
                    setEvents(formattedEvents);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                alert("Failed to fetch events.");
            }
        };

        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const addEvent = async (e) => {
        e.preventDefault();

        const formattedEvent = {
            ...newEvent,
            start: formatDate(newEvent.start),
            end: formatDate(newEvent.end),
        };

        try {
            const response = await axios.post(
                `${BACKENDURL}/api/v1/mentor/addevent`,
                formattedEvent,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                const savedEvent = response.data.data;
                setEvents((prevEvents) => [
                    ...prevEvents,
                    {
                        id: savedEvent._id,
                        title: savedEvent.title,
                        start: formatDate(savedEvent.start),
                        end: formatDate(savedEvent.end),
                    },
                ]);
                setNewEvent({ title: "", start: "", end: "" });
                alert("Event added successfully!");
            } else {
                throw new Error("Failed to add event");
            }
        } catch (error) {
            console.error("Error adding event:", error);
            alert("Error adding event");
        }
    };

    return (
        <>
            {user?.ismentor && (
                <div className="center">
                    <div className="form">
                        <h2 className="form-title">Add New Event</h2>
                        <form onSubmit={addEvent}>
                            <div className="input-container">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Event Title"
                                    value={newEvent.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="datetime-local"
                                    name="start"
                                    placeholder="Start Date & Time"
                                    value={newEvent.start}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="datetime-local"
                                    name="end"
                                    placeholder="End Date & Time"
                                    value={newEvent.end}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className="submit" type="submit">
                                Add Event
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {user?.isadmin && (
                <div className="home">
                    <h1>Welcome Admin</h1>
                    <p>Here you can view the list of mentors and their details.</p>
                </div>
            )}
            {!user?.isadmin && !user?.ismentor && (
                <div style={{ width: "80%", height: "500px", marginTop: "30px", margin: "auto" }}>
                    <ScheduleXCalendar calendarApp={calendar} />
                </div>
            )}
        </>
    );
};
export default Calendar;
