import React, { useEffect, useState } from "react";
import logo from '../img/logo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudscale, faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCalendarAlt, faCodeBranch, faFighterJet, faNewspaper, faShieldAlt, faSignInAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import sf from '../img/sf.png';
import dg from '../img/dungeon.jpg';
import sv from '../img/survival.png';

import Swal from "sweetalert2";

import settings from '../settings.json';

const home = settings.home;

function Home() {
    const [ online, setOnline ] = useState(0);

    const [ max, setMax ] = useState(100);

    const getOnlineData = async () => {
        var resp = await fetch(`https://api.mcstatus.io/v2/status/java/${settings.ip}`).then((resp) => resp.json());

        if (resp.players) {
            setOnline(resp.players.online);

            setMax(resp.players.max);
        }
    }

    const joinCopy = (e) => {
        e.preventDefault();

        navigator.clipboard.writeText(settings.ip)

        Swal.fire(
            {
                title: 'Thông báo',
                icon: 'success',
                text: `Đã copy thành công IP máy chủ ${settings.server_name}!`,
                timerProgressBar: true,
                timer: 1500
            }
        )
    }

    useEffect(() => {
        getOnlineData();

        setInterval(() => getOnlineData(), settings.online_update);
    }, [])

    const d_online = home.online;

    return (
        <React.Fragment>
            <div className="wrapper"></div>

            <div className="flex flex-col-reverse justify-center items-center text-white xl:flex-row z-10 top-0 relative fscreen p-20" style={{'width': 'auto'}}>
                <div className="flex flex-col justify-center">
                    <h1 style={{ 'fontWeight': '800' }} className="sp-title text-orange-600 text-center xl:text-left">{home.name}</h1>
                    <p className="text-center xl:text-left sp-description">{home.description}</p>

                    <p className="text-center xl:text-left sp-description-2">{d_online.replace('%online%', online).replace('%max%', max)}</p>

                    <div className="flex flex-row mt-10 justify-center xl:justify-normal">
                        <a className="block bg-stone-600 rounded-lg pt-3 pb-3 px-5 text-lg justify-center items-center hover:bg-stone-700 focus:ring-4 focus:ring-stone-800 focus:outline-none transition-colors text-center" href='/join' onClick={joinCopy}>
                            <FontAwesomeIcon icon={faSignInAlt} style={{
                                'marginRight': '8px'
                            }} />

                            {home.join.text}
                        </a>

                        <a className="hidden md:block bg-stone-600 rounded-lg pt-3 pb-3 px-5 text-lg justify-center items-center hover:bg-stone-700 focus:ring-4 focus:ring-stone-800 focus:outline-none transition-colors text-center ml-2" href={home.discord} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faDiscord} />
                        </a>

                        <a className="hidden md:block bg-stone-600 rounded-lg pt-3 pb-3 px-5 text-lg justify-center items-center hover:bg-stone-700 focus:ring-4 focus:ring-stone-800 focus:outline-none transition-colors text-center ml-2" href={home.facebook} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                    </div>
                </div>
                
                <img src={logo} alt="Logo" width={'500px'} style={{ 'cursor': 'pointer' }} className="transition-all opacity-100 hover:opacity-75 hover:scale-105 mx-auto xl:ml-auto xl:mr-0 mt-20 xl:mt-0" />
            </div>

            <div className="main-content text-white frfr">
                <h1 className="text-center text-xl main-title">Về máy chủ của chúng tôi</h1>

                <div className="flex flex-wrap justify-center mt-5 mb-20">
                    <div className="card">
                        <FontAwesomeIcon icon={faCloudscale} className="icon" />

                        <h2 className="title">Mượt mà, Tối ưu</h2>

                        <p className="desc">Sức mạnh tuyệt đối trên cơ sở hạ tầng DPTCLOUD.</p>
                    </div>

                    <div className="card">
                        <FontAwesomeIcon icon={faUsers} className="icon" />

                        <h2 className="title">Staff hoạt động 24/7</h2>

                        <p className="desc">Giải đáp mọi thắc mắc của các bạn!</p>
                    </div>

                    <div className="card">
                        <FontAwesomeIcon icon={faShieldAlt} className="icon" />

                        <h2 className="title">Anti DDoS</h2>

                        <p className="desc">Cở sở hạ tầng mạnh mẽ giúp bảo vệ server khỏi các cuộc tấn công.</p>
                    </div>

                    <div className="card">
                        <FontAwesomeIcon icon={faCalendarAlt} className="icon" />

                        <h2 className="title">Có nhiều event đa dạng</h2>

                        <p className="desc">Chúng tôi có một số sự kiện cực kỳ thú vị dành cho bạn!</p>
                    </div>

                    <div className="card">
                        <FontAwesomeIcon icon={faCodeBranch} className="icon" />

                        <h2 className="title">Lối chơi đa dạng</h2>

                        <p className="desc">Có đầy đủ chế độ chơi để cho các bạn có một trải nghiệm cực thú vị!</p>
                    </div>

                    <div className="card">
                        <FontAwesomeIcon icon={faFighterJet} className="icon" />

                        <h2 className="title">Anti Cheat</h2>

                        <p className="desc">Giúp cân bằng hệ sinh thái game!</p>
                    </div>
                </div>
            </div>

            <div className="main-content text-white">
                <h1 className="text-center text-xl main-title">Các chế độ chơi</h1>

                <div className="gamemode-content">
                    <div className="gm-list" style={{ '--gamemode': 'var(--slimefun)' }}>
                        <img src={sf} alt="Slimefun" />
                    </div>

                    <div className="gm-list" style={{ '--gamemode': 'var(--dungeon)' }}>
                        <img src={dg} alt="Dungeon" />
                    </div>

                    <div className="gm-list" style={{ '--gamemode': 'var(--survival)' }}>
                        <img src={sv} alt="Survival" />
                    </div>
                </div>
            </div>

            <div className="main-content text-white">
                <h1 className="text-center text-xl main-title">Vote máy chủ</h1>

                <div className="flex justify-center mt-10 mb-20 flex-col md:flex-row">
                    {
                        home.vote.map((value, index) => {
                            return (
                                <a key={index} className="block bg-stone-600 rounded-lg pt-3 pb-3 px-5 text-lg justify-center items-center hover:bg-stone-700 focus:ring-4 focus:ring-stone-800 focus:outline-none transition-colors text-center ml-1 mr-1 mt-1 mb-1" href={value} target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={faNewspaper} style={{
                                        'marginRight': '8px'
                                    }} />

                                    Vote #{index + 1}
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;