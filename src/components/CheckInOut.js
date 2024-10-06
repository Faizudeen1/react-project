import React, { useState, useEffect } from 'react';

function CheckInOut() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    // Update the current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Clear the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const record = { time: new Date().toLocaleString(), type: 'Check-In' };
    setAttendanceRecords([...attendanceRecords, record]);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const record = { time: new Date().toLocaleString(), type: 'Check-Out' };
    setAttendanceRecords([...attendanceRecords, record]);
    setIsCheckedIn(false);
  };

  return (
    <div className="check-in-out-container">
      <h2>Check In/Check Out</h2>
      <p>Date & Time: {currentTime}</p> {/* Display current time */}
      <div className="check-in-out-buttons">
        {!isCheckedIn ? (
          <button onClick={handleCheckIn} className="check-in-btn">Check In</button>
        ) : (
          <button onClick={handleCheckOut} className="check-out-btn">Check Out</button>
        )}
      </div>
      <h3>Attendance Records</h3>
      <ul className="attendance-records">
        {attendanceRecords.map((record, index) => (
          <li key={index}>
            {record.type} at {record.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CheckInOut;
