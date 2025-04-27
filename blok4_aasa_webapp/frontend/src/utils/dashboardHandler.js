import { useEffect, useState } from "react";
import axios from "axios";

const useDashboard = () => {
    const [data, setData] = useState({
        message: "",
        count: null
    });


    const [image, setImage] = useState('/images/background.png')

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 20) + 1;
        console.log(randomNumber)

        if (randomNumber == 7 || randomNumber == 17) {
            // setImage('/images/spacez.gif')
            setImage('/images/spacez.gif')
            console.log("Switched to lebron.jpg");
        } else if (randomNumber == 9) {
            setImage('/images/django.jpg')
            console.log("Switched to Django")
        }
    }, [])

    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);

    const sendCommand = (e) => {
        if (e.key === "Enter") {
            setMessages(prev => [...prev, "HSTN >> " + inputValue]);
            setInputValue("");
        }
    };

    return { data, image, inputValue, setInputValue, messages, sendCommand };
};

export default useDashboard
