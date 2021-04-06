import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../../containers/chatApp/ChatApp';

import './ItemReqFriend.scss';

const ItemReqFriend = ({ reqFriend, user }) => {
  const socket = useContext(SocketContext);
  const acceptReqFriend = () => {
    socket.emit('ACCEPT_REQ_FRIEND', { from: user._id, to: reqFriend._id })
  }
  return (
    <li className="item-add-friend">
      <div className="avt">
        <img src={process.env.REACT_APP_API_URL + "/uploads/" + reqFriend.avatar} alt="" />
      </div>
      <div className="body">
        <div>
          <h4>{reqFriend.username}</h4>
        </div>
      </div>
      <button className="accept" onClick={() => acceptReqFriend()}>
        <i className="fas fa-check"></i>
      </button>
      <button className="refuse">
        <i className="fas fa-times"></i>
      </button>
    </li>
  )
}

const mapStateToProps = state => {
  return {
    user: state.userState.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemReqFriend);