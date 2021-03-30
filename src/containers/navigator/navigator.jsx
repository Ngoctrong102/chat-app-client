import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';

import './navigator.scss'

import NavFeature from '../../components/NavFeature/NavFeature';
import Sidebar from '../Sidebar/Sidebar';
import { SocketContext } from '../chatApp/ChatApp';
import { pushReqFriends } from '../../store/actions/user';

const Navigator = ({ pushReqFriends, isMobile }) => {
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on('REQ_ADD_FRIEND', (data) => {
            console.log(data.req)
            pushReqFriends(data.req)
        })
    }, [])
    return (
        <div className="navConversation">
            <NavFeature isMobile={isMobile} />
            <Sidebar />
        </div>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapActionToProps = dispatch => {
    return {
        pushReqFriends: (req) => dispatch(pushReqFriends(req))
    };
}


export default connect(mapStateToProps, mapActionToProps)(Navigator);