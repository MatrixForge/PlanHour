"use client";
import React, { useEffect, useState, useRef } from "react";
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
  const taskListRef = useRef(null); // Reference to the task list container
  const [todos, setTodos] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null); // Local state to track editing
  const [folderState, setfolderState] = useState("");
  const [showAddTaskInput, setShowAddTaskInput] = useState(false); // State for showing input box
  const [newTaskTitle, setNewTaskTitle] = useState(""); // State for new task title

  useEffect(() => {
    fetchData();
    if (folderId && !subFolderId) {
      setSelectedEventId(folderId);
      setfolderState("folder");
    } else if (subFolderId) {
      setSelectedEventId(subFolderId);
      setfolderState("subFolder");
    }
  }, [folderId, subFolderId]);

  const fetchData = async () => {
    try {
      let response;
      if (folderId && !subFolderId) {
        response = await axios.post("/events/get-to-do-list", {
          folderOrSubFolder: "folder",
          id: folderId,
        });
      } else if (subFolderId) {
        response = await axios.post("/events/get-to-do-list", {
          folderOrSubFolder: "subFolder",
          id: subFolderId,
        });
      }
      if (response) {
        const data = await response.data;
        console.log("data", data);
        setTodos(data.toDoLists);
        setEvents(data.subfolders ? data.subfolders : data.siblingSubfolders);
        if (data.subfolders) {
          setSelectedDates(
            data.subfolders.map((event) => new Date(event.date))
          );
        }
        if (data.siblingSubfolders) {
          setSelectedDates(
            data.siblingSubfolders.map((event) => new Date(event.date))
          );
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDone = async (id) => {
    try {
      // Optimistically update the local state
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      // Call the API to update the task's completion status
      const response = await axios.post("/events/complete-task", {
        id: selectedEventId,
        folderOrSubFolder: folderState,
        taskId: id,
      });

      // If the API call fails, revert the local state
      if (response.status !== 200) {
        // Rollback the state if necessary
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
        console.error("Error updating task:", response.data.message);
      }
    } catch (error) {
      // Rollback the state if there's an error
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
      console.error("Error updating task:", error.message);
    }
  };

  const toggleEditing = (id) => {
    setEditingTaskId(id === editingTaskId ? null : id); // Toggle editing state
  };

  const handleTitleChange = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const handleEventClick = async (id) => {
    setSelectedEventId(id);
    try {
      const response = await axios.post("/events/get-to-do-list", {
        folderOrSubFolder: "subFolder",
        id,
      });
      if (response) {
        const data = await response.data;
        setTodos(data.toDoLists);
        setEvents(data.subfolders ? data.subfolders : data.siblingSubfolders);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddTaskClick = () => {
    setShowAddTaskInput(true); // Show input box for new task
  };

  const handleAddTaskSubmit = async () => {
    if (newTaskTitle.trim() === "") return; // Prevent adding empty tasks

    const newTask = {
      title: newTaskTitle,
      completed: false,
    };

    try {
      const response = await axios.post("/events/add-task", {
        id: selectedEventId,
        folderOrSubFolder: folderState,
        task: newTask,
      });

      if (response.status === 200) {
        const addedTask = response.data;
        setTodos([...todos, addedTask]);
        setEditingTaskId(addedTask._id); // Set the new task in editing mode
        setNewTaskTitle(""); // Clear the input
        setShowAddTaskInput(false); // Hide the input box
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.post("/events/delete-task", {
        id: selectedEventId, // The ID of the folder or subfolder
        folderOrSubFolder: folderState, // Specify whether it's a folder or subfolder
        taskId: id, // The ID of the task to be deleted
      });
      if (response.status === 200) {
        // Remove the task from the state
        setTodos(todos.filter((todo) => todo._id !== id));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="row">
        <div
          className="col-md-7"
          style={{
            backgroundImage: "linear-gradient(to right, #EBA0E3, #E8A696)",
            height: "100%",
          }}
        >
          <div className="card1">
            <div className="card-header" style={{ borderBottom: "none" }}>
              To-do <p> ({todos.length})</p>
            </div>
            <div className="card-body1">
              <div className="task-list-container" ref={taskListRef}>
                <ol className="list-group list-group-numbered">
                  {todos.map((todo, idx) => (
                    <li
                      key={todo._id}
                      className={`list-group-item ${
                        todo.completed ? "done" : ""
                      }`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {editingTaskId === todo._id ? (
                        <input
                          type="text"
                          className="text"
                          value={todo.title}
                          maxLength={20}
                          autoFocus
                          onChange={(e) =>
                            handleTitleChange(todo._id, e.target.value)
                          }
                          onBlur={() => toggleEditing(todo._id)}
                        />
                      ) : (
                        <span
                          className="text"
                          onClick={() => toggleEditing(todo._id)}
                        >
                          {todo.title}
                        </span>
                      )}
                      <div className="icon-container">
                        <Image
                          src={
                            todo.completed
                              ? "/correct-filled.png"
                              : "/correct.png"
                          }
                          alt="tick icon"
                          className="tick-icon"
                          onClick={() => toggleDone(todo._id)}
                          width={100}
                          height={100}
                        />
                        <i
                          className="bi bi-x-circle x-icon"
                          onClick={() => deleteTask(todo._id)}
                        ></i>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
              {showAddTaskInput && (
                <div className="list-group-item">
                  <div className="input-task">
                    <input
                      type="text"
                      className="new-task-input"
                      value={newTaskTitle}
                      onChange={handleInputChange}
                      onBlur={handleAddTaskSubmit}
                      autoFocus
                    />
                  </div>
                  <div
                    className="icon-container1"
                    onClick={handleAddTaskSubmit}
                    style={{ cursor: "pointer" }} // Optional: adds a pointer cursor to indicate it's clickable
                  >
                    <Image
                      src={"/check-mark.png"}
                      alt="tick icon"
                      className="tick-icon"
                      width={100}
                      height={100}
                    />
                    <i className="bi bi-x-circle x-icon"></i>
                  </div>
                </div>
              )}
            </div>
            <div className="todo-footer">
              {!showAddTaskInput ? (
                <li
                  className="list-group-item input-task"
                  style={{ display: "flex", justifyContent: "space-between" }}
                  onClick={handleAddTaskClick}
                >
                  <span className="text">Add Task</span>
                  <div className="icon-container">
                    <Image
                      src={"/check-mark.png"}
                      alt="tick icon"
                      className="tick-icon"
                      width={100}
                      height={100}
                    />
                    <i className="bi bi-x-circle x-icon"></i>
                  </div>
                </li>
              ) : (
                <div></div>
                // <div className="icon-container">
                //   <button
                //     onClick={handleAddTaskSubmit}
                //     className="btn btn-primary"
                //   >
                //     Save Task
                //   </button>
                // </div>
              )}
            </div>
            {/* <div className="todo-footer">
              <li
                className="list-group-item input-task"
                style={{ display: "flex", justifyContent: "space-between" }}
                onClick={addTask}
              >
                <span className="text">Add Task</span>

                <div className="icon-container">
                  <Image
                    src={"/check-mark.png"}
                    alt="tick icon"
                    className="tick-icon"
                    width={100}
                    height={100}
                  />
                  <i className="bi bi-x-circle x-icon"></i>
                </div>
              </li>
            </div> */}
          </div>
        </div>

        <div className="col-md-5 left-border-shadow">
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
              className="col-md-12"
              style={{
                backgroundImage: "linear-gradient(to right, #E8A696, #EEBCAE)",
                width: "120%",
                height: "100%",
              }}
            >
              <div className="event-card">
                <div className="event-card-header fontCustom">
                  {folderTitle}
                </div>
                {events.map((event, index) => (
                  <div
                    key={event._id}
                    className="event-item"
                    style={{
                      backgroundColor:
                        selectedEventId === event._id
                          ? `${colors[index % colors.length]}33`
                          : "#fff",
                      borderLeft: `10px solid ${colors[index % colors.length]}`,
                    }}
                    onClick={() => handleEventClick(event._id)}
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

const colors = ["#E8A696", "#92D4C9", "#C5B3E6", "#EBA0E3"];
