import React from 'react';

import './BodyChatSideBar.scss';

import ItemConversation from '../ItemConversation/ItemConversation';
import { connect } from 'react-redux';
const BodyChatSideBar = ({ conversations, user }) => {
    const itemsConversation = conversations.map((conversation, index) => {
        return <ItemConversation conversation={conversation} user={user} key={index} index={index} />
    })
    return (
        <div className="sidebar-body">
            <ul>
                {itemsConversation}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        conversations: state.userState.conversations,
        user: state.userState.user
    };
}

const mapActionToProps = dispatch => {
    return {
    };
}

export default connect(mapStateToProps, mapActionToProps)(BodyChatSideBar);