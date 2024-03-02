import React from "react";
import "./CalendarEventModal.scss";
import EventForm from "./EventForm";

const CalendarEventModal = ({ setShouldOpenModal }) => {
  return (
    <div className="calendar-event-modal">
      <div
        className="calendar-event-modal__background"
        onClick={() => setShouldOpenModal(false)}
      ></div>
      <div className="calendar-event-modal__content">
        <h1>Calendar Event Modal</h1>
        <EventForm />
      </div>
    </div>
  );
};

export default CalendarEventModal;
