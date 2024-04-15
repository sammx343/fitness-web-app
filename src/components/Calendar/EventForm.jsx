import React, { useState, useMemo } from "react";
import CustomTimePicker from "./CustomTimePicker";
import { daysOfTheWeek } from "../../utils/dateUtils";
import { createEvent } from "../../services/events";
import "./EventForm.scss";

const hours = [];
for (let i = 0; i <= 23; i++) {
  for (let j = 0; j <= 59; j += 15) {
    hours.push(
      `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`
    );
  }
}

function getMonthName(date) {
  const options = { month: 'long' }; // Use 'short' for abbreviated month names
  const formatter = new Intl.DateTimeFormat('es-ES', options); // Replace 'es-ES' with user's locale code

  const monthNameSpanish = formatter.format(date);
  return `${monthNameSpanish[0].toUpperCase() + monthNameSpanish.substring(1)} ${date.getDate()}`;
}

// Parses date to match format: Day of week, month day, Ex: Jueves, Abril 14
function parseDate(date) {
  return `${daysOfTheWeek[date.getDay()]}, ${getMonthName(date)}`;
}

const START_INPUT_NAME = "start";
const END_INPUT_NAME = "end";

function EventForm({ clickedHourDate, postSubmitCallback }) {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startHour, setStartHour] = useState(parsedClickedHourDate(clickedHourDate));
  const [endHour, setEndHour] = useState(createClickedHourDateEnd(clickedHourDate));
  const [place, setPlace] = useState("");
  const [isWeekly, setIsWeekly] = useState(false);
  const [errors, setErrors] = useState({});

  //Adds an extra day to the current date in the case the initial hour is bigger than the end date
  //indicating that the event will take place in both days
  const parseNextDay = useMemo(() => {
    let newDate = new Date(clickedHourDate);
    newDate.setDate(newDate.getDate() + 1);
    return endHour > startHour ? "" : parseDate(newDate)
  }, [startHour, endHour]);

  const formatDate = useMemo(() => {
    return parseDate(clickedHourDate);
  }, [clickedHourDate]);

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

  const validateForm = () => {
    let hasErrors = false;
    const newErrors = {};

    if (!eventName) {
      hasErrors = true;
      newErrors.eventName = "Ingresa un nombre para el evento";
    }

    if (!startHour) {
      hasErrors = true;
      newErrors.startHour = "Selecciona una hora de inicio.";
    }

    if (!endHour) {
      hasErrors = true;
      newErrors.endHour = "Selecciona una hora de finalización";
    }

    if (!place) {
      hasErrors = true;
      newErrors.place = "Por favor, indica un lugar para el evento";
    }

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newEvent = {
      name: eventName,
      description,
      startHour,
      endHour,
      place,
      isWeekly
    };

    if (!validateForm()) return;

    createEvent(newEvent).then(res => {
      console.log(res);
      setEventName("");
      setDescription("");
      setPlace("");
      setIsWeekly(false);
      setErrors({});
    }).catch(error => {
      console.log(error);
    })

  };

  return (
    <form>
      <h2>Create Event</h2>
      <div className="input-group">
        <label htmlFor="eventName">Nombre del evento*:</label>
        <div className="input-group__right">
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          {errors.eventName && <span className="error">{errors.eventName}</span>}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="eventName">Descripción:</label>
        <div className="input-group__right">
          <input
            type="text"
            id="eventDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="">{formatDate}</label>
        <div className="time-picker-group input-group__right">
          <CustomTimePicker
            selectedTime={startHour}
            setSelectedTime={setStartHour}
            parentFormValidation={formValidationObject} // Pass validation function
            inputName={START_INPUT_NAME}
          />
          <p> - </p>
          <CustomTimePicker
            selectedTime={endHour}
            setSelectedTime={setEndHour}
            parentFormValidation={formValidationObject} // Pass validation function
            inputName={END_INPUT_NAME}
          />
          <label className="time-picker-group__next-day-date">{parseNextDay}</label>
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="place">Lugar*:</label>
        <div className="input-group__right">
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          {errors.place && <span className="error">{errors.place}</span>}
        </div>
      </div>
      <div className="input-group">
        <label>
          Evento Semanal
        </label>
        <input
          type="checkbox"
          id="isWeekly"
          checked={isWeekly}
          onChange={(e) => setIsWeekly(e.target.checked)}
        />
      </div>
      <button type="button" onClick={(event) => handleSubmit(event)}>
        Crear Evento
      </button>
    </form>
  );
}

export default EventForm;
