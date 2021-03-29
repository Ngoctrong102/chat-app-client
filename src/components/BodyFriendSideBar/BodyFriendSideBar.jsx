import React, { useContext, useEffect } from 'react';

import './BodyFriendSideBar.scss';

import { connect } from 'react-redux';
import ItemReqFriend from '../ItemReqFriend/ItemReqFriend';
import ItemFriend from '../ItemFriend/ItemFriend';
import { SocketContext } from '../../containers/chatApp/ChatApp';
import { addNewFriend } from '../../store/actions/user';

const BodyFriendSideBar = ({ reqFriends, friends, addNewFriend }) => {

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('ACCEPT_REQ_FRIEND', (data) => {
      addNewFriend(data.friend);
    })
  }, [])

  const itemsReqFriends = reqFriends.map((req, index) => {
    return <ItemReqFriend reqFriend={req} key={index} />
  })

  const itemsFriends = friends.map((friend, index) => {
    return <ItemFriend friend={friend} key={index} />
  })

  var toggleList = (e) => {
    e.currentTarget.nextElementSibling.classList.toggle('hidden')
  }
  return (
    <div className="friend-sidebar-body">
      <div className={`header ${reqFriends.length ? "notify" : ""}`} onClick={toggleList}>
        <h4>Request Friend</h4>
      </div>
      <ul className="req-friend-list">
        {itemsReqFriends}
      </ul>
      <div className="header">
        <h4>Your Friend</h4>
      </div>
      <ul className="your-friend-list">
        {itemsFriends}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    reqFriends: state.userState.reqFriends,
    friends: state.userState.friends
  };
}

const mapActionToProps = dispatch => {
  return {
    addNewFriend: (friend) => dispatch(addNewFriend(friend))
  };
}

export default connect(mapStateToProps, mapActionToProps)(BodyFriendSideBar);