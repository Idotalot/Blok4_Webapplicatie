// components/navbarComponent.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRulerVertical, faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
    return (
        <div className="w-screen h-32 flex flex-row lg:w-32 lg:h-screen lg:flex-col" style={{ backgroundColor: "#060c1c" }}>
            <img src="/images/AASA_Black_Background.png" className='max-w-32 max-h-32 flex-1' alt="Logo" />
            <div id="link-container" className="flex flex-row ml-auto mr-4 items-center lg:flex-col lg:mt-10 lg:m-0">
                <div className="lg:pb-4">
                    <Link to="/dashboard">
                        <button id='dashboardNav' className="flex flex-row h-16 w-16 text-center items-center justify-center p-4 rounded-full hover:bg-opacity-20 hover:bg-white">
                            <FontAwesomeIcon icon={faHouse} className="text-3xl text-white" />
                        </button>
                    </Link>
                </div>
                <div className="lg:pb-4">
                    <Link to="/metingen">
                        <button id='metingenNav' className="flex flex-row h-16 w-16 text-center items-center justify-center p-4 rounded-full hover:bg-opacity-20 hover:bg-white">
                            <FontAwesomeIcon icon={faRulerVertical} className="text-3xl text-white" />
                        </button>
                    </Link>
                </div>
                <div className="lg:pb-4">
                    <Link to="/logs">
                        <button id='logsNav' className="flex flex-row h-16 w-16 text-center items-center justify-center p-4 rounded-full hover:bg-opacity-20 hover:bg-white">
                            <FontAwesomeIcon icon={faBook} className="text-3xl text-white" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavbarComponent;