import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styling/tept.css'
const Carlendar: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <DatePicker
      className="tept"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    ></DatePicker>
  );
};

export default Carlendar;
