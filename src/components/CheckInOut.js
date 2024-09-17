import React, { useState } from 'react';

function CheckInOut() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

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
      <div className="check-in-out-buttons">
        <button onClick={handleCheckIn} disabled={isCheckedIn}>
          Check In
        </button>
        <button onClick={handleCheckOut} disabled={!isCheckedIn}>
          Check Out
        </button>
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
