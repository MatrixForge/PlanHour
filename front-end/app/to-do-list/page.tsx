"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Footer from "../components/footer";
import "./toDoList.css"; // Adjust the path as necessary
import Image from "next/image";
import axios from "@/lib/axios";
import { useFolderStore } from "@/store/folderStore";

const BootstrapLayout = () => {
  const { folderId, subFolderId, folderTitle } = useFolderStore();
  const [todos, setTodos] = useState([]);
   const [selectedDates, setSelectedDates] = useState([]);

  const [events, setEvents] = useState([]);
  const [newTask, setNewTask] = useState(""); // New task input state
  const [isInputActive, setIsInputActive] = useState(false); // Input activation state 

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  useEffect(() => {
    fetchData();
  }, [folderId, subFolderId]);

  const fetchData = async () => {
    if (!subFolderId && folderId) {
      const folderOrSubFolder = "folder";
      const id = folderId;
      console.log(id, folderOrSubFolder);
      try {
        const response = await axios.post("/events/get-to-do-list", {
          folderOrSubFolder,
          id,
        });

        if (response) {
          const data = await response.data;
          setTodos(data.toDoLists);
          setEvents(data.subfolders);
          setSelectedDates(
            data.subfolders.map((event: any) => new Date(event.date))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
 
  const handleTaskSubmit = async () => {
    if (newTask.trim() === "") return;

    try {
      const response = await axios.post("/events/add-task", {
        subFolderId, // Pass the selected subFolderId
        title: newTask,
      });

      if (response) {
        const newTodo = await response.data;
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setNewTask(""); // Clear the input field
        setIsInputActive(false); // Deactivate the input field
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const colors = ["#E8A696", "#92D4C9", "#C5B3E6", "#EBA0E3"];

  return (
    <>
      <NavBar />
      <div className="row">
        <div
          className="col-md-7"
          style={{
            backgroundImage: "linear-gradient(to right, #EBA0E3, #E8A696)",
            height: "120%",
          }}
        >
          <div className="card">
            <div className="card-header" style={{ borderBottom: "none" }}>
              To-do <p> (03)</p>
            </div>
            <div className="card-body">
              <ol className="list-group list-group-numbered">
                {todos.map((todo, idx) => (
                  <li
                    key={idx}
                    className={`list-group-item ${todo.done ? "done" : ""}`}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span className="text">{todo.title}</span>
                    <div className="icon-container">
                      <Image
                        src={todo.done ? "/correct-filled.png" : "/correct.png"}
                        alt="tick icon"
                        className="tick-icon"
                        onClick={() => toggleDone(todo.id)}
                        width={100}
                        height={100}
                      />
                      <i className="bi bi-x-circle x-icon"></i>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
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
                height: "106%",
              }}
            >
              <div className="event-card ">
                <div className="event-card-header fontCustom">
                  {folderTitle}
                </div>
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
                      <span className="event-name">{event.title}</span>
                      <span className="event-date">
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
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
