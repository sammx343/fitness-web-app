import React, { useEffect, useMemo, useRef, useState } from "react";
import CalendarEventModal from "./CalendarEventModal";
import { daysOfTheWeek } from "../../utils/dateUtils";
import "./CalendarLayout.scss";

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const currentDate = new Date();

const CalendarLayout = () => {
  const [monthsYearsHeader, setMonthsYearsHeader] = useState("");
  const [currentYears, setCurrentYears] = useState([]);
  const [currentMonths, setCurrentMonths] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [clickedHourDate, setClickedHourDate] = useState(null);
  const calendarWeekDaysRef = useRef(null);

  useEffect(() => { getCurrentMonthsAndYears() }, [currentWeek]);
  useEffect(() => { parseCurrentMonth() }, [currentMonths, currentYears]);
  useEffect(() => { addRedIndicatorToCurrentDay() }, []);

  const createWeekLayout = useMemo(() => {
    return (
      <div className="week-days" ref={calendarWeekDaysRef} >
        <div className="week-day">
          {hours.map((hour) => (
            <div key={`${hour}`} className="day-hour">
              {hour}
            </div>
          ))}
        </div>
        {daysOfTheWeek.map((day, index) => (
          <div key={day} className="week-day">
            {hours.map((hour) => (
              <div
                onClick={(event) => hourClick(event, index, hour)}
                key={`${day}-${hour}`}
                className="day-hour"
                id={`${day}-${hour}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    )
  }, []);

  function addRedIndicatorToCurrentDay() {
    const currentWeekDay = daysOfTheWeek[currentDate.getDay()];
    const hour = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes();

    const id = `${currentWeekDay}-${hour}`

    if (calendarWeekDaysRef.current) {
      const targetElement = calendarWeekDaysRef.current.querySelector(`[id*="${id}"]`); // Adjust selector based on your ID scheme
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        targetElement.classList.add("current-hour");
        const newElement = document.createElement("div");
        const top = `${(minutes / 60) * 100}%`;
        newElement.setAttribute("class", "current-hour__pointer");
        targetElement.appendChild(newElement);
        newElement.style.top = top;
      }
    }
  }

  //Gets the month(s) of the current week to show in the calendar layout header
  function getCurrentMonthsAndYears() {
    const months = [];
    const years = [];
    for (let indexDay = 0; indexDay < 7; indexDay++) {
      const month = getDateOfWeekDay(indexDay).toLocaleString("default", {
        month: "long",
      });
      const year = getDateOfWeekDay(indexDay).getFullYear();
      if (months.indexOf(month) === -1) months.push(month);
      if (years.indexOf(year) === -1) years.push(year);
    }

    setCurrentMonths(months);
    setCurrentYears(years);
  }

  //Parses the month(s) of the current week to show in the calendar layout header
  function parseCurrentMonth() {
    if (currentMonths.length === 1) {
      setMonthsYearsHeader(`${currentMonths[0]} ${currentYears[0]}`);
    }
    else if (currentMonths.length > 1 && currentYears.length === 1) {
      setMonthsYearsHeader(`${currentMonths[0]} - ${currentMonths[1]} ${currentYears[0]}`);
    }
    else {
      setMonthsYearsHeader(`${currentMonths[0]} ${currentYears[0]} - ${currentMonths[1]} ${currentYears[1]}`);
    }
  }

  function hourClick(event, dayIndex, hour) {
    // event.target.style.backgroundColor = "red";

    const offsetY = event.nativeEvent.offsetY;
    const divHeight = event.target.offsetHeight;
    const distanceToTopPercentage = offsetY / divHeight;
    const half = distanceToTopPercentage < 0.5 ? "00" : "30";
    const date = getDateOfWeekDay(dayIndex);
    date.setHours(hour, half, 0);
    setClickedHourDate(date)
    setShouldOpenModal(true);
  }

  //given the number of the day of the week, convert the number to a date
  // Input: 0
  // currentWeek: 0
  // today: 01/03/2024
  // output: 25/02/2024
  function getDateOfWeekDay(dayNumber) {
    const todayDayOfWeek = currentDate.getDay();

    const dayOffset = dayNumber - todayDayOfWeek + 7 * currentWeek;
    const targetDate = new Date(currentDate.getTime()); // Create a copy of today
    targetDate.setDate(targetDate.getDate() + dayOffset);
    return targetDate;
  }

  function changeCurrentWeek(addWeek) {
    setCurrentWeek(currentWeek + addWeek);
  }

  const renderDayHeader = (day, index) => {
    const targetDay = getDateOfWeekDay(index);
    const isToday =
      currentDate.getDay() === index &&
      targetDay.toDateString() === new Date().toDateString();
    return (
      <div className={`day-header ${isToday ? "day-header__highlighted" : ""}`} key={`${day}-${index}`}>
        {day.substring(0, 3)} {targetDay.getDate()}
      </div>
    );
  };

  return (
    <div className="week-calendar">
      <div className="week-controls">
        <div
          className="week-control-arrow"
          onClick={() => changeCurrentWeek(-1)}
        >
          {"<"}
        </div>
        <div
          className="week-control-arrow"
          onClick={() => changeCurrentWeek(1)}
        >
          {">"}
        </div>
        {monthsYearsHeader}
      </div>
      <div className="week-days week-days-header">
        <div className="day-header"></div>
        {daysOfTheWeek.map((day, index) => {
          return renderDayHeader(day, index)
        })}
      </div>
      {createWeekLayout}
      {shouldOpenModal && (
        <CalendarEventModal setShouldOpenModal={setShouldOpenModal} clickedHourDate={clickedHourDate} />
      )}
    </div>
  );
};

export default CalendarLayout;
