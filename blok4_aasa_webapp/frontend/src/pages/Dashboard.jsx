import useDashboard from "../utils/dashboardHandler";
import SlotmachineComponent from '../components/slotmachineComponent';
import ConsoleComponent from '../components/consoleComponent';
import NavbarComponent from '../components/navbarComponent';
import usePageTitle from '../utils/titleHandler';  // API POST function


export default function Dashboard() {

    const { data, image, messages, sendCommand, inputValue, setInputValue } = useDashboard();
    usePageTitle();

    return (
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover', backgroundRepeat: 'no-repeat', }}>
            <SlotmachineComponent /> {/* Render SlotmachineComponent} */}
            <div id="app-container" className="h-screen bg-center bg-cover flex flex-col lg:flex-row bg-white lg:overflow-hidden" style={{ backgroundImage: `url(${image})`, backgroundSize: image === '/images/spacez.gif' ? 'contain' : 'cover', backgroundRepeat: 'no-repeat', }}>
                <NavbarComponent /> {/* Render NavbarComponent} */}
                <div className="flex flex-col h-screen w-full lg:bg-transparent">
                    <h1 id="title" className={`text-3xl ml-8 mt-4 font-bold lg:text-4xl lg:m-8 ${image === '/images/background.png' ? 'text-white' : ''}`}></h1>
                    <div id="dashboard" className="flex-1 bg-center flex items-center justify-center lg:m-32" style={{ height: "32rem" }}>
                        <div className="h-full flex flex-col lg:flex-row items-center justify-center lg:max-h-[600px] w-full">
                            <div id="function-panel" className="flex flex-col justify-between h-[80vh] lg:h-full w-full lg:flex-1 lg:mr-3 lg:max-w-[50rem]">
                                <div className="min-h-[16rem] flex flex-1 items-center justify-center lg:bg-[#060c1c] opacity-85 lg:rounded-2xl lg:mb-3">
                                {/* Top part */}
                                    <p className="text-4xl text-white text-center font-bold">Geen metingen beschikbaar</p>
                                </div>
                                <div className="h-32 flex lg:flex-row items-center justify-center bg-transparent lg:bg-[#060c1c] lg:opacity-85 lg:rounded-2xl">
                                    <button className="p-2 rounded-lg w-max ml-2 mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}>
                                        Metingen uitvoeren
                                    </button>   
                                    <button className="p-2 rounded-lg w-max mr-2 font-bold text-xl text-white" style={{ backgroundColor: "#c6002a" }}>
                                        Vlag Planten
                                    </button>
                                </div>
                            </div>
                            <ConsoleComponent /> {/* This will sit next to it on big screens */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}