"use client";
import React, { useState, useEffect } from "react";
import CustomNavbar from "../../components/NavBar";
import Footer from "../../components/footer";
import GuestBox from "../../components/GuestLsit/GuestBox";
import styles from "@/styles/custom-colors.module.css";
import styles1 from "@/styles/guestList.module.css";
import GoogleLoginPopup from "../../components/GoogleLoginPopup";
import Papa from "papaparse";
import { useSession } from "@supabase/auth-helpers-react";
import EventForm from "../../components/GoogleCalendarEventForm"; // Import EventForm
import { useGuestStore } from "../../../store/guestStore"; // Adjust the import path
import { useFolderStore } from "@/store/folderStore";
import axios from "@/lib/axios";
import Popup from "../../components/addEvent/Popup";
type Attendee = {
  email: string;
};

const GuestListPage: React.FC = () => {
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

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
  const { folderId, setFolderId, subFolderId, setSubFolderId } =
    useFolderStore();

  const session = useSession();

  useEffect(() => {
    if (folderId || subFolderId) {
      console.log("mmmmm");
      fetchGuests();
    }
  }, [folderId, subFolderId]);

  useEffect(() => {
    // Check if user is logged in and show event form
    if (session != null) {
      handleLoginSuccess();
      console.log("omgggg");
      console.log(session);
    }
  }, [session]);

  const showPopup = (message: string, type: "success" | "error") => {
    setPopup({ message, type });
    setTimeout(() => {
      setPopup(null); // Automatically close after a few seconds
    }, 3000); // Adjust the time as needed
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    if (id === "header-checkbox") {
      // When header checkbox is clicked, update all guest checkboxes
      const newCheckedState = guests.reduce((acc, _, index) => {
        acc[`checkbox-${index}`] = checked;
        return acc;
      }, {} as { [key: string]: boolean });
      
      setHeaderChecked(checked);
      setCheckedGuests(newCheckedState);
    } else {
      // Handle individual checkbox clicks
      setCheckedGuests(prev => ({
        ...prev,
        [id]: checked
      }));
      
      // Update header checkbox based on all guests being checked
      const allChecked = Object.values({
        ...checkedGuests,
        [id]: checked
      }).every(value => value);
      
      setHeaderChecked(allChecked);
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
            folderId, // Use folderId from Zustand store
            subFolderId, // Use subFolderId from Zustand store
          }));

          // Iterate over each guest and make a POST request to add them to the database
          for (const guest of guestsWithIds) {
            try {
              const response = await axios.post("/guests/create-guests", {
                ...guest,
                folderId,
                subFolderId,
              });

              if (response.status === 200 || response.status === 201) {
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
      console.log("Fetching guests...");

      // Prepare the URL and query parameters
      let url = "/guests/get-guests";
      const params: any = {};

      if (subFolderId) {
        params.subfolderId = subFolderId;
      } else if (folderId) {
        params.folderId = folderId;
      }

      console.log("Request URL is:", url, "with params:", params);

      // Make the GET request with query parameters
      const response = await axios.get(url, { params });

      console.log("Response is:", response);

      if (response.status === 200) {
        const data = response.data;
        setGuests(data);
      } else {
        console.error("Failed to fetch guests");
      }
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

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

    // Set the popup message and type
    setPopup({
      message: "Invitations sent successfully",
      type: "success",
    });

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
      console.log("Subfolder ID:", subFolderId);
      console.log("Main folder ID:", folderId);

      try {
        const response = await axios.post("/guests/create-guests", {
          ...newGuest,
          folderId,
          subFolderId,
        });

        if (response.status === 200 || response.status === 201) {
          const addedGuest = response.data;
          setNewGuest({ name: "", email: "", number: "" });
          fetchGuests();
          showPopup("Guest added successfully!", "success");
        } else {
          console.error("Failed to add guest");
          showPopup("Failed to add guest.", "error");
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
      const response = await axios.delete("/guests/delete-guests", {
        data: { ids: idsToDelete },
      });

      if (response.status === 200) {
        // Refetch the guests after deletion
        fetchGuests();
        // Reset the checkedGuests state
        setCheckedGuests({});
        setHeaderChecked(false);
        showPopup("Guests deleted successfully!", "success");

        console.log("Guests deleted successfully");
      } else {
        console.error("Failed to delete guests");
        showPopup("An error occurred while deleting guests.", "error");
      }
    } catch (error) {
      console.error("Error deleting guests:", error);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    try {
      let url = `/guests/search-guests?query=${query}`;

      // Add folderId or subFolderId as query parameters if they exist
      if (subFolderId) {
        url += `&subFolderId=${subFolderId}`;
      } else if (folderId) {
        url += `&folderId=${folderId}`;
      }

      const response = await axios.get(url);

      if (response.status === 200) {
        setGuests(response.data);
      } else {
        console.error("Failed to search guests");
      }
    } catch (error) {
      console.error("Error searching guests:", error);
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
                onChange={handleSearch}
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
        <EventForm
          show={true}
          session={session}
          onClose={() => setShowEventForm(false)}
        />
      )}

      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
};

export default GuestListPage;
