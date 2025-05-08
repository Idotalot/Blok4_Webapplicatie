import { useEffect, useState } from "react"; // or any other necessary hooks
import { useLocation } from "react-router-dom";
import useDashboard from "../utils/dashboardHandler";
import NavbarComponent from '../components/navbarComponent';
import usePageTitle from '../utils/titleHandler';  // API POST function

export default function Metingen() {

    const { data, image, messages, sendCommand, inputValue, setInputValue } = useDashboard();
    usePageTitle();

    const [metingen, setMetingen] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/metingen/')
            .then(response => response.json())
            .then(data => setMetingen(data))
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    return (
        <div id="app-container" className="h-screen bg-center bg-cover flex flex-col lg:flex-row bg-white lg:overflow-hidden" style={{ backgroundImage: `url(${image})`, backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover', backgroundRepeat: 'no-repeat', }}>
            <NavbarComponent /> {/* Render NavbarComponent} */}
            <div className="flex flex-col h-screen w-full bg-[rgba(6,12,28,0.85)] lg:bg-transparent">
                <h1 id="title" className={`text-3xl ml-8 mt-4 font-bold lg:text-4xl lg:m-8 ${image === '/images/background.png' ? 'text-white' : ''}`}></h1>
                <div id="dashboard" className="flex-1 bg-center flex items-center justify-center lg:m-32" style={{ height: "32rem" }}>
                    <div className="h-full flex flex-col lg:flex-col items-center justify-center lg:max-h-[600px] w-full">
                        <div id="table" className="w-full h-full flex flex-col lg:bg-[#060c1c] opacity-85 rounded-2xl lg:max-w-[90rem] text-white">
                            <div id="tableHeader" className="grid grid-flow-col grid-cols-7 w-full h-16 border-b-2 font-bold lg:bg-[#060c1c] lg:rounded-t-2xl lg:opacity-85 lg:max-w-[90rem border-gray-500">
                                <p className="col-span-1 flex items-center justify-center">
                                    Metingnummer
                                </p>
                                <p className="col-span-2 flex items-center justify-center">
                                    Datum
                                </p>
                                <p className="col-span-2 flex items-center justify-center">
                                    Tijd
                                </p>
                                <p className="col-span-2 flex items-center justify-center">
                                    Afstand
                                </p>
                            </div>
                            <div id="tableBody" className="w-full flex-1 lg:bg-[#060c1c] overflow-y-auto lg:opacity-85 lg:max-w-[90rem] lg:flex-1" style={{scrollbarColor: "#ffffff00"}}>
                                {metingen.length === 0 && (
                                    <div id="tableHandler" className="w-full h-full text-2xl flex items-center justify-center font-bold">
                                        Geen metingen gevonden...
                                    </div>
                                )}
                                {metingen.map((meting) => {
                                    const date = new Date(meting.meetDatum)
                                    const day = String(date.getDate()).padStart(2, '0');
                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                    const year = date.getFullYear();
                                    const formattedDate = `${day}-${month}-${year}`;

                                    return (
                                        <div key={'meting-'+meting.meetID} id={'meting-'+meting.meetID} className="grid grid-flow-col grid-cols-7 hover:bg-[#7e93a8]">
                                            <p className="p-4 col-span-1 flex items-center justify-center">
                                                {meting.metingID}
                                            </p>
                                            <p className="p-4 col-span-2 flex items-center justify-center">
                                                {formattedDate}
                                            </p>
                                            <p className="p-4 col-span-2 flex items-center justify-center">
                                                {meting.meetTijd}
                                            </p>
                                            <p className="p-4 col-span-2 flex items-center justify-center">
                                                {meting.afstand}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                            <div id="tableFooter" className="w-full h-16 border-t-2 border-gray-500 lg:bg-[#060c1c] lg:rounded-b-2xl lg:opacity-85 lg:max-w-[90rem]">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}