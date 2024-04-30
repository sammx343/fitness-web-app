import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import CalendarEventModal from "./CalendarEventModal";
import { daysOfTheWeekSpanish, daysOfWeek } from "../../utils/dateUtils";
import "./CalendarLayout.scss";

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, "0")
);

const MINUTES_A_DAY = 60 * 24;
const EVENT_MINUTES_SIZE_SMALL = 20;
const EVENT_MINUTES_SIZE_MEDIUM = 30;
const currentDate = new Date();

const CalendarLayout = ({ events }) => {
  const [monthsYearsHeader, setMonthsYearsHeader] = useState("");
  const [currentYears, setCurrentYears] = useState([]);
  const [currentMonths, setCurrentMonths] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [clickedHourDate, setClickedHourDate] = useState(null);
  const [dayOfWeekEvents, setDayOfWeekEvents] = useState(null);

  const calendarWeekDaysRef = useRef(null);

  useEffect(() => { getCurrentMonthsAndYears() }, [currentWeek]);
  useEffect(() => { parseCurrentMonth() }, [currentMonths, currentYears]);
  useEffect(() => { addRedIndicatorToCurrentDay() }, []);
  useEffect(() => {
    const partitionedEventsIfTwoDays = partitionEvents(events);
    const eventsWeekDaysObject = reduceEventsToDaysOfTheWeekObject(partitionedEventsIfTwoDays);
    const eventsWidthPosition = addEventsWidthAndPosition(eventsWeekDaysObject);
    setDayOfWeekEvents(eventsWidthPosition)
  }, [events]);

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
        {daysOfWeek.map((day, index) => (
          <div key={day} className="week-day" id={`week-day-${day}`}>
            {hours.map((hour) => (
              <div
                onClick={(event) => hourClick(event, index, hour)}
                key={`${day}-${hour}`}
                className="day-hour"
                id={`${day}-${hour}`}
              ></div>
            ))}
            {
              dayOfWeekEvents &&
              createEventsInLayout(dayOfWeekEvents[day], `week-day-${day}`)
            }
          </div>
        ))}
      </div>
    )
  }, [dayOfWeekEvents]);


  //Given an array of events, each containing a date, creates an object in which
  //each key wil be a day of the week containing an array which is event corresponding
  //to that date: Ex: 
  // Input: 
  // [ {startHour: "2024-04-23T17:30:00.000Z", eventName: 'Karate'},  {startHour: "2024-04-24T18:30:00.000Z", eventName: 'Abs'}]
  // Output:
  // { { Martes: { startHour, eventName}, Miercoles: { startHour, eventName} }
  function reduceEventsToDaysOfTheWeekObject(events) {
    return events.reduce((accum, currentEvent) => {
      return addEventToDayOfWeek(accum, currentEvent);
    }, {});
  }

  //Some events can be create in two dates, for example, start at Wednesday 9pm and end at Thursday 9am
  //So we separate those events visually into two
  function partitionEvents(events){
    return events.reduce((accum, event)=>{
      if(eventHappensInTwoDays(event)){
        const [firstEvent, secondEvent] = normalizeDateHours(event);
        return [...accum, firstEvent, secondEvent];
      } else {
        return [...accum, event]
      }
    }, []);
  }

  function addEventToDayOfWeek(accum, currentEvent){
    const eventStartHourDate = new Date(currentEvent.startHour);
    const dayOfWeek = daysOfWeek[eventStartHourDate.getDay()];
    let dayWeekArrayEvents = [currentEvent];
    if (accum[dayOfWeek]) {
      dayWeekArrayEvents = [...accum[dayOfWeek], currentEvent]
    }
    return { ...accum, [dayOfWeek]: dayWeekArrayEvents }
  }

  function eventHappensInTwoDays(event){
    return (new Date(event.startHour)).getDay() != (new Date(event.endHour).getDay());
  }

  function normalizeDateHours(originalObject) {
    const startDate = new Date(originalObject.startHour);
    const endDate = new Date(originalObject.endHour);
  
    const normalizedStartObject = {
      ...originalObject,
      endHour: (new Date(startDate.setHours(23, 59, 59, 999))).toString(),
    };
  
    // Normalize endHour object
    const normalizedEndObject = {
      ...originalObject, // Copy all properties from original object
      startHour: new Date(endDate.setHours(0, 0, 0, 0)).toString(),
    };
  
    return [ normalizedStartObject, normalizedEndObject ];
  }

  function addEventsWidthAndPosition(weekDaysObject) {
    Object.values(weekDaysObject).forEach(weekDay => {
      weekDay.forEach(currentEvent => {
        weekDay.forEach((event) => {
          if (event._id === currentEvent._id) return;
          const eventsAreOverlaping = areEventsOverlaping(event, currentEvent);
          if (eventsAreOverlaping) {
            currentEvent.overlapingCount = currentEvent.overlapingCount ? currentEvent.overlapingCount + 1 : 2;
            if (event.startHour <= currentEvent.startHour) {
              currentEvent.position = currentEvent.position ? currentEvent.position + + 1 : 2;
            }
          };
        });
      });
    });
    return weekDaysObject;
  }

  function areEventsOverlaping(event1, event2) {
    const parsedEvent1 = getEventStartAndEndInMinutes(event1);
    const parsedEvent2 = getEventStartAndEndInMinutes(event2);
    //Sets the minimun size of an event. For example if an event only last a minute, it has to be visible,
    //So we set it's 'duration' depending on the constants EVENT_MINUTES_SIZE_SMALL and EVENT_MINUTES_SIZE_MEDIUM
    const event1Duration = returnMinutesAccordingToDuration(parsedEvent1.endMinutes - parsedEvent1.startMinutes);
    const event2Duration = returnMinutesAccordingToDuration(parsedEvent2.endMinutes - parsedEvent2.startMinutes);

    if (parsedEvent2.startMinutes >= parsedEvent1.startMinutes && parsedEvent2.startMinutes < parsedEvent1.startMinutes + event1Duration) {
      return true
    } else if (parsedEvent1.startMinutes >= parsedEvent2.startMinutes && parsedEvent1.startMinutes < parsedEvent2.startMinutes + event2Duration) {
      return true
    }
    return false;
  }

  function getEventStartAndEndInMinutes(event) {
    const eventDate = new Date(event.startHour);
    const eventDateEnd = new Date(event.endHour);
    return {
      startDate: eventDate,
      endDate: eventDateEnd,
      startMinutes: eventDate.getHours() * 60 + eventDate.getMinutes(),
      endMinutes: eventDateEnd.getHours() * 60 + eventDateEnd.getMinutes()
    };
  }

  function createEventsInLayout(events, id) {
    if (!events || Object.keys(events).length === 0) return '';
    return (
      <Fragment>
        {Object.values(events).map((event, index) => {
          const eventParsedInfo = getEventStartAndEndInMinutes(event);
          const weekDayColumn = document.querySelector(`#${id}`);
          const offsetTop = (eventParsedInfo.startMinutes / MINUTES_A_DAY) * weekDayColumn?.offsetHeight;
          const eventMinutesDuration = eventParsedInfo.endMinutes - eventParsedInfo.startMinutes;
          const height = returnMinutesAccordingToDuration(eventMinutesDuration) * weekDayColumn?.offsetHeight / MINUTES_A_DAY;
          return (<div className={`event ${height < EVENT_MINUTES_SIZE_SMALL ? 'event--small' : ''} ${height > EVENT_MINUTES_SIZE_SMALL && height < EVENT_MINUTES_SIZE_MEDIUM ? 'event--medium' : ''}`}
            style={{ top: offsetTop, height, width: `${(100 / event.overlapingCount)}%`, left: `${calculateEventLeftPosition(event)}%` }} key={`${id}-${index}`}>
            <h3>{event.name}</h3>
            <div className="event__hours">
              <p>{`${padTime(eventParsedInfo.startDate.getHours())}:${padTime(eventParsedInfo.startDate.getMinutes())}`}</p>
              -
              <p>{`${padTime(eventParsedInfo.endDate.getHours())}:${(eventParsedInfo.endDate.getMinutes() + '').padEnd(2, "0")}`}</p>
            </div>
          </div>)
        })}
      </Fragment>
    )
  }

  function calculateEventLeftPosition(event) {
    if (!event.overlapingCount) return 0;
    let leftSize = 0;
    const eventSize = 100 / event.overlapingCount;
    const eventPositionMultiplier = event.position ? event.position - 1 : 0;
    leftSize = eventSize * eventPositionMultiplier;
    leftSize = leftSize > 0 ? leftSize - 10 : leftSize;
    return leftSize;
  }

  function returnMinutesAccordingToDuration(minutes) {
    if (minutes <= EVENT_MINUTES_SIZE_SMALL) {
      return EVENT_MINUTES_SIZE_SMALL
    } else if (minutes > EVENT_MINUTES_SIZE_SMALL && minutes <= EVENT_MINUTES_SIZE_MEDIUM) {
      return EVENT_MINUTES_SIZE_MEDIUM
    }
    return minutes;
  }

  function padTime(timeNumber) {
    return (timeNumber + '').padStart(2, "0")
  }

  function addRedIndicatorToCurrentDay() {
    const currentWeekDay = daysOfWeek[currentDate.getDay()];
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
        {daysOfTheWeekSpanish.map((day, index) => {
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
