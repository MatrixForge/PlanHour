"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Footer from "../components/footer";
import "../../styles/toDoList.css"; // Adjust the path as necessary

const BootstrapLayout = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },
    { id: 2, text: "Cras justo odio", done: false },

  ]);

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const [selectedDates, setSelectedDates] = useState([]);
  const events = [
    { id: 1, name: "Event 1", date: "2024-07-20" },
    { id: 2, name: "Event 2", date: "2024-08-15" },
    { id: 3, name: "Event 3", date: "2024-09-10" },
    { id: 4, name: "Event 3", date: "2024-09-10" },
    { id: 5, name: "Event 3", date: "2024-09-10" },
    { id: 6, name: "Event 3", date: "2024-09-10" },
    // Add more events as needed
  ];

  const colors = ["#E8A696", "#92D4C9", "#C5B3E6", "#EBA0E3"];

  return (
    <>
      <NavBar />
      <div className="row">
        <div
          className="col-md-7"
          style={{
            backgroundImage: "linear-gradient(to right, #EBA0E3, #E8A696)",
            height:'80%'
          }}
        >
          <div className="card">
            <div className="card-body">
              <div className="card-header" style={{ borderBottom: "none" }}>
                To-do <p> (03)</p>
              </div>
              <ol className="list-group list-group-numbered">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`list-group-item ${todo.done ? "done" : ""}`}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span className="text">{todo.text}</span>
                    <div className="icon-container">
                      <img
                        src={todo.done ? "correct-filled.png" : "correct.png"}
                        alt="tick icon"
                        className="tick-icon"
                        onClick={() => toggleDone(todo.id)}
                      />
                      <i className="bi bi-x-circle x-icon"></i>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div
              className="card-footer"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderTop: "none",
              }}
            ></div>
          </div>
        </div>

        <div className="col-md-5 left-border-shadow ">
          <div className="row">
            <div
              className="col-md-12 day-picker-container"
              style={{
                backgroundImage: "linear-gradient(to right, #E8A696, #EEBCAE)",
              }}
            >
              <DayPicker
                mode="multiple"
                selected={selectedDates}
                onSelect={setSelectedDates}
                className="day-picker"
              />
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-12 "
              style={{
                backgroundImage: "linear-gradient(to right, #E8A696, #EEBCAE)",
                width: "120%",
              }}
            >
              <div className="event-card ">
                <div className="event-card-header fontCustom">Weddings</div>
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className="event-item"
                    style={{
                      backgroundColor: `${colors[index % colors.length]}33`,
                      borderLeft: `10px solid ${colors[index % colors.length]}`,
                    }}
                  >
                    <div className="left-bg"></div>
                    <div className="event-info">
                      <span className="event-name">{event.name}</span>
                      <span className="event-date">{event.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BootstrapLayout;
