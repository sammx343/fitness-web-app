import React, { useEffect, useState } from "react";
import CalendarEventModal from "./CalendarEventModal";
import "./CalendarLayout.scss";

const CalendarLayout = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const [currentMonths, setCurrentMonths] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  useEffect(() => {
    const months = [];
    for (let indexDay = 0; indexDay < 7; indexDay++) {
      const month = getDateOfWeekDay(indexDay).toLocaleString("default", {
        month: "long",
      });
      if (months.indexOf(month) === -1) months.push(month);
    }
    setCurrentMonths(months);
  }, [currentWeek]);

  function hourClick(event, day, hour) {
    event.target.style.backgroundColor = "red";

    const offsetY = event.nativeEvent.offsetY;
    const divHeight = event.target.offsetHeight;
    const distanceToTopPercentage = offsetY / divHeight;
    let half = distanceToTopPercentage < 0.5 ? ":00" : ":30";
    setShouldOpenModal(true);
  }

  //given the number of the day of the week, convert the number to a date
  // Input: 0
  // currentWeek: 0
  // today: 01/03/2024
  // output: 25/02/2024
  function getDateOfWeekDay(dayNumber) {
    const today = new Date(); // Create a new Date object here
    const todayDayOfWeek = today.getDay();

    const dayOffset = dayNumber - todayDayOfWeek + 7 * currentWeek;
    const targetDate = new Date(today.getTime()); // Create a copy of today
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
      <div className={`day-header ${isToday ? "day-header__highlighted" : ""}`}>
        {day} {targetDay.getDate()}
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
        {currentWeek}
        <div
          className="week-control-arrow"
          onClick={() => changeCurrentWeek(1)}
        >
          {">"}
        </div>
        {currentMonths.map((month) => (
          <p key={month}>{month}</p>
        ))}
      </div>
      <div className="week-days">
        <div className="week-day">
          <div className="day-hour"></div>
          {hours.map((hour) => (
            <div key={`${hour}`} className="day-hour">
              {hour}
            </div>
          ))}
        </div>
        {days.map((day, index) => (
          <div key={day} className="week-day">
            {renderDayHeader(day, index)}
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
      {shouldOpenModal && (
        <CalendarEventModal setShouldOpenModal={setShouldOpenModal} />
      )}
    </div>
  );
};

export default CalendarLayout;
