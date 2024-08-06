"use client";
import React, { useState, useEffect } from "react";
import CustomNavbar from "../components/NavBar";
import Footer from "../components/footer";
import GuestBox from "../components/GuestLsit/GuestBox";
import styles from "../../styles/custom-colors.module.css";
import styles1 from "../../styles/guestList.module.css";
import GoogleLoginPopup from "../components/GoogleLoginPopup";
import Papa from "papaparse";
import { useSession } from "@supabase/auth-helpers-react";
import EventForm from "../components/GoogleCalendarEventForm"; // Import EventForm
import { useGuestStore } from "../../store/guestStore"; // Adjust the import path

type Attendee = {
  email: string;
};

const GuestListPage = () => {
  const [checkedGuests, setCheckedGuests] = useState<{
    [key: string]: boolean;
  }>({});
  const [headerChecked, setHeaderChecked] = useState(false);
  const [guests, setGuests] = useState<
  Array<{ _id: string; name: string; email: string; number: string }>
  >([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", email: "", number: "" });
  const [showEventForm, setShowEventForm] = useState(false); // State to control the event form display

  const { attendees, setAttendees } = useGuestStore(); // Access Zustand store

  const session = useSession();

  useEffect(() => {
    // Check if user is logged in and show event form
    if (session != null) {
      handleLoginSuccess();
      console.log("omgggg");
      console.log(session);
    }
  }, [session]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (id === "header-checkbox") {
      setHeaderChecked(checked);
      setCheckedGuests((prev) => {
        const newCheckedGuests = Object.keys(prev).reduce((acc, key) => {
          acc[key] = checked;
          return acc;
        }, {} as { [key: string]: boolean });
        return newCheckedGuests;
      });
    } else {
      setCheckedGuests((prev) => ({
        ...prev,
        [id]: checked,
      }));
    }
  };


  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const guestsData = results.data as Array<{
            name: string;
            email: string;
            number: string;
          }>;
  
          // Add a temporary unique ID to each guest object
          const guestsWithIds = guestsData.map((guest, index) => ({
            _id: `temp-id-${index}`, // Generate a temporary ID
            ...guest,
          }));
  
          // Iterate over each guest and make a POST request to add them to the database
          for (const guest of guestsWithIds) {
            try {
              const response = await fetch(
                "http://localhost:5000/api/guests/create-guests",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(guest),
                }
              );
  
              if (response.ok) {
                console.log(`Guest ${guest.name} added successfully`);
              } else {
                console.error(`Failed to add guest ${guest.name}`);
              }
            } catch (error) {
              console.error(`Error adding guest ${guest.name}:`, error);
            }
          }
  
          setGuests(guestsWithIds);
          console.log("guests are", guestsWithIds);
          fetchGuests(); // Refetch the guests after importing the CSV
        },
        skipEmptyLines: true,
      });
    }
  };
  


  const fetchGuests = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/guests/get-guests"
      );
      if (response.ok) {
        const data = await response.json();
        setGuests(data);
      } else {
        console.error("Failed to fetch guests");
      }
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const handleSendClick = () => {
    // Get selected guest emails or ids based on checkedGuests state
    const selectedGuestIds = Object.keys(checkedGuests).filter(
      (key) => checkedGuests[key]
    );

    if (selectedGuestIds.length === 0) {
      alert("Please select guests to send invites.");
      return;
    }

    // Convert selectedGuestIds to array of guest objects
    const selectedGuestsList = guests.filter((_, index) =>
      selectedGuestIds.includes(`checkbox-${index}`)
    );
    // Create an array of attendees with email
    const attendees = selectedGuestsList.map((guest) => ({
      email: guest.email,
    }));

    setAttendees(attendees); // Update Zustand store with attendees

    console.log("Attendees before showing event form:", attendees);

    setShowLoginPopup(true); // Assuming login is required before creating the event

    console.log("Login popup state: ", showLoginPopup); // Check state
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
    console.log("woww");
  };
  const handleNewGuestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewGuest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddGuest = async () => {
    if (newGuest.name && newGuest.email && newGuest.number) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/guests/create-guests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newGuest),
          }
        );
        if (response.ok) {
          const addedGuest = await response.json();
          setNewGuest({ name: "", email: "", number: "" });
          fetchGuests();
        } else {
          console.error("Failed to add guest");
        }
      } catch (error) {
        console.error("Error adding guest:", error);
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddGuest();
    }
  };

  const handleLoginSuccess = () => {
    console.log("eeeeeee");
    setShowLoginPopup(false);
    setShowEventForm(true);
  };

  const handleDelete = async () => {
    // Get selected guest IDs based on the checkedGuests state
    const selectedGuestIds = Object.keys(checkedGuests).filter(
      (key) => checkedGuests[key]
    );
  
    if (selectedGuestIds.length === 0) {
      alert("Please select guests to delete.");
      return;
    }
  
    // Convert selectedGuestIds to an array of guest objects
    const selectedGuestsList = guests.filter((_, index) =>
      selectedGuestIds.includes(`checkbox-${index}`)
    );
  
    // Extract the IDs of the selected guests
    const idsToDelete = selectedGuestsList.map((guest) => guest._id);
  
    try {
      const response = await fetch("http://localhost:5000/api/guests/delete-guests", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: idsToDelete }),
      });
  
      if (response.ok) {
        // Refetch the guests after deletion
        fetchGuests();
        // Reset the checkedGuests state
        setCheckedGuests({});
        setHeaderChecked(false);
        console.log("Guests deleted successfully");
      } else {
        console.error("Failed to delete guests");
      }
    } catch (error) {
      console.error("Error deleting guests:", error);
    }
  };
  

  return (
    <div>
      <CustomNavbar />
      <div className={`${styles1.coverContainer} ${styles1.fontCustom}`}>
        <div className={styles1.cover}>
          <img
            src="navbg.png"
            alt="Background"
            className={styles1.coverImage}
          />
        </div>
        <div className={styles1.guestBoxContainer}>
          <div className={styles1.guestBox}>
            <div className={styles1.guestBoxHeader}>
              <div className={styles1.guestListText}>Guest List</div>
              <input
                type="text"
                className={`form-control ${styles1.searchBar}`}
                placeholder="Search..."
              />
              <div className={styles1.buttons}>
                <button
                  className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <i className={`bi bi-cloud-upload-fill ${styles1.icon}`}></i>
                  Import
                </button>
                <button
                  className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`}
                  onClick={handleSendClick}
                >
                  <i className={`bi bi-send-fill ${styles1.icon}`}></i>
                  Send
                </button>
                <button
                  className={`btn btn-light mx-2 rounded-pill custom d-flex flex-row justify-content-center align-items-center ${styles.customBrown} ${styles1.fontCustom}`}
                  onClick={handleDelete}
                >
                  <i className={`bi bi-trash3-fill ${styles1.icon}`}></i>
                  Delete
                </button>
              </div>
            </div>

            <div className={styles1.guestBoxHeaderRow}>
              <input
                type="checkbox"
                className={styles1.checkbox}
                id="header-checkbox"
                checked={headerChecked}
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor="header-checkbox"
                className={styles1.customCheckbox}
              ></label>
              <div className={styles1.guestName}>
                <strong>Guest Name</strong>
              </div>
              <div className={styles1.email}>
                <strong>Email</strong>
              </div>
              <div className={styles1.number}>
                <strong>Number</strong>
              </div>
              <div className={styles1.icon}></div>
            </div>

            {guests.map((guest, index) => (
              <GuestBox
                key={index}
                guest={guest}
                index={index}
                checked={checkedGuests[`checkbox-${index}`]}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}

            <div className={styles1.guestBoxRow}>
              <div className={styles1.guestName}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={newGuest.name}
                  onChange={handleNewGuestChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className={styles1.email}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={newGuest.email}
                  onChange={handleNewGuestChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className={styles1.number}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Number"
                  name="number"
                  value={newGuest.number}
                  onChange={handleNewGuestChange}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleFileUpload}
      />
      <Footer />
      {showLoginPopup && (
        <GoogleLoginPopup
          onSuccess={handleLoginSuccess}
          onClose={handleClosePopup}
        />
      )}
      {showEventForm && (
        <EventForm session={session} onClose={() => setShowEventForm(false)} />
      )}
    </div>
  );
};

export default GuestListPage;
