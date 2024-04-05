import React, { useState, useRef, useEffect } from "react";
import "./CustomTimePicker.scss";


const TIME_DIVISIVILITY_IN_MINUTES = 15;
const hours = [];
for (let i = 0; i <= 23; i++) {
  for (let j = 0; j <= 59; j += TIME_DIVISIVILITY_IN_MINUTES) {
    hours.push(
      `${i.toString().padStart(2, "0")}:${j.toString().padStart(2, "0")}`
    );
  }
}

const CustomTimePicker = ({
  selectedTime,
  setSelectedTime,
  formValidations,
  inputName,
}) => {
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const isFocused = useRef(false);
  const [timeBeforeFocus, setTimeBeforeFocus] = useState();

  useEffect(() => {
    //Closes hours div when clicked outside
    const handleClickOutside = (event) => {
      if (
        !inputRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target) &&
        !isFocused.current
      ) {
        dropdownRef.current.classList.remove("secondary-input__opened");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [inputRef]);

  const moveSelectBoxAccordingToWrittenInput = (time) => {
    if (!time) return;

    const parsedTime = parseTimeToFormat(time);
    const hourMinutes = parsedTime.substring(3, 5);
    const timeDivisible = Math.floor(parseInt(hourMinutes) / TIME_DIVISIVILITY_IN_MINUTES);
    const parsedTimeForValue =
      parsedTime.substring(0, 3) +
      (timeDivisible === 0 ? "00" : timeDivisible * TIME_DIVISIVILITY_IN_MINUTES);

    const hourElement = dropdownRef.current.querySelector(
      `[value="${parsedTimeForValue}"]`
    );

    dropdownRef.current
      .querySelector(".scrolled-to")
      ?.classList.remove("scrolled-to");
    hourElement?.classList.add("scrolled-to");

    hourElement?.scrollIntoView({
      block: "center",
      inline: "center",
    });
  };

  const handleOnInputChange = (event) => {
    const newTime = event.target.value;
    setSelectedTime(newTime);
    moveSelectBoxAccordingToWrittenInput(newTime);
    dropdownRef.current.classList.add("secondary-input__opened");
  };

  const handleOnClickSelect = (hour) => {
    const isValidInForm = formValidations(inputName, hour);
    if (isValidInForm) {
      setSelectedTime(hour);
    }
    dropdownRef.current.classList.remove("secondary-input__opened");
  };

  const handleOnClick = () => {
    dropdownRef.current.classList.add("secondary-input__opened");
  };

  const handleOnFocus = () => {
    setTimeBeforeFocus(selectedTime);
    isFocused.current = true;
    dropdownRef.current.classList.add("secondary-input__opened");
    moveSelectBoxAccordingToWrittenInput(selectedTime);
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleWrittenInputValidation(event);
      dropdownRef.current.classList.remove("secondary-input__opened");
    }
  };

  const handleOnBlur = (event) => {
    handleWrittenInputValidation(event);
  };

  const parseTimeToFormat = (time) => {
    let newTime = time.replace(/[^0-9]/g, "").replaceAll(":", "");
    let transformedTime = newTime;

    if (
      newTime.length >= 2 &&
      newTime.length < 4 &&
      newTime.substring(0, 1) === "0"
    ) {
      newTime = newTime.substring(1, newTime.length);
    }

    if (parseInt(newTime) <= 9) {
      transformedTime = `0${newTime}:00`;
    } else if (parseInt(newTime) > 9 && parseInt(newTime) <= 23) {
      transformedTime = `${newTime}:00`;
    } else if (newTime.length === 2 && parseInt(newTime.substring(1, 2)) < 6) {
      transformedTime = `0${newTime.substring(0, 1)}:${newTime.substring(
        1,
        2
      )}0`;
    } else if (
      newTime.length === 3 &&
      transformedTime.substring(0, 1) !== "0"
    ) {
      transformedTime = `0${newTime.substring(0, 1)}:${newTime.substring(
        1,
        3
      )}`;
    } else if (newTime.length >= 4) {
      transformedTime = `${newTime.substring(0, 2)}:${newTime.substring(2, 4)}`;
    }
    return transformedTime;
  };

  const handleWrittenInputValidation = (event) => {
    const transformedTime = parseTimeToFormat(event.target.value);

    const isValid =
      transformedTime.match(/^(?:[0-1]\d|2[0-3]):(?:[0-5][0-9])$/) &&
      transformedTime <= "23:59";

    isFocused.current = false;

    const isValidInForm = formValidations(inputName, transformedTime);
    if (isValidInForm && isValid) {
      setSelectedTime(transformedTime);
    } else {
      setSelectedTime(timeBeforeFocus);
    }
  };

  return (
    <div className="time-inputs custom-time-picker">
      <input
        type="text"
        value={selectedTime}
        ref={inputRef}
        onChange={handleOnInputChange}
        onClick={handleOnClick}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyUp={handleKeyUp}
        placeholder="00:00"
      />
      <div className="time-dropdown secondary-input" ref={dropdownRef}>
        {hours.map((hour) => (
          <label
            key={hour}
            value={hour}
            onClick={() => handleOnClickSelect(hour)}
          >
            {hour}
          </label>
        ))}
      </div>
      <p style={{color : 'red'}}>Hora final no puede ser menor a hora inicial</p>
    </div>
  );
};

export default CustomTimePicker;
