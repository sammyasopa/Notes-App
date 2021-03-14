import React, { useState } from "react";
import "./styles.css";
import uniqid from "uniqid";
import history from "./history";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App3({ setNotes }) {
  const { state } = history.location;
  if (state === undefined) {
    history.push("/notes");
    return null;
  }
  console.log("state");
  console.log(state);
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const [noteInfo, setNoteInfo] = useState({
    _id: uniqid(),
    title: state[0].title,
    body: state[0].body,
    date: state[0].date,
    month: state[0].month,
    year: state[0].year,
    day: state[0].day
  });
  const [startDate, setStartDate] = useState(
    new Date(state[0].month + "/" + state[0].date + "/" + state[0].year)
  );
  console.log("NoteInfo");
  console.log(noteInfo);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoteInfo({ ...noteInfo, [name]: value });
  };
  const handleClick = (event) => {
    console.log(noteInfo);
    setNotes((notes) => [...notes, noteInfo]);
    setStartDate(new Date());
    setNoteInfo({
      _id: uniqid(),
      title: "",
      body: "",
      date: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      day: weekDay[new Date().getDay()]
    });
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
