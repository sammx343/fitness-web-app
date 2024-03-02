import React, { useState, useRef, useEffect } from "react";
import "./EventForm.scss";

function EventForm() {
  const [eventName, setEventName] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [place, setPlace] = useState("");
  const [isWeeklyRepeating, setIsWeeklyRepeating] = useState(false);

  const inputRef = useRef(null);
  const divRef = useRef(null);
  const inputSelectTimeStartRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      !inputSelectTimeStartRef.current.contains(event?.target) &&
      !inputRef.current.contains(event?.target)
    ) {
      inputSelectTimeStartRef.current.classList.remove(
        "secondary-input__opened"
      );
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [inputRef, divRef]);

  const hours = [];
  for (let i = 0; i <= 23; i++) {
    for (let j = 0; j <= 59; j += 15) {
      hours.push(
        `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`
      );
    }
  }

  const handleTimeChangeFromDropdown = (event, dropdownTime) => {
    setStartHour(dropdownTime);
    inputSelectTimeStartRef.current.classList.remove("secondary-input__opened");
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setStartHour(newTime);
  };

  const handleTimeInputFocused = (input) => {
    input.current.classList.add("secondary-input__opened");
  };

  const handleInputBlur = (event, secondaryInput) => {
    const value = event.target.value;
    if (
      value.match(/^(?:[0-1]\d|2[0-3]):(?:[0-5][0-9])$/) &&
      value <= "23:45"
    ) {
      setStartHour(value);
      return;
    }

    const newTime = event.target.value
      .replace(/[^0-9]/g, "")
      .replaceAll(":", "");
    let transformedTime = newTime;

    if (parseInt(newTime) <= 9) {
      transformedTime = `0${newTime}:00`;
    } else if (parseInt(newTime) > 9 && parseInt(newTime) <= 12) {
      transformedTime = `${newTime}:00`;
    } else if (newTime.length === 3 && parseInt(newTime) < 1000) {
      transformedTime = `0${newTime.substring(0, 1)}:${newTime.substring(
        1,
        3
      )}`;
    } else if (parseInt(newTime) > 1000) {
      transformedTime = `${newTime.substring(0, 2)}:${newTime.substring(2, 4)}`;
    }
    console.log(transformedTime);
    // Validate the transformed time format (HH:MM) and range (00:00 - 23:45)
    const isValid =
      transformedTime.match(/^(?:[0-1]\d|2[0-3]):(?:[0-5][0-9])$/) &&
      transformedTime <= "23:45";
    if (isValid) {
      setStartHour(transformedTime);
    } else {
      setStartHour("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
    <form onSubmit={handleSubmit}>
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
        <div className="time-inputs">
          <input
            type="text"
            value={startHour}
            ref={inputRef}
            onChange={handleTimeChange}
            onFocus={() => handleTimeInputFocused(inputSelectTimeStartRef)}
            onBlur={(event) => handleInputBlur(event, inputSelectTimeStartRef)}
            placeholder="00:00"
            required
          />
          <div
            className="time-dropdown secondary-input"
            ref={inputSelectTimeStartRef}
          >
            {hours.map((hour) => (
              <label
                key={hour}
                value={hour}
                onClick={(e) => {
                  handleTimeChangeFromDropdown(e, hour);
                }}
              >
                {hour}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="input-group">
        <label>End Hour (HH:MM):</label>
        <input
          type="text"
          value={endHour}
          onChange={(e) => setEndHour(e.target.value)}
          placeholder="00:00"
          required
        />
        <select
          onChange={(e) => setEndHour(e.target.value)}
          className={"secondary-input"}
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="place">Place:</label>
        <input
          type="text"
          id="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          required
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
          Weekly Repeating
        </label>
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default EventForm;
