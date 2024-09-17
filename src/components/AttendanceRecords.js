import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function AttendanceRecords() {
  const [monthlyRecords, setMonthlyRecords] = useState({});

  useEffect(() => {
    const fetchRecords = async () => {
      const userDoc = doc(db, 'attendance', auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDoc);
      if (userDocSnapshot.exists()) {
        const records = userDocSnapshot.data().records || [];
        const groupedRecords = groupRecordsByMonth(records);
        setMonthlyRecords(groupedRecords);
      }
    };

    fetchRecords();
  }, []);

  const groupRecordsByMonth = (records) => {
    return records.reduce((acc, record) => {
      const month = new Date(record.time).toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(record);
      return acc;
    }, {});
  };

  return (
    <div className="attendance-records-container">
      <h3>Monthly Attendance Records</h3>
      {Object.keys(monthlyRecords).map((month) => (
        <div key={month}>
          <h4>{month}</h4>
          <ul>
            {monthlyRecords[month].map((record, index) => (
              <li key={index}>
                {record.type} at {record.time}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default AttendanceRecords;
