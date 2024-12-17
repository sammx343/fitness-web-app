import React from "react";
import { parseDateStringToDate, parsedClickedHourDate} from "../../utils/dateUtils";
import { createUserEvent } from "../../services/userEvent";

const EventCard = ({event, user}) => {
    function subscribeToEvent(){
        createUserEvent({
            userId: user._id, eventId: event._id, startDate: event.startHour, endDate: event.endHour
        })?.then(res => {
            console.log(res);
        }).catch(error => {
            alert("El usuario ya se encuentra registrado");
        });
    }

    return (
        <div>
            <h2>
                {event.name}
            </h2>
            <p>{event.description}</p>
            <p><small>El evento empezará el día {parseDateStringToDate(new Date(event.startHour))} a las {parsedClickedHourDate(new Date(event.startHour))}</small></p>
            <p><small>y terminará el día {parseDateStringToDate(new Date(event.endHour))}  a las {parsedClickedHourDate(new Date(event.endHour))}</small></p>
            {event.maxCapacity && <p>Cupos disponibles: 0/{event.maxCapacity}</p>}
            {!event.maxCapacity && <p>Los cupos máximos para este evento son ilimitados</p>}
            {event.openToAll && <p>Este evento acepta usuarios que no se han inscrito a la academia</p>}
            {!event.openToAll && <p>Este evento solo acepta usuarios con subscripciones activas.</p>}
            <button onClick={()=>subscribeToEvent()}>Suscribirme a este evento!</button>
        </div>
    );
};

export {EventCard};
