export default function createMessage(messageSender, message, messageType) {
    const currentDate = new Date();
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const currentTime = `${formattedDate} | ${formattedTime}`;
    console.log(currentTime);

    const newMessage = {
        verstuurder: messageSender,  // Sending message sender
        tekst: message,              // Sending message content
        verstuurDatum: formattedDate,  // Date of message
        verstuurTijd: formattedTime   // Time of message
    };

    return newMessage;
}
