import React, { useRef, useState, useEffect, useImperativeHandle } from 'react';
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

    // Refenties defineren
    const chartRef = useRef(null);
    const consoleRef = useRef(null);
    const socketRef = useRef(null);

    const { data, image, messages, sendCommand, inputValue, setInputValue } = useDashboard();

    const [measurementActive, activateMeasurements] = useState(false)

    let measurementCount = 0;
    // Wordt meteen geïnstantieerd zodra de pagina is ingeladen
    useEffect(() => {
        if (!measurementActive) return;

        consoleRef.current?.addLog('System', 'Attempting to connect with WebSocket', 'warning');
        consoleRef.current?.setWsStatus('warning');

        let connectionFailed = false

        // Poging doen tot het verbinden met de websocket
        socketRef.current = createWebSocketConnection(
            (message) => {
                let measurement = parseFloat(message.proximity_2 / 10).toFixed(2);
                consoleRef.current?.addLog('Lander', JSON.stringify(message), 'message');
                console.log(message)

                // VERWACHTE RESULTAAT
                const formattedMeasurement = createMeasurement(measurement)
                sendApiData('http://localhost:8000/api/create_meting/', formattedMeasurement.info);

                chartRef.current?.addMeasurements(measurement)

                measurementCount++

                if (measurementCount == 5) {
                    activateMeasurements(false);
                }
            },
            () => {
                console.log('WebSocket connected');
                consoleRef.current?.addLog('WebSocket', `Connection succesful`, 'success');
                consoleRef.current?.setWsStatus('success');
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
                    consoleRef.current?.setWsStatus('error');
                }
                
            }
        );

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
        };
    }, [measurementActive]);

    function plantFlag() {
        consoleRef.current?.addLog('Houston', 'run plant-flag', 'message')
        if (measurementCount >= 5) {
            const request = 'digital_output_1=255'
            const url = `http://145.49.127.248:1880/groep10?${request}`;
            const data = {};

            consoleRef.current?.addLog('System', `Sending POST '${request}' request to http://145.49.127.248:1880/groep10`, 'warning')

            sendApiData(url, data,
                (response) => {
                    console.log(response);
                    consoleRef.current?.addLog(
                        `Satelliet`,
                        `${response.status}`, 
                        "success"
                    );
                },
                (error) => {
                    console.error('Error sending POST request:', error);
                    consoleRef.current?.addLog('API', 'Failed to send POST request', "error");
                }
            );
        } else {
            consoleRef.current?.addLog('System', `Not enough measurements received to plant flag`, 'error')
        }
        
    }

    function startMeasurements() {
        measurementCount = 0;
        consoleRef.current?.addLog('Houston', 'run start-measurement', 'message')
        
        const request = 'digital_output_1=127'
        const url = `http://145.49.127.248:1880/groep10?${request}`;
        console.log(url)
        const data = {};

        consoleRef.current?.addLog('System', `Sending POST request '${request}' to http://145.49.127.248:1880/groep10`, 'warning')

        sendApiData(url, data,
            (response) => {
                console.log(response);
                consoleRef.current?.addLog(
                    `Satelliet`,
                    `${response.status}`, 
                    "success"
                );
                
                activateMeasurements(true)
            },
            (error) => {
                console.error('Error sending POST request:', error);
                consoleRef.current?.addLog('API', 'Failed to send POST request', "error");
            }
        );
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
                className="min-h-screen bg-center bg-cover flex flex-col lg:flex-row bg-white lg:overflow-hidden"
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

                    <div id="dashboard" className="flex-1 bg-center flex items-center justify-center min-h-[24rem] lg:m-32">
                        <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:max-h-[600px] w-full">
                            <div
                                id="function-panel"
                                className="flex flex-col justify-between h-[80vh] lg:h-full w-full lg:flex-1 lg:mr-3 lg:max-w-[50rem]"
                            >
                                <div className="min-h-[18rem] flex flex-1 items-center justify-center lg:bg-[#060c1c] opacity-85 lg:rounded-2xl lg:mb-3">
                                    <ChartComponent
                                        ref={chartRef}
                                    />
                                </div>

                                <div className="h-24 flex lg:flex-row items-center justify-center bg-transparent lg:bg-[#060c1c] lg:opacity-85 lg:rounded-2xl">
                                    <button 
                                        onClick={plantFlag} 
                                        className="p-2 rounded-lg w-max ml-2 mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}
                                    >
                                        Vlag Planten
                                    </button>
                                    <button 
                                        onClick={startMeasurements} 
                                        className="p-2 rounded-lg w-max mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}
                                    >
                                        Afstand meten
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
