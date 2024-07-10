import React from "react";
import "./CalendarEventModal.scss";
import EventForm from "./EventForm";

const CalendarEventModal = ({ setShouldOpenModal, clickedHourDate, endHourDate, submitEventCallback, event}) => {
  return (
    <div className="calendar-event-modal">
      <div
        className="calendar-event-modal__background"
        onClick={() => setShouldOpenModal(false)}
      ></div>
      <div className="calendar-event-modal__content">
        <h1>Calendar Event Modal</h1>
        <EventForm clickedHourDate={clickedHourDate} endHourDate={endHourDate} event={event} submitEventCallback={() => {
          submitEventCallback();
          setShouldOpenModal(false)
        }} />
      </div>
    </div>
  );
};

export default CalendarEventModal;
