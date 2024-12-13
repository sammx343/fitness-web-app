
const daysOfTheWeekSpanish = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

function parseTimeString(timeString, currentDate, daysToAdd = 0) {
    // Validate time format "hh:mm"
    const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
    if (!timeRegex.test(timeString)) {
        throw new Error("Invalid time format. Please use hh:mm");
    }

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + daysToAdd);

    // Extract hours and minutes from the string
    const [hours, minutes] = timeString.split(":");

    // Set hours, minutes, seconds, and milliseconds to 0 (to avoid unintended time components)
    newDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    return newDate.toString();
}

function getMonthNameFromDate(date) {
    const options = { month: 'long' }; // Use 'short' for abbreviated month names
    const formatter = new Intl.DateTimeFormat('es-ES', options); // Replace 'es-ES' with user's locale code
  
    const monthNameSpanish = formatter.format(date);
    return `${monthNameSpanish[0].toUpperCase() + monthNameSpanish.substring(1)} ${date.getDate()}`;
  }

function parseDateStringToDate(date){
    return `${daysOfTheWeekSpanish[date.getDay()]}, ${getMonthNameFromDate(date)}`;
}

function parseDateStringToDateHour(date){
    return `${daysOfTheWeekSpanish[date.getDay()]}, ${getMonthNameFromDate(date)} ${parsedClickedHourDate(date)}`;
}

//Returns hours string in format "hh:mm". Minutes are always '00' or '30'
function parsedClickedHourDate(date) {
    const currentHours = date.getHours();
    const minutes = date.getMinutes() >= 30 ? "30" : "00";
    const hours = currentHours < 10 ? `0${currentHours}` : currentHours;
    const time = `${hours}:${minutes}`;
    return time;
  }


export { 
    daysOfTheWeekSpanish, 
    daysOfWeek, 
    parseTimeString, 
    parseDateStringToDate, 
    parseDateStringToDateHour, 
    parsedClickedHourDate
};