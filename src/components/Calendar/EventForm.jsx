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

function EventForm({clickedHourDate}) {
  const [eventName, setEventName] = useState("");
  const [startHour, setStartHour] = useState(parsedClickedHourDate(clickedHourDate));
  const [endHour, setEndHour] = useState(createClickedHourDateEnd(clickedHourDate));
  const [place, setPlace] = useState("");
  const [isWeeklyRepeating, setIsWeeklyRepeating] = useState(false);

  const formValidations = (name, time) => {
    if (name === START_INPUT_NAME && endHour) {
      if (time >= endHour) {
        return false;
      }
    }

    if (name === END_INPUT_NAME && startHour) {
      if (startHour >= time) {
        return false;
      }
    }

    return true;
  };

  function parsedClickedHourDate(date){
    const currentHours = date.getHours();
    const minutes = date.getMinutes() > 0? "30" : "00";
    const hours = currentHours < 10? `0${currentHours}` : currentHours;
    const time = `${hours}:${minutes}`;
    return time;
  }

  function createClickedHourDateEnd(date){
    const newHours = date.getHours() + 1;
    date.setHours(newHours);
    return parsedClickedHourDate(date)
  }

  const handleSubmit = (event) => {
    // Send the event data to your backend API or logic here
    console.log({
      eventName,
      startHour,
      endHour,
      place,
      isWeeklyRepeating,
    });

    // Reset the form after submission (optional)
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
        <input
          type="text"
          id="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label>Time (HH:MM):</label>
        <CustomTimePicker
          selectedTime={startHour}
          setSelectedTime={setStartHour}
          formValidations={formValidations}
          inputName={START_INPUT_NAME}
        />
      </div>
      <div className="input-group">
        <label>End Hour (HH:MM):</label>
        <CustomTimePicker
          selectedTime={endHour}
          setSelectedTime={setEndHour}
          formValidations={formValidations}
          inputName={END_INPUT_NAME}
        />
      </div>
      .
      <div className="input-group">
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>
          <input
            type="checkbox"
            id="isWeeklyRepeating"
            checked={isWeeklyRepeating}
            onChange={(e) => setIsWeeklyRepeating(e.target.checked)}
          />
          Evento Semanal
        </label>
      </div>
      <button type="button" onClick={() => handleSubmit()}>
        Crear Evento
      </button>
    </form>
  );
}

export default EventForm;
