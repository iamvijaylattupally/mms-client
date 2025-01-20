import React from "react";

const Events = () => {
  const events = [
    {
      name: "Invitation to EPL Season-7",
      details: "Join us for a day filled with exciting sports activities and competitions.",
      link: "https://cvr.ac.in/home4/files/events/2025/epl7-2025rsz.pdf", // No link for this event
    },
    {
      name: "National Startup Day celebrations. ",
      details: "“Idea Presentation” Poster presentation competition, which will be conducted on 16/01/2025 as part of National Startup Day celebrations. ",
      link: null // No link for this event
    },
    {
      name: "A One-WeekFaculty Development Program",
      details: "A 1-Week Online FDP on Emerging Wireless Technologies for 6G, by ECE Department, January 6-10, 2025",
      link: "https://cvr.ac.in/home4/files/events/2025/ece%20Brochure%20EWT%20for%206G%20jan%2025.pdf",
    },
    {
      name: "One-Week Skill Enhancement Refresher",
      details: "A 1-Week Skill Enhancement Refresher Program On Sustainable Materials, Methodologies, Technologies & Applications in Civil Engineering (S2MTACE-2K24), by Civil Engineering Department, December 6-11, 2024",
      link: null, // No link for this event
    },
    {
      name: "Startup Expo",
      details: "Interact with budding entrepreneurs and explore innovative ideas.",
      link: "https://startupexpo2025.com",
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Upcoming Events</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {events.map((event, index) => (
          <div
            key={index}
            className="card m-3 shadow-sm"
            style={{ width: "18rem", borderRadius: "10px", overflow: "hidden" }}
          >
            <div className="card-body text-center">
              <h5 className="card-title text-primary">{event.name}</h5>
              <p className="card-text text-muted">{event.details}</p>
              {event.link ? (
                <a
                  href={event.link}
                  className="btn btn-primary mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              ) : (
                <p className="text-secondary mt-2">Details coming soon</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
