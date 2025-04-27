export default function createMessage(message, messageType) {
    const currentDate = new Date();
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const currentTime = `${formattedDate} | ${formattedTime}`;
    console.log(currentTime);

    const json = {
        response: message,
        type: messageType,
        date: formattedDate,
        time: formattedTime
    };

    return json;
}
