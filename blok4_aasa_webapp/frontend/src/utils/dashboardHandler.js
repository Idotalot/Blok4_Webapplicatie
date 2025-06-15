import { useEffect, useState } from "react";

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
            setImage('/images/spacez.gif')
        }
    }, [])

    return { image };
};

export default useDashboard
