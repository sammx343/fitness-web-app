import React from "react";
import { parseDateStringToDate, parsedClickedHourDate} from "../../utils/dateUtils";

const EventCard = ({event}) => {
    return (
        <div>
            <h2>
                wefwef
                {event.name}
            </h2>
            <p>{event.description}</p>
            <p><small>El evento empezará el día {parseDateStringToDate(new Date(event.startHour))} a las {parsedClickedHourDate(new Date(event.startHour))}</small></p>
            <p><small>y terminará el día {parseDateStringToDate(new Date(event.endHour))}  a las {parsedClickedHourDate(new Date(event.endHour))}</small></p>
        </div>
    );
};

export {EventCard};
