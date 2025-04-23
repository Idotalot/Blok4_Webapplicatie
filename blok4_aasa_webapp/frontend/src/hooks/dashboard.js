import { useEffect, useState } from "react";
import axios from "axios";

const useDashboard = () => {
    const [data, setData] = useState({
        message: "",
        count: null
    });

    useEffect(() => {
    axios.get("http://145.49.127.248:1880/groep10")
        .then(response => {
            setData({
                message: response.data.message,
                count: response.data.count,
            });
        })
        .catch(err => {
            console.log(err);
            setData({
                message: "Error fetching data",
                count: null,
            });
        });
    }, []);


    const [image, setImage] = useState('/images/background.png')

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        console.log(randomNumber)

        if (randomNumber == 7) {
            setImage('/images/spacez.gif')
            console.log("Switched to lebron.jpg");
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
