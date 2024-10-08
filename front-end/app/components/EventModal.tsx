import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "@/lib/axios";
import { useFolderStore } from "@/store/folderStore"; // Import the Zustand store
import styles from "@styles/eventModal.module.css";

interface EventModalProps {
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ onClose }) => {
  const backgroundImgSrc = "/Popup.png";
  const { folderId, subFolderId } = useFolderStore();
  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    date: "",
    noOfGuests: "",
    description: "",
  });

  const { setFolderCreated } = useFolderStore(); // Use the Zustand store

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, eventType, date, noOfGuests, description } = formData;

    // Determine the URL based on the presence of mainFolderId
    const url = folderId
      ? `/events/folders/${folderId}/subfolder`
      : `/events/folders`;

    try {
      const response = await axios.post(url, {
        title,
        eventType,
        date,
        noOfGuests,
        description,
      });
      setFolderCreated(true); // Update Zustand store state
      onClose(); // Close the modal
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error creating folder:", error.response.data.message);
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Error creating folder:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating folder:", error.message);
      }
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName="custom-modal"
    >
      <div
        className={styles["modal-background"]}
        style={{
          backgroundImage: `url(${backgroundImgSrc})`,
          backgroundSize: "cover",
        }}
      >
        <button className={styles["close-button"]} onClick={onClose}>
          ×
        </button>
        <div className={styles["form-container"]}>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              margin: "30px",
              height: "auto",
            }}
          >
            <h2 className={styles["form-heading"]}>New Event</h2>
            <div className={`mb-3 ${styles["form-group"]}`}>
              <label htmlFor="title" className={styles["form-label"]}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="eventType" className="form-label">
                Type
              </label>
              <select
                className="form-select"
                id="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate Event</option>
                <option value="wedding">Wedding</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="noOfGuests" className="form-label">
                Number of Guests
              </label>
              <input
                type="number"
                className="form-control"
                id="noOfGuests"
                value={formData.noOfGuests}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3 form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                required
              ></textarea>
            </div>
            <div className={styles["form-actions"]}>
              <Button
                variant="secondary"
                onClick={onClose}
                className={styles["cancel-button"]}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                className={styles["save-button"]}
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
