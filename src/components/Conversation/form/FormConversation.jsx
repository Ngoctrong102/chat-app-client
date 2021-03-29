import React, { useContext, useRef, useState } from 'react';
import { SocketContext } from '../../../containers/chatApp/ChatApp';
import Picker from 'emoji-picker-react';

import './FormConversation.scss';

const FormConversation = ({ conversation, user }) => {
    var socket = useContext(SocketContext);
    var [message, setMessage] = useState('');
    var picker = useRef();
    const sendMesss = (e) => {
        e.preventDefault();
        if (message !== '') {
            socket.emit('SEND_MESSAGE', {
                conversationID: conversation._id,
                message: {
                    user: user,
                    content: message,
                    time: new Date()
                }
            })
            picker.current.classList.add('hidden');
            setMessage('');
        }
    }

    const sendFisrtMess = (e) => {
        e.preventDefault();
        if (message != '') {
            socket.emit('FIRST_MESSAGE', {
                conversationID: conversation._id,
                users: conversation.users,
                message: {
                    user: user,
                    content: message,
                    time: new Date()
                }
            });
            picker.current.classList.add('hidden');
            setMessage('');
        }
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji)
    };

    const togglePicker = (e) => {
        picker.current.classList.toggle('hidden');
    }
    return (
        <div className="form-conversation">

            <form onSubmit={conversation._id.includes("NOT_EXIST") ? sendFisrtMess : sendMesss}>
                <div className="icon-wrapper">
                    <button className="icon" type="button" onClick={togglePicker}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                    </button>
                    <div className="icon-picker hidden" ref={picker} >
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
                </div>
                <input
                    className="mess-content"
                    type="text"
                    value={message}
                    placeholder="Nhập tin nhắn ..."
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="enclose" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                <button className="submit" type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button>

            </form>
        </div>
    )
}

export default FormConversation;