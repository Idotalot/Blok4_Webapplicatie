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

        if (randomNumber == 7) {
            // setImage('/images/spacez.gif')
            setImage('/images/spacez.gif')
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
