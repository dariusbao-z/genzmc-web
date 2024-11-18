import { faDownload, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import launcherImage from '../img/launcher.png'
import { useSearchParams } from "react-router-dom";

import Swal from "sweetalert2";

import settings from '../settings.json';

function Download() {
    const [ searchParams, setSearchParams ] = useSearchParams();

    if (searchParams.get('join') === 'mine24h') {
        searchParams.delete('join');

        setSearchParams(searchParams);

        setTimeout(function () {
            document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
        }, 500);
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

    return (
        <React.Fragment>
            <div className="main-content flex flex-row text-white text-lg flex-wrap justify-center">
                <div 
                    className="bg-stone-800 rounded-lg p-8"
                    style={{
                        'width': '800px'
                    }}
                >
                    <h1 style={{
                        'fontSize': '30px',
                        'lineHeight': '1.3',
                        'fontWeight': '700'
                    }}><FontAwesomeIcon icon={faDownload} className="mr-2" /> Tải game Minecraft</h1>

                    <div className="mt-5">
                        <p style={{
                            'lineHeight': '1.4',
                            'fontSize': '22px'
                        }}>
                            <strong>Legacy Launcher (Khuyến nghị nếu sử dụng crack):</strong>
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            Là một launcher gọn nhẹ, giao diện thân thiện và dễ sử dụng.
                            Hỗ trợ tài khoản crack và cả Premium. Ngoài ra, nó còn hỗ trợ
                            bạn trong việc cài đặt các bản mod phổ biến như Optifine hay Forge
                            ngay trong launcher mà không cần phải tải về trên website khác.
                        </p>

                        <img src={launcherImage} width={'100%'} className="mt-4 rounded cursor-pointer" alt="Legacy Launcher" />

                        <div className="bg-stone-700 pt-4 pb-4 px-5 rounded-lg mt-5 text-base">
                            <strong>Lưu ý:</strong> Bạn không nên tải bản TLauncher trên tlauncher.org!
                        </div>

                        <div className="mt-6 mb-10">
                            <a href="https://llaun.ch/installer" className="bg-stone-600 hover:bg-stone-700 transition-colors px-4 py-2 rounded-lg" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faDownload} className="mr-2" /> Tải về Legacy Launcher</a>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p style={{
                            'lineHeight': '1.4',
                            'fontSize': '22px'
                        }}>
                            <strong>Custom Client:</strong>
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            Bạn cũng có thể sử dụng các client 
                            như <a href="https://www.lunarclient.com/" target="_blank" rel="noreferrer" className="text-orange-700 hover:text-orange-800 hover:underline">Lunar Client</a> hoặc <a href="https://client.badlion.net/" target="_blank" rel="noreferrer" className="text-orange-700 hover:text-orange-800 hover:underline">Badlion Client</a> nếu bạn có tài khoản đã mua Minecraft.
                        </p>
                    </div>

                    <div className="mt-5" id="join">
                        <h1 style={{
                            'fontSize': '30px',
                            'lineHeight': '1.3',
                            'fontWeight': '700'
                        }}><FontAwesomeIcon icon={faSignInAlt} className="mr-2" /> Cách vào server Mine24h</h1>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Bước 1:</strong> Khởi chạy phiên bản Minecraft từ <strong>1.16.5 - 1.20.1</strong>.<br />
                            Bạn có thể chọn một phiên bản mod bất kỳ nhưng đừng sử dụng hack. Đọc qua nội quy.
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Bước 2:</strong> Vào phần Chơi mạng (Multiplayer).
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Bước 3:</strong> Nhấn vào nút Thêm máy chủ (Add Server).
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Bước 4:</strong> Nhập IP <strong className="cursor-pointer" onClick={joinCopy}>mine24h.com</strong> vào ô Địa chỉ IP (Server Address).
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Bước 5:</strong> Nhấn vào nút Done (Xong).
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Bước 6:</strong> Nhấn 2 lần vào server vừa thêm để tham gia.
                        </p>

                        <p style={{
                            'lineHeight': '1.4',
                            'fontSize': '22px'
                        }} className="mt-3">
                            <strong>Cách đăng ký / đăng nhập vào server:</strong>
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>- Đăng ký:</strong> Nhập lệnh <strong>/register [mật khẩu] [nhập lại mật khẩu]</strong>.
                        </p>

                        <p className="mt-2" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>- Đăng nhập:</strong> Nhập lệnh <strong>/login [mật khẩu]</strong>.
                        </p>

                        <p className="mt-4" style={{
                            'lineHeight': '1.4'
                        }}>
                            <strong>Vậy là xong phần hướng dẫn rồi nhé, chúc các bạn chơi vui vẻ!</strong>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Download;