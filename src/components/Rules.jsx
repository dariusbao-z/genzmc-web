import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import settings from '../settings.json'

const rule = settings.rules;

function Rules() {
    return (
        <React.Fragment>
            <div className="main-content flex flex-row justify-center flex-wrap text-white text-lg"
                style={
                    {
                        'alignItems': 'flex-start',
                        'alignContent': 'flex-start'
                    }
                }>
                <div 
                    className="bg-stone-800 rounded-lg p-8 mt-3"
                    style={{
                        'width': '400px',
                        'marginLeft': '0.5em',
                        'marginRight': '0.5em'
                    }}
                >
                    <h1 style={{
                        'fontSize': '20px',
                        'lineHeight': '1.3',
                        'fontWeight': '700'
                    }}>Thông tin</h1>

                    <ul style={{
                        'listStyle': 'inside',
                        'fontSize': '17px'
                    }} className="mt-3">
                        <li><strong>Tên:</strong> {rule.info.name}</li>
                        <li><strong>Ngày ban hành:</strong> {rule.info.date}</li>
                        <li><strong>Người ban hành:</strong> {rule.info.author}</li>
                    </ul>
                </div>
                <div 
                    className="bg-stone-800 rounded-lg p-8 mt-3"
                    style={{
                        'width': '800px',
                        'marginLeft': '0.5em',
                        'marginRight': '0.5em'
                    }}
                >
                    <h1 style={{
                        'fontSize': '30px',
                        'lineHeight': '1.3',
                        'fontWeight': '700'
                    }}><FontAwesomeIcon icon={faBook} className="mr-2" /> Nội quy máy chủ</h1>

                    <div className="mt-3">
                        {
                            rule.content.map((value, index) => {
                                return (
                                    <p key={index} style={{
                                        'lineHeight': '1.4'
                                    }} className="mt-3">
                                        <strong>{index + 1}. {value.name}:</strong> {value.description}
                                    </p>
                                )
                            })
                        }

                        <br />

                        <p>
                            <strong>Nhớ chấp hành luật khi tham gia {settings.server_name} nhé!</strong>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Rules;