import React from 'react';
import './Message.css';
import {format} from 'timeago.js';


const Message = ({message,own}) => {
    // console.log(message);
    // console.log(own)
    return (
        <div className={own ? "message own" :"message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                />
            <p className="messageText">
               {message.text}
            </p>
            </div>
            <div className="messageBottom">
                {format(message.createdAt)}
            </div>
        </div>

    )
}

export default Message;
