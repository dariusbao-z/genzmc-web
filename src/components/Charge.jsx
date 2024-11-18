import React, { useEffect, useState } from "react";

import settings from '../settings.json';

import Swal from "sweetalert2";

import LoadingBar from 'react-top-loading-bar'
import number_format from "./test";

const charge = settings.charge;

function Charge() {
    const [ username, setUsername ] = useState('');
    const [ server, setServer ] = useState(0);
    const [ type, setType ] = useState(0);
    const [ amount, setAmount ] = useState(0);
    const [ serial, setSerial ] = useState('');
    const [ code, setCode ] = useState('');
    
    const [ disabled, setDisabled ] = useState('');

    const [ progress, setProgress ] = useState(0);

    const [ top, setTop ] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        setDisabled('disabled');

        // var form = new FormData(event.target);

        setProgress(20);

        fetch(charge.url + "/api/send", {
            method: 'POST',
            body: JSON.stringify({
                username,
                server,
                type,
                amount,
                serial,
                code
            }),
        }).then(resp => resp.json()).then(data => {
            if (data.status !== 1) {
                setProgress(100);

                setDisabled('');

                Swal.fire('Thông báo', data.message, 'error');
            } else {
                setProgress(70);
                
                var transid = data.extend[0].transid;

                var resultCheck = setInterval(function () {
                    fetch(charge.url + "/api/trans?trans_id=" + transid)
                        .then(resp => resp.json())
                        .then(data => {
                            switch (data.status) {
                                case "-1":
                                    setProgress(100);

                                    Swal.fire('Thông báo', data.message, 'error');

                                    clearInterval(resultCheck);

                                    break;
                                case "1":
                                    setProgress(100);

                                    Swal.fire('Thông báo', "Đã nạp thẻ thành công!", 'success');

                                    setUsername('');
                                    setServer(0);
                                    setType(0);
                                    setAmount(0);
                                    setSerial('');
                                    setCode('');

                                    setDisabled('');

                                    handleTop();

                                    clearInterval(resultCheck);

                                    break;
                                case "2":
                                    setProgress(100);

                                    Swal.fire('Thông báo', "Nạp thẻ thất bại!", 'error');

                                    setDisabled('');

                                    clearInterval(resultCheck);

                                    break;
                                case "3":
                                    setProgress(100);
    
                                    Swal.fire('Thông báo', "Vui lòng liên hệ Admin để được gửi point!", 'success');

                                    clearInterval(resultCheck);

                                    break;
                                default:
                                    break;
                            }
                        })
                }, 2000);
            }
        });
    }

    const handleTop = () => {
        fetch(charge.url + "/api/top").then(resp => resp.json()).then(data => {
            setTop(data);
        })
    }

    useEffect(() => {
        handleTop();
    }, [])

    const [ receive, setReceive  ] = useState('');

    const receiveGet = (amount) => {
        fetch(charge.url + `/api/point?amount=${amount}`)
            .then(resp => resp.json())
            .then(data => {
                setReceive(data.message);
            });
    }

    return (
        <React.Fragment>
            <LoadingBar
                color="#f97316"
                progress={progress}
            />

            <div className="main-content flex flex-row text-white text-lg flex-wrap justify-center"
                style={
                    {
                        'alignItems': 'flex-start',
                        'alignContent': 'flex-start'
                    }
                }>
                <div 
                    className="bg-stone-800 rounded-lg p-8 mt-3 i-responsive"
                >
                    <h1 style={{
                        'fontSize': '35px',
                        'lineHeight': '1.3',
                        'fontWeight': '700'
                    }} className="text-center">Nạp Thẻ</h1>

                    <form onSubmit={handleSubmit} method="POST">
                        <div className="form-group">
                            <label>Tài khoản Minecraft:</label>
                            <input type="text" name="username" placeholder="Eg: asako_chan" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Chọn máy chủ muốn nạp:</label>
                            <select name="server" value={server} onChange={(e) => setServer(e.target.value)}>
                                <option value={0} disabled>Chọn máy chủ</option>
                                <option value={1}>Slimefun</option>
                                <option value={2}>Survival</option>
                                <option value={3}>Dungeon</option>
                                <option value={4}>SkyDynamic</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Chọn loại thẻ:</label>
                            <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value={0} disabled>Chọn loại thẻ</option>
                                <option value={1}>Viettel</option>
                                <option value={2}>Vinaphone</option>
                                <option value={3}>Mobifone</option>
                                <option value={4}>Vietnamobile</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Chọn mệnh giá:</label>
                            <select name="amount" value={amount} onChange={(e) => {
                                setAmount(e.target.value);

                                receiveGet(e.target.value);
                            }}>
                                <option value={0} disabled>Chọn mệnh giá</option>
                                <option value={10000}>10.000đ</option>
                                <option value={20000}>20.000đ</option>
                                <option value={30000}>30.000đ</option>
                                <option value={50000}>50.000đ</option>
                                <option value={100000}>100.000đ</option>
                                <option value={200000}>200.000đ</option>
                                <option value={300000}>300.000đ</option>
                                <option value={500000}>500.000đ</option>
                                <option value={1000000}>1.000.000đ</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Số seri:</label>
                            <input type="text" name="serial" placeholder="Số seri của thẻ..." value={serial} onChange={(e) => setSerial(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Mã thẻ:</label>
                            <input type="text" name="code" placeholder="Mã của thẻ..." value={code} onChange={(e) => setCode(e.target.value)} />
                        </div>

                        <div className="bg-stone-700 pt-4 pb-4 px-5 rounded-lg mt-3 mb-3 text-base">
                            Khi nhấn nạp thẻ, vui lòng chờ từ vài phút để thẻ được duyệt trên hệ thống. Bạn có thể ở lại trang này để nhận thông báo khi thẻ đã nạp thành công.
                        </div>

                        <div className="bg-orange-600 pt-3 pb-3 px-5 rounded-lg mt-5 mb-1 text-base">
                            Số points bạn sẽ nhận được: {number_format(receive, 0, ',', '.')}.
                        </div>

                        <div className="form-group">
                            <button type="submit" className={`block w-100 bg-stone-600 hover:bg-stone-700 transition-colors p-2 rounded-lg focus:outline-none mt-3 ${disabled}`}>Nạp thẻ</button>
                        </div>
                    </form>
                </div>

                <div 
                    className="bg-stone-800 rounded-lg pt-6 pb-6 px-8 mt-3 i-responsive md:ml-4 md:mr-4"
                >
                    <h1 style={{
                        'fontSize': '30px',
                        'lineHeight': '1.3',
                        'fontWeight': '700'
                    }}>Top nạp thẻ</h1>

                    <div className="relative overflow-x-auto mt-6 rounded-md">
                        <table className="w-full text-base text-left overflow-x-auto">
                            <thead className="bg-neutral-600">
                                <tr>
                                    <th className="px-6 py-3 text-center whitespace-pre-line">Top</th>
                                    <th className="px-6 py-3 text-center whitespace-pre-line">Tài khoản</th>
                                    <th className="px-6 py-3 text-center whitespace-pre-line">Số tiền</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    Object.entries(top).map(([ key, val ], index) =>
                                        (
                                            <tr className="bg-neutral-700" key={index}>
                                                <td className="px-6 py-3 text-center whitespace-pre-line">{index + 1}</td>
                                                <td className="px-6 py-3 text-center whitespace-pre-line">{top[key]['username']}</td>
                                                <td className="px-6 py-3 text-center whitespace-pre-line">{number_format(top[key]['charge_amount'], 0, '.', '.')} đ</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <div className="w-100 flex justify-center p-0 md:p-10 mt-10">
                    <div 
                        className="bg-stone-800 rounded-lg pt-6 pb-6 px-8 mt-3"
                        style={{
                            'width': '100%',
                            'marginLeft': '0.5em',
                            'marginRight': '0.5em'
                        }}
                    >
                        <h1 style={{
                            'fontSize': '30px',
                            'lineHeight': '1.3',
                            'fontWeight': '700'
                        }}>Top nạp thẻ</h1>
                    </div>
                </div> */}
            </div>
        </React.Fragment>
    )
}

export default Charge;