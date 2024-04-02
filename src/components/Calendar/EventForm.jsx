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

  const formValidationObject = (name, time) => {
    const isSelectedLowerHour = selectedLowerHour(name, time);
    if(isSelectedLowerHour.error) return isSelectedLowerHour;

    const isSelectedHigherHour = selectedHigherHour(name, time);
    if(isSelectedHigherHour.error) return isSelectedHigherHour;

    return {};
  };

  function selectedLowerHour(name, time){
    if (name === START_INPUT_NAME && endHour) {
      if (time >= endHour) {
        return {
          error: 'La hora inicial no puede ser mayor a la hora final'
        };
      }
    }
    return {
    }
  }

  function selectedHigherHour(name, time){
    if (name === END_INPUT_NAME && startHour) {
      if (startHour >= time) {
        return {
          error: 'La hora final no puede ser menor a la hora inicial'
        };
      }
    }
    return {
    }
  }

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
