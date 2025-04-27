import { useEffect, useState } from "react"; // or any other necessary hooks
import { useLocation } from "react-router-dom";
import useDashboard from "../utils/dashboardHandler";
import ConsoleComponent from '../components/consoleComponent';
import NavbarComponent from '../components/navbarComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faRulerVertical, faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import usePageTitle from '../utils/titleHandler';  // API POST function

export default function Logs() {

    const { data, image, messages, sendCommand, inputValue, setInputValue } = useDashboard();
    usePageTitle();

    return (
        <div className="h-screen bg-center bg-cover flex flex-row bg-white overflow-hidden" style={{ backgroundImage: `url(${image})`, backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover', backgroundRepeat: 'no-repeat', }}>
            <NavbarComponent /> {/* Render NavbarComponent} */}
            <div className="w-full">
                <h1 id="title" className={`text-4xl font-bold m-8 ${image === '/images/background.png' ? 'text-white' : ''}`}></h1>
                <div id="dashboard" className="bg-center m-32 flex flex-row items-center justify-center" style={{ height: "32rem" }}>
                    <div id="function-panel" className="flex flex-col justify-between h-full w-96 mr-3" style={{ width: "36rem" }}>
                        <div className="flex-1 bg-black rounded-2xl mb-3 opacity-85" style={{ backgroundColor: "#060c1c" }}></div>
                        <div className="h-32 bg-black rounded-2xl flex items-center justify-center opacity-85" style={{ backgroundColor: "#060c1c" }}>
                        <button className="p-2 rounded-lg mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}>
                            Metingen uitvoeren
                        </button>
                        <button className="p-2 rounded-lg font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}>
                            Vlag Planten
                        </button>
                        </div>
                    </div>
                    <ConsoleComponent />  {/* Render ConsoleComponent */}
                </div>
            </div>
        </div>
    );

}