export default function createMeasurement(measurement) {
    const currentDate = new Date();
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const newMeasurement = {
        info: {
            afstand: measurement,             // Sending message content
            meetDatum: formattedDate,  // Date of message
            meetTijd: formattedTime   // Time of message
        }        
    };

    return newMeasurement;
}
