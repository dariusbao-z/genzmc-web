import { faBan, faBell, faBook, faDownload, faHome, faMoneyBills } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../img/logo.png';
import LoadingBar from 'react-top-loading-bar';

import settings from '../settings.json';

function Header() {
    const [ toggle, setToggle ] = useState('hidden');

    var location = useLocation();

    const [ curLocation, setLocation ] = useState(location.pathname);

    const [ curProgress, setProgress ] = useState(0);

    const navigate = useNavigate();

    const activeClassName = `block py-2 pl-3 pr-4 text-white bg-orange-700 rounded lg:bg-transparent lg:p-0 lg:text-orange-500 text-lg transition-all`;

    const notActiveClassName = `block py-2 pl-3 pr-4 rounded lg:p-0 lg:hover:text-orange-500 text-white hover:bg-stone-900 hover:text-white lg:hover:bg-transparent border-orange-700 text-lg transition-all`;
    
    const handleToggle = () => {
        return setToggle(toggle === 'hidden' ? '' : 'hidden');
    }

    const handlePage = (e) => {
        e.preventDefault();

        var path_target = e.target.getAttribute('to');

        if (curLocation !== path_target) {
            setLocation(e.target.getAttribute('to'));

            setProgress(20);
    
            setTimeout(function () {
                setProgress(90);
                navigate(e.target.getAttribute('to'));

                setProgress(100);
            }, 300);
        }
    }

    const handleJoin = (e) => {
        e.preventDefault();

        if (curLocation !== '/download') {
            setLocation('/download');

            setProgress(20);
    
            setTimeout(function () {
                setProgress(90);
                
                navigate('/download?join=mine24h');

                setProgress(100);
            }, 300);
        }
    }

    return (
        <header>
            <LoadingBar
                color="#f97316"
                progress={curProgress}
            />
            <nav className="bg-transparent text-white w-full absolute z-20 top-0 left-0">
                <div className="container pt-8 pb-8 px-10 md:px-18 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <Link to={location.pathname} className="flex items-center" style={{ 'opacity': 0, 'cursor': 'default', 'pointerEvents': 'none' }}>
                        <img src={logo} className="h-8 mr-3" alt="Logo" />
                    </Link>

                    <div className="flex lg:order-2">
                        <button onClick={handleJoin} type="button" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-lg px-4 py-2 text-center mr-3 lg:mr-0 bg-orange-600 hover:bg-orange-700 focus:ring-orange-800 transition-colors">
                            Tham gia
                        </button>

                        <button onClick={handleToggle} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" { ...toggle === 'hidden' ? { 'aria-expanded': false } : { 'aria-expanded': true } }>
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>

                    <div className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${toggle}`} id="navbar-sticky">
                        <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-stone-100 rounded-lg lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent border-stone-700 border-2 bg-stone-800">
                            <li className="text-center">
                                <a id="home-page" href="/" to="/" className={ curLocation === '/' ? activeClassName : notActiveClassName } aria-current="page" onClick={handlePage}><FontAwesomeIcon icon={faHome} style={{ 
                                    marginRight: '4px',
                                    pointerEvents: 'none'
                                }} /> Home</a>
                            </li>

                            <li className="text-center">
                                <a id="rule-page" href="/rules" to="/rules" className={ curLocation === '/rules' ? activeClassName : notActiveClassName } aria-current="page" onClick={handlePage}><FontAwesomeIcon icon={faBook} style={{ 
                                    marginRight: '4px',
                                    pointerEvents: 'none'
                                }} /> Nội quy</a>
                            </li>

                            <li className="text-center">
                                <a id="charge-page" href="/napthe" to="/napthe" className={ curLocation === '/napthe' ? activeClassName : notActiveClassName } aria-current="page" onClick={handlePage}><FontAwesomeIcon icon={faMoneyBills} style={{ 
                                    marginRight: '4px',
                                    pointerEvents: 'none'
                                }} /> Nạp thẻ</a>
                            </li>

                            <li className="text-center">
                                {/* <NavLink to={'/download'} className={ ({ isActive }) => isActive ? activeClassName : notActiveClassName }><FontAwesomeIcon icon={faDownload} style={{ 
                                    marginRight: '4px'
                                 }} /> Tải game</NavLink> */}

                                <a id="down-page" href="/download" to="/download" className={ curLocation === '/download' ? activeClassName : notActiveClassName } aria-current="page" onClick={handlePage}><FontAwesomeIcon icon={faDownload} style={{ 
                                    marginRight: '4px',
                                    pointerEvents: 'none'
                                }} /> Tải game</a>
                            </li>

                            <li className="text-center">
                                {/* <NavLink to={'/download'} className={ ({ isActive }) => isActive ? activeClassName : notActiveClassName }><FontAwesomeIcon icon={faDownload} style={{ 
                                    marginRight: '4px'
                                 }} /> Tải game</NavLink> */}

                                <a id="ban-page" href={settings.litebans} className={ notActiveClassName } aria-current="page"><FontAwesomeIcon icon={faBan} style={{ 
                                    marginRight: '4px',
                                    pointerEvents: 'none'
                                }} /> Vi phạm</a>
                            </li>

                            <li className="text-center">
                                {/* <NavLink to={'/download'} className={ ({ isActive }) => isActive ? activeClassName : notActiveClassName }><FontAwesomeIcon icon={faDownload} style={{ 
                                    marginRight: '4px'
                                 }} /> Tải game</NavLink> */}

                                <a id="status-page" href={settings.status} className={ notActiveClassName } aria-current="page"><FontAwesomeIcon icon={faBell} style={{ 
                                    marginRight: '4px',
                                    pointerEvents: 'none'
                                }} /> Status</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;