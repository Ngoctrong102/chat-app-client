import React, { useEffect, useRef } from 'react';

import MessageBox from './MessageBox/MessageBox';

import './BodyConversation.scss';


const BodyConversation = ({ conversation, user }) => {
    const bodyConversation = useRef(null);
    useEffect(() => {
        bodyConversation.current.scrollTop = bodyConversation.current.scrollHeight;
    }, [conversation])

    var MessageBoxs = conversation.messages.map((m, i) => <MessageBox message={m} key={i} user={user} />);

    return (
        <div className="body-conversation" ref={bodyConversation}>
            {MessageBoxs}
        </div>
    )
}


export default BodyConversation;