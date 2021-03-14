import React, { useState } from "react";
import "./styles.css";
import uniqid from "uniqid";
import history from "./history";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App1({ setNotes }) {
  const today = new Date();
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const [startDate, setStartDate] = useState(new Date());
  const [noteInfo, setNoteInfo] = useState({
    _id: uniqid(),
    title: "No Title",
    body: "",
    date: startDate.getDate(),
    month: startDate.getMonth()+1,
    year: startDate.getFullYear(),
    day: weekDay[startDate.getDay()]
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteInfo({ ...noteInfo, [name]: value });
  };
  const handleClick = (event) => {
    console.log(noteInfo);
    setNotes((notes) => [...notes, noteInfo]);
    setNoteInfo({
      _id: uniqid(),
      title: "",
      body: "",
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      day: weekDay[new Date().getDay()]
    });
    setStartDate(new Date());
    history.push("/notes");
  };
  return (
    <div className="create-container basic">
      <div className="create-wrapper basic">
        <div className="topper basic">Create a note</div>
        <input
          onChange={handleChange}
          name="title"
          value={noteInfo.title}
          type="text"
          className="create-inp"
          palceholder="Note title"
        />
        <textarea
          onChange={handleChange}
          name="body"
          value={noteInfo.body}
          className="create-inp"
          placeholder="notes body"
        />
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setNoteInfo({
              ...noteInfo,
              date: date.getDate(),
              month: date.getMonth() + 1,
              year: date.getFullYear(),
              day: weekDay[date.getDay()]
            });
          }}
          showYearDropdown
          showMonthDropdown
        />
        <button onClick={handleClick}>create note</button>
      </div>
    </div>
  );
}
