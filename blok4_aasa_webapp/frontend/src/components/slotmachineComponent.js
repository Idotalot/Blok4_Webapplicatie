import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

const SlotmachineComponent = () => {
    const debugRef = useRef(null);
    const reelsRef = useRef([]);
    const indexes = useRef([0, 0, 0]);

    const iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
    const icon_height = 79;
    const num_icons = 9;
    const time_per_icon = 100;

    // Function to roll one reel
    const roll = (reel, offset = 0) => {
        const delta = (offset + 2) * num_icons + Math.floor(Math.random() * num_icons); 

        return new Promise((resolve) => {
            const style = getComputedStyle(reel);
            const backgroundPositionY = parseFloat(style.backgroundPositionY || '0');
            const targetBackgroundPositionY = backgroundPositionY + delta * icon_height;
            const normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

            // Set the transition for the rolling animation
            setTimeout(() => {
                reel.style.transition = `background-position-y ${(8 + delta) * time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
                reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
            }, offset * 150);

            // Reset position and stop transition after animation
            setTimeout(() => {
                reel.style.transition = 'none';
                reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
                resolve(delta % num_icons);
            }, (8 + delta) * time_per_icon + offset * 150);
        });
    };

    // Function to roll all reels at once
    const rollAll = () => {
        if (!debugRef.current) return;

        debugRef.current.textContent = 'rolling...';

        Promise.all(reelsRef.current.map((reel, i) => roll(reel, i)))
            .then((deltas) => {
                // Update the reel indexes based on the result
                deltas.forEach((delta, i) => {
                    indexes.current[i] = (indexes.current[i] + delta) % num_icons;
                });
                debugRef.current.textContent = indexes.current.map((i) => iconMap[i]).join(' - ');

                const slotsEl = document.querySelector(".slots");

                // Check if the reels are in a winning combination
                if (indexes.current[0] === indexes.current[1] || indexes.current[1] === indexes.current[2]) {
                    const winCls = indexes.current[0] === indexes.current[2] ? "win2" : "win1";
                    slotsEl?.classList.add(winCls);
                    setTimeout(() => slotsEl?.classList.remove(winCls), 2000);

                    const audio = new Audio(`/audio/victory.mp3`);
                    audio.play();
                }
            });
    };

    const returnToPage = () => {
        document.getElementById("slotmachine-modal").classList.add("hidden")
        document.getElementById("slotmachine").classList.add("hidden")
    }

    return (
        <div id="slotmachine-modal" className="hidden w-full h-screen bg-black/50 fixed z-10 flex flex-col ">
            <div className='flex justify-end'>
                <button onClick={returnToPage} className='p-2 hover:bg-opacity-40 hover:bg-red-500'>
                    <FontAwesomeIcon icon={faTimes} className='text-3xl text-white m-4'></FontAwesomeIcon>
                </button>
            </div>
            <div className='flex items-center justify-center flex-1'>
                <div id='slotmachine' className="hidden w-[30rem] h-[50rem] bg-[#060c1c] relative z-20 rounded-2xl bg-no-repeat">
                    <div className="w-[28rem] h-20 ml-auto mr-auto mt-4 text-white font-bold font-serif flex items-center justify-center text-center text-4xl" style={{ backgroundImage: `url('/images/slotmachine.png')`, backgroundSize: `100%` }}>
                        SLOT MACHINE
                    </div>
                    <div className="w-full h-[18rem] mt-4 flex flex-col items-center justify-center">
                        <div ref={debugRef} className="debug mt-10 mb-4 bg-slate-700 p-1 text-[#b89523]"></div>
                        <div className="grid grid-cols-3 gap-4 bg-slate-700 p-4 shadow-lg shadow-black">
                            {[0, 1, 2].map((_, idx) => (
                                <div
                                    key={idx}
                                    className="slotreel w-16 h-[14rem] bg-gray-900 flex items-center justify-center text-4xl font-serif bg-repeat shadow-black"
                                    style={{ 
                                        backgroundImage: `url('/images/slotreel.webp')`, 
                                        backgroundSize: `100%`, 
                                        backgroundPositionY: 0 
                                    }}
                                    ref={el => reelsRef.current[idx] = el}
                                ></div>
                            ))}
                        </div>
                    </div>
                    <div className="h-[16rem] flex flex-col items-center justify-center">
                        <div className="w-[28rem] h-16 bg-white flex items-center justify-center" style={{ backgroundImage: `url('/images/slotmachine.png')`, backgroundSize: `100%` }}>
                            <button onClick={rollAll} className="bg-[#b89523] p-2 text-white w-28 h-28 font-bold rounded-full border-4 hover:bg-[#a78b31] border-gray-400">
                                <FontAwesomeIcon icon={faSyncAlt} className='text-3xl text-white'></FontAwesomeIcon>
                            </button>
                        </div>
                    </div>
                    <p className='text-white font-bold text-center'>
                        *LET OP* 99% van alle gokkers stoppen voordat ze groots winnen, geef niet op!
                    </p>
                </div>
            </div>
            <style>{`
                .debug {
                    font-family: monospace;
                    font-size: 1.6rem;
                }
                .slots {
                    position: relative;
                    width: 3.5 * 79px;
                    height: 3 * 79px;
                    display: flex;
                    justify-content: space-between;
                    padding: 0.3 * 79px;
                    background: linear-gradient(45deg, grey 0%, lightgray 100%);
                    border-top: 1px solid rgba(white, 0.6);
                    border-right: 1px solid rgba(white, 0.6);
                    border-left: 1px solid rgba(black, 0.4);
                    border-bottom: 1px solid rgba(black, 0.4);
                    box-shadow: -2px 2px 3px rgba(black, 0.3);
                    border-radius: 3px;
                }
                .slotreel {
                    position: relative;
                    width: 79px;
                    height: 3 * 79px;
                    border: 1px solid rgba(black, 0.3);
                    border-radius: 3px;
                    overflow: hidden;
                    background-repeat: repeat-y;
                }
            `}</style>
        </div>
    );
};

export default SlotmachineComponent;
