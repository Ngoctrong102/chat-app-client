import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './conversation.scss'

import HeaderConversation from '../../components/Conversation/header/HeaderConversation';
import BodyConversation from '../../components/Conversation/body/BodyConversation';
import FormConversation from '../../components/Conversation/form/FormConversation';
const Conversation = ({ conversation, user, isMobile }) => {
    if (conversation)
        return (
            <div className="conversation">
                <HeaderConversation conversation={conversation} user={user} isMobile={isMobile} />
                <BodyConversation conversation={conversation} user={user} />
                <FormConversation conversation={conversation} user={user} />
            </div>
        )
    else
        return (
            <div className="conversation alt">
                <img src="/none_conversation.svg" className="alt-image" alt="" />
                <p>Tạo một cuộc trò chuyện mới</p>
            </div>
        )
}


const mapStateToProps = state => {
    return {
        conversation: state.userState.conversations[state.userState.currentConversation],
        user: state.userState.user
    };
}

const mapActionToProps = dispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapActionToProps)(Conversation);
