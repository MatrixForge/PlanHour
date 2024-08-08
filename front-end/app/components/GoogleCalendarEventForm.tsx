import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useGuestStore } from "../../store/guestStore"; // Adjust the import path
import styles from "@styles/googleCalendarEventForm.module.css";

interface EventFormProps {
  show: boolean;
  session: any; // Adjust the type as needed based on your session object

  onClose: () => void; // Callback function to close the form
}

const EventForm: React.FC<EventFormProps> = ({ show, session, onClose }) => {
  const supabase = useSupabaseClient();

  const { attendees } = useGuestStore((state) => state); // Access attendees from Zustand

  // Include attendees in the destructure
  useEffect(() => {
    console.log("Attendees in EventForm:", attendees);
  }, [attendees]);

  const [eventDetails, setEventDetails] = useState({
    summary: "",
    location: "",
    start: "",
    end: "",
  });

  // Update when selectedGuestEmails changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function signOut() {
    await supabase.auth.signOut();
  }

  const createCalendarEvent = async () => {
    const { summary, location, start, end } = eventDetails;

    const event = {
      summary,
      description: location,
      start: {
        dateTime: new Date(start).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(end).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: attendees.map((attendee: { email: any }) => ({
        email: attendee.email,
      })),
    };

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?sendUpdates=all",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + session.provider_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );

      const data = await response.json();
      console.log(data);
      console.log("aaa", attendees);

      // Sign out after successful event creation
      await signOut();

      onClose(); //  Close the modal after creating the event
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  const handleSubmit = () => {
    createCalendarEvent();
  };

  return (
    <div className={`${styles.popup} ${show ? styles.show : ""}`}>
      <div
        className={styles.coverImage}
        style={{ backgroundImage: `url('/cover.png')` }}
      >
        <button className={styles.closeButton}>
          <i className="bi bi-x-lg"></i>
        </button>
        <div className={styles.optionsBackground}>
          <h2 className={`${styles.optionsHeader}`}>
            Create Google Calendar Event
          </h2>
          <div className={styles.options}>
            <div className={`mb-3 ${styles.formGroup}`}>
              <Form.Group controlId="formSummary">
                <Form.Label className={`${styles.formLabel}`}>
                  Event Summary
                </Form.Label>
                <Form.Control
                  type="text"
                  name="summary"
                  className={`${styles.formControl}`}
                  value={eventDetails.summary}
                  onChange={handleChange}
                  placeholder="Enter event summary"
                />
              </Form.Group>
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <Form.Group controlId="formLocation">
                <Form.Label className={`${styles.formLabel}`}>
                  Event Location
                </Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  className={`${styles.formControl}`}
                  value={eventDetails.location}
                  onChange={handleChange}
                  placeholder="Enter event location"
                />
              </Form.Group>
            </div>
            <div className={`mb-3 ${styles.formGroup}`}>
              <Form.Group controlId="formStart">
                <Form.Label className={`${styles.formLabel}`}>
                  Start Date & Time
                </Form.Label>
                <Form.Control
                  className={`${styles.formControl}`}
                  type="datetime-local"
                  name="start"
                  value={eventDetails.start}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formEnd">
                <Form.Label className={`${styles.formLabel}`}>
                  End Date & Time
                </Form.Label>
                <Form.Control
                  className={`${styles.formControl}`}
                  type="datetime-local"
                  name="end"
                  value={eventDetails.end}
                  onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className={`${styles.formActions}`}>
              <Button
                variant="secondary"
                className={`${styles.cancelButton}`}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                type="submit"
                className={`${styles.saveButton}`}
                onClick={handleSubmit}
              >
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;
