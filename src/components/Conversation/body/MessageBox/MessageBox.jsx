import React from 'react';

import './MessageBox.scss';

const MessageBox = ({ message, user }) => {
  return (
    <div className={message.user._id == user._id ? "message-box me" : "message-box"} >
      <div className="avt">
        <img src={"http://localhost:8888/uploads/" + message.user.avatar} alt="" />
      </div>
      <div className="message-content">
        {message.content}
      </div>
      <div className="time">
        <small>Thứ 5 tháng 12, 19:20</small>
      </div>
    </div >
  )
}


export default MessageBox;