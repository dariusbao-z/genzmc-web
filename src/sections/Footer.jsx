import { useLocation } from "react-router-dom";
import settings from '../settings.json'

function Footer() {
    const location = useLocation();

    var curRoute = location.pathname;

    return (
        <footer className={(curRoute === '/any' ? 'main-content-super' : 'main-content-footer') + ' text-white bg-stone-800 bottom-0 left-0 w-100 px-10 pt-6 pb-6 text-lg flex flex-row transition-all'}>
            <p className="ml-auto mr-auto lg:ml-0 lg:mr-0">&copy; Copyright by {settings.ip}.</p>
            <p className="hidden lg:block ml-auto">Website made by <a href={settings.author_site} target="_blank" rel="noreferrer">{settings.author}</a>.</p>
        </footer>
    )
}

export default Footer;