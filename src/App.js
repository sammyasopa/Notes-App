import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import App1 from "./App1";
import App2 from "./App2";
import App3 from "./App3";
export default function App() {
  const [notes, setNotes] = useState([]);
  const deleteNote = (id) => {
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };
  return (
    <div className="basic">
      <Switch>
        <Route path="/notes">
          <App2 notes={notes} setNotes={setNotes} deleteNotes={deleteNote} />
        </Route>
        <Route path="/create">
          <App1 setNotes={setNotes} />
        </Route>
        <Route path="/edit">
          <App3 setNotes={setNotes} />
        </Route>
      </Switch>
    </div>
  );
}
