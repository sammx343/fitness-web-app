import React, { useState } from "react";
import CustomTimePicker from "./CustomTimePicker";
import "./EventForm.scss";

const hours = [];
for (let i = 0; i <= 23; i++) {
  for (let j = 0; j <= 59; j += 15) {
    hours.push(
      `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`
    );
  }
}

const START_INPUT_NAME = "start";
const END_INPUT_NAME = "end";

function EventForm({ clickedHourDate }) {
  const [eventName, setEventName] = useState("");
  const [startHour, setStartHour] = useState(parsedClickedHourDate(clickedHourDate));
  const [endHour, setEndHour] = useState(createClickedHourDateEnd(clickedHourDate));
  const [place, setPlace] = useState("");
  const [isWeeklyRepeating, setIsWeeklyRepeating] = useState(false);

  //TODO: Add possible validations to time from the parent component. 
  //If there are none this method and every call should be deleted
  //check again when on production!
  const formValidationObject = (name, time) => {
    return {};
  };

  function parsedClickedHourDate(date) {
    const currentHours = date.getHours();
    const minutes = date.getMinutes() > 0 ? "30" : "00";
    const hours = currentHours < 10 ? `0${currentHours}` : currentHours;
    const time = `${hours}:${minutes}`;
    return time;
  }

  function createClickedHourDateEnd(date) {
    const newHours = date.getHours() + 1;
    date.setHours(newHours);
    return parsedClickedHourDate(date)
  }

  const handleSubmit = (event) => {
    setEventName("");
    setStartHour("");
    setEndHour("");
    setPlace("");
    setIsWeeklyRepeating(false);
  };

  return (
    <form>
      <h2>Create Event</h2>
      <div className="input-group">
        <label htmlFor="eventName">Event Name:</label>
        <div className="input-group__right">
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-group">
        <label>Time (HH:MM):</label>
        <div className="input-group__right">
          <CustomTimePicker
            selectedTime={startHour}
            setSelectedTime={setStartHour}
            parentFormValidation={formValidationObject}
            inputName={START_INPUT_NAME}
          />
        </div>

      </div>
      <div className="input-group">
        <label>End Hour (HH:MM):</label>
        <div className="input-group__right">
          <CustomTimePicker
            selectedTime={endHour}
            setSelectedTime={setEndHour}
            parentFormValidation={formValidationObject}
            inputName={END_INPUT_NAME}
          />
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="place">Place:</label>
        <div className="input-group__right">
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </div>
      </div>
      <div className="input-group">
        <label>
          Evento Semanal
        </label>
        <input
            type="checkbox"
            id="isWeeklyRepeating"
            checked={isWeeklyRepeating}
            onChange={(e) => setIsWeeklyRepeating(e.target.checked)}
          />
      </div>
      <button type="button" onClick={() => handleSubmit()}>
        Crear Evento
      </button>
    </form>
  );
}

export default EventForm;
