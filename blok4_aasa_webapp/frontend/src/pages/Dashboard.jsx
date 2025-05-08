import React, { useRef, useState, useEffect } from 'react';
import useDashboard from "../utils/dashboardHandler";
import SlotmachineComponent from '../components/slotmachineComponent';
import ConsoleComponent from '../components/consoleComponent';
import ChartComponent from '../components/chartComponent';
import NavbarComponent from '../components/navbarComponent';
import usePageTitle from '../utils/titleHandler';  // API POST function
import { createWebSocketConnection } from '../utils/websocketHandler';
import createMeasurement from '../utils/measurementsHandler';
import { sendApiData } from '../utils/apiHandler';

export default function Dashboard() {
    // Pagina titel & URL dynamisch opstellen op basis van paginanaam
    usePageTitle();
    const [measurements, setMeasurement] = useState([]);

    // Refenties defineren
    const chartRef = useRef(null);
    const consoleRef = useRef(null);
    const socketRef = useRef(null);

    const { data, image, messages, sendCommand, inputValue, setInputValue } = useDashboard();

    // Wordt meteen geïnstantieerd zodra de pagina is ingeladen
    useEffect(() => {
        consoleRef.current?.addLog('System', 'Attempting to connect with WebSocket', 'warning');
        let connectionFailed = false

        // Poging doen tot het verbinden met de websocket
        socketRef.current = createWebSocketConnection(
          (message) => {            
            consoleRef.current?.addLog('Lander', message, 'message');
            
            let measurement = message.meting_1
            // VERWACHTE RESULTAAT
            const formattedMeasurement = createMeasurement(measurement)
            sendApiData('http://localhost:8000/api/create_meting/', formattedMeasurement.info);

            chartRef.current?.addMeasurements(measurements)
          },
          () => {
            console.log('WebSocket connected');
            consoleRef.current?.addLog('WebSocket', `Connection succesful`, 'success');
            consoleRef.current?.setWsStatus('succes');
          },
          (error) => {
            const url = 'ws://145.49.127.248:1880/ws/groep10'
            connectionFailed = true

            console.log("error fetching websocket")
            consoleRef.current?.addLog('WebSocket', `Could not connect with ${url}`, 'error');
            consoleRef.current?.setWsStatus('error');
          },
          () => {
            console.log('WebSocket disconnected');
            console.log(connectionFailed)
            if (connectionFailed == false) {
                consoleRef.current?.addLog('WebSocket', `Connection terminated`, 'warning');
                consoleRef.current?.setWsStatus('warning');
            }
            
          }
        );
    
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, []);

    function getRecentMeasurements() {
        const measurementState = chartRef.current?.showLatestResults();
        if (measurementState == true) {
            consoleRef.current?.addLog('System', 'Chart updated succesfully', 'success')
        } else if (measurementState == false) {
            consoleRef.current?.addLog('System', 'Not enough data to fill chart', 'error')
        }
    }

    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <SlotmachineComponent /> {/* Render SlotmachineComponent*/}

            <div
                id="app-container"
                className="h-screen bg-center bg-cover flex flex-col lg:flex-row bg-white lg:overflow-hidden"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <NavbarComponent />

                <div className="flex flex-col h-screen w-full bg-[rgba(6,12,28,0.85)] lg:bg-transparent lg:opacity-1">
                    <h1
                        id="title"
                        className={`text-3xl ml-8 mt-4 font-bold lg:text-4xl lg:m-8 ${image === '/images/background.png' ? 'text-white' : ''}`}
                    ></h1>

                    <div
                        id="dashboard"
                        className="flex-1 bg-center flex items-center justify-center lg:m-32"
                        style={{ height: "32rem" }}
                    >
                        <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:max-h-[600px] w-full">
                            <div
                                id="function-panel"
                                className="flex flex-col justify-between h-[80vh] lg:h-full w-full lg:flex-1 lg:mr-3 lg:max-w-[50rem]"
                            >
                                <div className="min-h-[16rem] flex flex-1 items-center justify-center lg:bg-[#060c1c] opacity-85 lg:rounded-2xl lg:mb-3">
                                    <ChartComponent
                                        ref={chartRef}
                                    />
                                </div>

                                <div className="h-32 flex lg:flex-row items-center justify-center bg-transparent lg:bg-[#060c1c] lg:opacity-85 lg:rounded-2xl">
                                    <button
                                        onClick={getRecentMeasurements}  // Call the handler function here
                                        className="p-2 rounded-lg w-max ml-2 mr-2 font-bold text-xl text-white"
                                        style={{ backgroundColor: "#c6002a" }}
                                    >
                                        Metingen uitvoeren
                                    </button>
                                    <button className="p-2 rounded-lg w-max mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}>
                                        Vlag Planten
                                    </button>
                                </div>
                            </div>

                            {/* Attach the ref to the ConsoleComponent */}
                            <ConsoleComponent 
                                ref={consoleRef}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
