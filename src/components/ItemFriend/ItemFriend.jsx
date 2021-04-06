import React from 'react';
import { connect } from 'react-redux';

import { openConversation } from '../../store/actions/conversations';

import './ItemFriend.scss';

const ItemReqFriend = ({ friend, user, openConversation }) => {
  const toggleMenuAction = (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('show')) {
      e.currentTarget.classList.remove('show');
    }
    else {
      var show = document.querySelector('.action-dropdown.show');
      if (show) show.classList.remove('show');
      e.currentTarget.classList.add('show');
    }
  }

  const handleChat = async (e) => {
    openConversation([user._id, friend._id]);
  }
  return (
    <li className="item-friend">
      <div className="avt">
        <img src={process.env.REACT_APP_API_URL + "/uploads/" + friend.avatar} alt="" />
      </div>
      <div className="body">
        <div>
          <h4>{friend.username}</h4>
        </div>
      </div>
      <div className="item-actions">
        <div className="action-dropdown" onClick={toggleMenuAction}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          <div className="action-menu">
            <button
              style={{
                borderBottom: "1px solid #d2d2d2ad"
              }}
              onClick={handleChat}
            >
              Chat
            </button>
            <button>Profile</button>
            <button>Delete</button>
          </div>
        </div>
      </div>
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
    openConversation: (users) => dispatch(openConversation(users))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemReqFriend);