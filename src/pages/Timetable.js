import React from "react";

const Timetable = () => {
  const classDetails = {
    class: "CSE - SECTION - D",
    classIncharge: "Mr. B. Ashwin Kumar",
    roomNo: "113 CM",
    academicYear: "2024-25",
  };

  const weeklyTimetable = [
    {
      day: "Monday",
      slots: [
        "Mini Project (Projects Lab)",
        "",
        "Break",
        "PE-II",
        "",
        "Lunch Break",
        "VA-CRT (Seminar Hall 211 CM)",
        "Mentoring",
      ],
    },
    {
      day: "Tuesday",
      slots: [
        "AIML",
        "FSD",
        "Break",
        "CC",
        "",
        "Lunch Break",
        "CC & IoT Lab (204 CM)",
        "",
      ],
    },
    {
      day: "Wednesday",
      slots: [
        "ACD",
        "",
        "Break",
        "FSD",
        "",
        "Lunch Break",
        "Additional Lab (E-Box)",
        "CC & IoT Lab",
      ],
    },
    {
      day: "Thursday",
      slots: [
        "AECS Lab (PG 408)",
        "",
        "Break",
        "PE-II",
        "",
        "Lunch Break",
        "Sports",
        "",
      ],
    },
    {
      day: "Friday",
      slots: [
        "FSD Lab (105 CB)",
        "",
        "Break",
        "ACD",
        "",
        "Lunch Break",
        "Library",
        "Mini Project (Projects Lab)",
      ],
    },
    {
      day: "Saturday",
      slots: ["FSD", "AIML", "Break", "ACD", "", "", "", ""],
    },
  ];

  const subjects = [
    { name: "Artificial Intelligence and Machine Learning", faculty: "Mr. V. Veerabhadram" },
    { name: "Full Stack Development", faculty: "Mr. K. Giri Babu" },
    { name: "Cloud Computing and DevOps", faculty: "Mr. B. Ashwin Kumar" },
    { name: "Automata Theory and Compiler Design", faculty: "Mr. A. Sasi" },
    { name: "Cryptography and Network Security", faculty: "Mr. G. Yedukondalu (Room No: 113 CM)" },
  ];

  const labs = [
    { name: "IoT and Cloud Computing Lab", faculty: "Mr. B. Ashwin Kumar, Dr. Banoth Sanya CC" },
    { name: "Full Stack Development Lab", faculty: "Mr. K. Giri Babu, Mr. N. Srinu" },
  ];

  const onlineCourses = [
    { name: "Intellectual Property Rights", faculty: "Dr. Hemanth Kumar Sastry", time: "Thursday: 7 PM - 9 PM" },
    { name: "Minor Theory: AI Applications", faculty: "Mr. Nayani Sateesh", time: "Wednesday & Friday: 7 PM - 9 PM" },
  ];

  const academicCalendar = [
    { event: "Commencement of Class Work", dates: "12-12-2024", duration: "" },
    { event: "1st Spell of Instruction/Classwork", dates: "12-12-2024 to 11-02-2025", duration: "9 Weeks" },
    { event: "Sankranti Holidays", dates: "13-01-2025 to 14-01-2025", duration: "2 Days" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Timetable</h2>

      {/* Class Details */}
      <div className="mb-4">
        <h4>Class Details</h4>
        <ul className="list-group">
          <li className="list-group-item">Class: {classDetails.class}</li>
          <li className="list-group-item">Class Incharge: {classDetails.classIncharge}</li>
          <li className="list-group-item">Room No.: {classDetails.roomNo}</li>
          <li className="list-group-item">Academic Year: {classDetails.academicYear}</li>
        </ul>
      </div>

      {/* Weekly Timetable */}
      <div className="mb-4">
        <h4>Weekly Timetable</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Day</th>
              <th>9:00 - 10:00</th>
              <th>10:00 - 11:00</th>
              <th>11:00 - 11:10</th>
              <th>11:10 - 12:10</th>
              <th>12:10 - 12:55</th>
              <th>12:55 - 1:55</th>
              <th>1:55 - 2:55</th>
              <th>2:55 - 3:55</th>
            </tr>
          </thead>
          <tbody>
            {weeklyTimetable.map((row, index) => (
              <tr key={index}>
                <td>{row.day}</td>
                {row.slots.map((slot, i) => (
                  <td key={i}>{slot}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subjects */}
      <div className="mb-4">
        <h4>Subjects</h4>
        <ul className="list-group">
          {subjects.map((subject, index) => (
            <li key={index} className="list-group-item">
              {subject.name} - {subject.faculty}
            </li>
          ))}
        </ul>
      </div>

      {/* Labs */}
      <div className="mb-4">
        <h4>Labs</h4>
        <ul className="list-group">
          {labs.map((lab, index) => (
            <li key={index} className="list-group-item">
              {lab.name} - {lab.faculty}
            </li>
          ))}
        </ul>
      </div>

      {/* Online Courses */}
      <div className="mb-4">
        <h4>Online Courses</h4>
        <ul className="list-group">
          {onlineCourses.map((course, index) => (
            <li key={index} className="list-group-item">
              {course.name} - {course.faculty} ({course.time})
            </li>
          ))}
        </ul>
      </div>

      {/* Academic Calendar */}
      <div className="mb-4">
        <h4>Academic Calendar</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Event</th>
              <th>Dates</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {academicCalendar.map((event, index) => (
              <tr key={index}>
                <td>{event.event}</td>
                <td>{event.dates}</td>
                <td>{event.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
