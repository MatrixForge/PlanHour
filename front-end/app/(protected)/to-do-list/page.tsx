"use client";
import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Footer from "../../components/footer";
import "./toDoList.css";
import Image from "next/image";
import axios from "@/lib/axios";
import { useFolderStore } from "@/store/folderStore";

const BootstrapLayout = () => {
  const { folderId, subFolderId, folderTitle } = useFolderStore();
  const taskListRef = useRef(null);
  const [todos, setTodos] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [folderState, setfolderState] = useState("");
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");

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
        setTodos(data.toDoLists);
        setEvents(data.subfolders ? data.subfolders : data.siblingSubfolders);
        if (data.subfolders) {
          setSelectedDates(data.subfolders.map((event) => new Date(event.date)));
        }
        if (data.siblingSubfolders) {
          setSelectedDates(data.siblingSubfolders.map((event) => new Date(event.date)));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleDone = async (taskId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    try {
      const taskToUpdate = todos.find(todo => todo._id === taskId);
      if (!taskToUpdate) return;

      // Optimistically update the local state
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === taskId ? { ...todo, completed: !todo.completed } : todo
        )
      );

      // Call the API to update the task's completion status
      const response = await axios.post("/events/complete-task", {
        id: selectedEventId,
        folderOrSubFolder: folderState,
        taskId: taskId,
      });

      if (response.status !== 200) {
        // Rollback if API call fails
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === taskId ? { ...todo, completed: !todo.completed } : todo
          )
        );
      }
    } catch (error) {
      console.error("Error updating task:", error);
      // Rollback on error
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === taskId ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  const toggleEditing = (id) => {
    setEditingTaskId(id === editingTaskId ? null : id);
  };

  const handleTitleChange = (id, newTitle) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
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
    setShowAddTaskInput(true);
  };

  const handleAddTaskSubmit = async (e) => {
    // Handle both button click and Enter key
    if (e && e.key && e.key !== 'Enter') return;
    if (newTaskTitle.trim() === "") return;

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
        setTodos(prevTodos => [...prevTodos, addedTask]);
        setNewTaskTitle("");
        setShowAddTaskInput(false);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const deleteTask = async (taskId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    try {
      const response = await axios.post("/events/delete-task", {
        id: selectedEventId,
        folderOrSubFolder: folderState,
        taskId: taskId,
      });
      
      if (response.status === 200) {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== taskId));
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
                  {todos.map((todo) => (
                    <li
                      key={todo._id}
                      className={`list-group-item ${todo.completed ? "done" : ""}`}
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
                          onChange={(e) => handleTitleChange(todo._id, e.target.value)}
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
                          src={todo.completed ? "/correct-filled.png" : "/correct.png"}
                          alt="tick icon"
                          className="tick-icon"
                          onClick={(e) => toggleDone(todo._id, e)}
                          width={100}
                          height={100}
                        />
                        <i
                          className="bi bi-x-circle x-icon"
                          onClick={(e) => deleteTask(todo._id, e)}
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
                      onKeyPress={handleAddTaskSubmit}
                      autoFocus
                    />
                  </div>
                  <div
                    className="icon-container1"
                    onClick={handleAddTaskSubmit}
                    style={{ cursor: "pointer" }}
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
              {!showAddTaskInput && (
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
              )}
            </div>
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