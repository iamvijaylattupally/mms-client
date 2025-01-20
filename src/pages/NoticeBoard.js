import React from "react";

const NoticeBoard = () => {
  const notices = [
    {
      title: "Mid Examinations",
      details: "B.Tech IV Year II Semester (R18: 2021 Batch) I Mid Examinations",
      link: "https://drive.google.com/file/d/1Da-WhjhMfRS4n1MbQR6eGMcGem0bQhB_/view",
    },
    {
      title: "Sankranti Holidays",
      details: "Holidays will be observed from 13th January to 15th January 2025. Third Saturday of march is working day",
    },
    {
      title: "Announcement",
      details: "The College will remain closed today (Friday, December 27, 2024). Exams scheduled for today are postponed. New date for the exams will be initimated later.",
    },
    {
      title: "Semester Examination",
      details: "M.Tech I Year I Semester (R22:2024 Batch) I Mid Examinations",
      link:"https://drive.google.com/file/d/1QIp-TMMjlZCp2NPXwqQtR-i3Pl-PB0S7/view"
    },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Notice Board</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {notices.map((notice, index) => (
          <div
            key={index}
            className="card m-3 shadow-sm"
            style={{ width: "20rem", borderRadius: "10px" }}
          >
            <div className="card-body">
              <h5 className="card-title text-primary">{notice.title}</h5>
              <p className="card-text">{notice.details}</p>
              {notice.link && (
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-sm"
                >
                  Read More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
