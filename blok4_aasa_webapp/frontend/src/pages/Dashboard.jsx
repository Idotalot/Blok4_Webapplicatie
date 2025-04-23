import { useState } from "react"; // or any other necessary hooks
import useDashboard from "../hooks/dashboard";

export default function Dashboard() {

    const { data, image, messages, sendCommand, inputValue, setInputValue } = useDashboard();

    return (
        <div 
            className="h-screen bg-center bg-cover flex flex-row bg-white overflow-hidden" 
            style={{ 
                backgroundImage: `url(${image})`,
                backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover',
                backgroundRepeat: 'no-repeat', // Prevents repeating of the GIF
            }}
        >
            <div className="w-32 h-screen" style={{ backgroundColor: "#060c1c" }}>
                <img src="/images/AASA_Black_Background.png" alt="Logo" />
            </div>
            <div className="w-full">
                <h1 id="title" className={`text-4xl font-bold m-8 ${image === '/images/background.png' ? 'text-white' : ''}`}>
                Dashboard
                </h1>
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
                    <div id="console-container" className="flex flex-col h-full w-96 rounded-2xl">
                        <div id="console-panel" className="bg-black flex-1 p-4 rounded-2xl overflow-auto opacity-80 font-sourcecode">
                        {messages.map((msg, index) => (
                            <p key={index} className="font-sourcecode text-white">
                            {msg}
                            </p>
                        ))}
                        {/* <p className="font-sourcecode text-white">{data.message}</p> */}
                        <div className="flex flex-row">
                            <p className="text-white font-sourcecode">{">>"}</p>
                            <input id="console-input" type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={sendCommand} className="bg-black pl-2 w-full rounded-xl text-white font-sourcecode focus:outline-none focus:ring-0 focus:border-transparent" />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}