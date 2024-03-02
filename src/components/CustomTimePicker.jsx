import React, { useState, useRef, useEffect } from "react";
import "./CustomTimePicker.scss";

const CustomTimePicker = ({ selectedTime, setSelectedTime }) => {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const hours = [];
  for (let i = 0; i <= 23; i++) {
    for (let j = 0; j <= 59; j += 15) {
      hours.push(
        `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`
      );
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !inputRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        dropdownRef.current.classList.remove("secondary-input__opened");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [inputRef]);

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
  };

  const handleTimeSelection = (hour) => {
    setSelectedTime(hour);
    dropdownRef.current.classList.remove("secondary-input__opened");
  };

  const handleTimeInputFocus = () => {
    dropdownRef.current.classList.toggle("secondary-input__opened");
  };

  const handleInputBlur = (event) => {
    const newTime = event.target.value
      .replace(/[^0-9]/g, "")
      .replaceAll(":", "");
    let transformedTime = newTime;

    if (parseInt(newTime) <= 9) {
      transformedTime = `0${newTime}:00`;
    } else if (parseInt(newTime) > 9 && parseInt(newTime) <= 12) {
      transformedTime = `${newTime}:00`;
    } else if (newTime.length === 3) {
      transformedTime = `0${newTime.substring(0, 1)}:${newTime.substring(
        1,
        3
      )}`;
    } else if (newTime.length >= 4) {
      transformedTime = `${newTime.substring(0, 2)}:${newTime.substring(2, 4)}`;
    }

    const isValid =
      transformedTime.match(/^(?:[0-1]\d|2[0-3]):(?:[0-5][0-9])$/) &&
      transformedTime <= "23:59";
    if (isValid) {
      setSelectedTime(transformedTime);
    } else {
      setSelectedTime("");
    }
  };

  return (
    <div className="time-inputs custom-time-picker">
      <input
        type="text"
        value={selectedTime}
        ref={inputRef}
        onChange={handleTimeChange}
        onFocus={handleTimeInputFocus}
        onBlur={handleInputBlur}
        placeholder="00:00"
      />
      <div className="time-dropdown secondary-input" ref={dropdownRef}>
        {hours.map((hour) => (
          <label
            key={hour}
            value={hour}
            onClick={() => handleTimeSelection(hour)}
          >
            {hour}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomTimePicker;
