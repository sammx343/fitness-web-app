
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


export { daysOfTheWeekSpanish, daysOfWeek, parseTimeString };