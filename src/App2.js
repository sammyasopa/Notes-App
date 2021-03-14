import "./styles.css";
import "./styles1.css";
import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import history from "./history";

export default function App2({ notes, setNotes, deleteNotes }) {
  const [createdNotes, setCreatedNotes] = useState(notes);
  const [searchNote, setSearchNote] = useState("");

  const handleClick = (event) => {
    history.push("/create");
  };
  const deleteNote = (id) => {
    setCreatedNotes(
      createdNotes.filter((note) => {
        return note._id !== id;
      })
    );
  };
  const handleEdit = (event) => {
    const id = event.target.id;
    const note = notes.filter((note) => {
      return note._id === id;
    });
    deleteNote(id);
    deleteNotes(id);
    // setCreatedNotes(notes);
    history.push("/edit", note);
  };
  const handleDelete = (event) => {
    const id = event.target.id;
    deleteNote(id);
    deleteNotes(id);
    // setCreatedNotes(notes);
  };
  const handleSortChange = (event) => {
    const sortby = event.target.value;
    if (sortby === "newest") {
      const dummy = [...createdNotes].sort((a, b) => {
        const dateA = new Date(a.month + "/" + a.date + "/" + a.year);
        const dateB = new Date(b.month + "/" + b.date + "/" + b.year);
        return dateB - dateA;
      });
      setCreatedNotes(dummy);
    } else if (sortby === "oldest") {
      const dummy = [...createdNotes].sort(function (a, b) {
        const dateA = new Date(a.month + "/" + a.date + "/" + a.year);
        const dateB = new Date(b.month + "/" + b.date + "/" + b.year);
        return dateA - dateB;
      });
      setCreatedNotes(dummy);
    } else {
      setCreatedNotes(notes);
    }
  };
  const handleSearchChange = (event) => {
    setSearchNote(event.target.value);
    let value = event.target.value;
    if (value === "") {
      setCreatedNotes(notes);
    } else {
      setCreatedNotes(
        notes.filter((note) => {
          return note.title.toLowerCase() === value.toLowerCase();
        })
      );
    }
  };
  // var show = notes[1];
  const getWeekNum = (yy, mm, dd) => {
    var thatDay = new Date(yy, mm, dd);
    var startDay = new Date(yy, 0, 1);
    console.log(thatDay, startDay, "Ab subtract", thatDay - startDay);
    console.log((thatDay - startDay) / (1000 * 60 * 60 * 24 * 7));
    return Math.floor((thatDay - startDay) / (1000 * 60 * 60 * 24 * 7));
  };
  const handleFilterChange = (event) => {
    const filterBy = event.target.value;
    if (filterBy === "By Week") {
      const curWeek = getWeekNum(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const dummy = [...notes].filter((note) => {
        console.log("Wowwww", note.year, note.month, note.date);
        const weekNum = getWeekNum(note.year, note.month, note.date);
        console.log(weekNum);
        console.log(curWeek);
        return weekNum === curWeek;
      });
      dummy.sort(function (a, b) {
        const dateA = new Date(a.month + "/" + a.date + "/" + a.year);
        const dateB = new Date(b.month + "/" + b.date + "/" + b.year);
        return dateA - dateB;
      });
      setCreatedNotes(dummy);
    }
    if (filterBy === "By Month") {
      var currMonth = new Date().getMonth() + 1;
      const dummy = [...notes].filter((note) => {
        return note.month === currMonth;
      });
      dummy.sort(function (a, b) {
        const dateA = new Date(a.month + "/" + a.date + "/" + a.year);
        const dateB = new Date(b.month + "/" + b.date + "/" + b.year);
        return dateA - dateB;
      });
      setCreatedNotes(dummy);
    }
    if (filterBy === "By Year") {
      var currYear = new Date().getFullYear();
      const dummy = [...notes].filter((note) => {
        return note.year === currYear;
      });
      dummy.sort(function (a, b) {
        const dateA = new Date(a.month + "/" + a.date + "/" + a.year);
        const dateB = new Date(b.month + "/" + b.date + "/" + b.year);
        return dateA - dateB;
      });
      setCreatedNotes(dummy);
    }
    if (filterBy === "none") {
      setCreatedNotes(notes);
    }
  };
  return (
    <div id="notes-container" className="notes-container basic">
      <input
        className="search-box"
        placeholder="Search notes using title..."
        type="text"
        value={searchNote}
        onChange={handleSearchChange}
      />
      <div
        style={{
          background: "",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div style={{ display: "block" }}>
          <p style={{ color: "black", marginBottom: "5px" }}>Sort </p>
          <select id="selector" placeholder="sort" onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="oldest">Oldest First</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <button className="creator" onClick={handleClick}>
          <b
            style={{
              textAlign: "justify",
              transform: "scale(0.7)",
              background: "white",
              color: "#212121",
              borderRadius: "50%",
              fontSize: "100%",
              padding: "0.15em 0.4em"
            }}
          >
            +
          </b>
          &nbsp; CREATE NEW NOTE
        </button>
        <div style={{ display: "block" }}>
          <p style={{ color: "black", marginBottom: "5px" }}>Filter </p>
          <select
            id="selector"
            placeholder="sort"
            onChange={handleFilterChange}
          >
            <option value="none">None</option>
            <option value="By Week">By Week</option>
            <option value="By Month">By Month</option>
            <option value="By Year">By Year</option>
          </select>
        </div>
      </div>

      <Grid
        spacing={1}
        container
        style={{
          width: "calc(100% - 2em)",
          display: "flex",
          margin: "1em",
          justifyContent: "space-evenly",
          height: "100%"
        }}
      >
        {createdNotes.map((note) => {
          return (
            <Grid item md={3} id={note._id} className="card basic">
              <div className="card-label basic">{note.title}</div>

              <div className="card-options">
                <button
                  id={note._id}
                  style={{ background: "goldenrod" }}
                  onClick={handleEdit}
                >
                  Open Note
                </button>
                <button
                  id={note._id}
                  style={{ background: "indianred" }}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>

              <div className="card-footer">
                <b style={{ float: "right" }}>
                  Created on {note.date}/{note.month}/{note.year}
                </b>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
