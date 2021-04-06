import { useContext } from 'react';
import { connect } from 'react-redux';
import { SocketContext } from '../../containers/chatApp/ChatApp';
import './AddFriendItem.scss';

const AddFriendItem = ({ user, friend }) => {
  var socket = useContext(SocketContext);
  const requestAddFriend = (e) => {
    socket.emit('REQ_ADD_FRIEND', { from: user, to: friend._id });
  }
  return (
    <li className="item-req-friend">
      <div className="avt">
        <img src={process.env.REACT_APP_API_URL + "uploads/" + friend.avatar} alt="" />
      </div>
      <div className="body">
        <div>
          <h4>{friend.username}</h4>
        </div>
      </div>
      <button onClick={requestAddFriend}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
      </button>
    </li>
  )
}
function mapStateToProps(state) {
  return {
    user: state.userState.user
  }
}

function mapActionToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapActionToProps)(AddFriendItem);