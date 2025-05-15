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

        // const url = 'ws://145.49.127.248:1880/ws/groep10'
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

    function plantFlag() {
        consoleRef.current?.addLog('Houston', 'run plant-flag', 'message')

        const url = `http://145.49.127.248:1880/groep10?digital_output_1=255`;
        const data = {}; // Data is passed via URL query parameters

        consoleRef.current?.addLog('System', 'Sending POST request to http://145.49.127.248:1880/groep10', 'warning')

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

                    <div
                        id="dashboard"
                        className="flex-1 bg-center flex items-center justify-center min-h-[24rem] lg:m-32"
                    >
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
                                        className="p-2 rounded-lg w-max mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}
                                    >
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
