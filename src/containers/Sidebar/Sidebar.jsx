import React from 'react';

import './Sidebar.scss';
import ListConversation from '../../components/BodyChatSideBar/BodyChatSideBar';
import { connect } from 'react-redux';
import HeaderChatSidebar from '../../components/HeaderChatSideBar/HeaderChatSideBar';
import HeaderFriendSideBar from '../../components/HeaderFriendSideBar/HeaderFriendSideBar';
import BodyFriendSideBar from '../../components/BodyFriendSideBar/BodyFriendSideBar';
import BodyChatSideBar from '../../components/BodyChatSideBar/BodyChatSideBar';

const Sidebar = ({ feature }) => {

    var renderHeader = () => {
        switch (feature) {
            case "Chat": {
                return (
                    <HeaderChatSidebar />
                )
            }
            case "Friend": {
                return (
                    <HeaderFriendSideBar />
                )
            }
            default:
                break;
        }
    }

    var renderBody = () => {
        switch (feature) {
            case "Chat": {
                return (
                    <BodyChatSideBar />
                )
            }
            case "Friend": {
                return (
                    <BodyFriendSideBar />
                )
            }
            default:
                break;
        }
    }

    return (
        <div className="sidebar">
            {renderHeader()}
            {renderBody()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        feature: state.navState.feature,
        reqFriends: state.userState.reqFriends,
        conversations: state.userState.conversations,
    };
}

const mapDispatchToProps = dispatch => {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);