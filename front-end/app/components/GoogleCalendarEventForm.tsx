import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useGuestStore } from "../../store/guestStore"; // Adjust the import path

interface EventFormProps {
  session: any; // Adjust the type as needed based on your session object

  onClose: () => void; // Callback function to close the form
}

const EventForm: React.FC<EventFormProps> = ({
  session,
  onClose,
}) => {
 
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

      onClose(); // Close the modal after creating the event
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  const handleSubmit = () => {
    createCalendarEvent();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Google Calendar Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSummary">
            <Form.Label>Event Summary</Form.Label>
            <Form.Control
              type="text"
              name="summary"
              value={eventDetails.summary}
              onChange={handleChange}
              placeholder="Enter event summary"
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Event Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={eventDetails.location}
              onChange={handleChange}
              placeholder="Enter event location"
            />
          </Form.Group>
          <Form.Group controlId="formStart">
            <Form.Label>Start Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="start"
              value={eventDetails.start}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEnd">
            <Form.Label>End Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="end"
              value={eventDetails.end}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventForm;
