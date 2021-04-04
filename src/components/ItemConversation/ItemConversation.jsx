import React from 'react';
import { connect } from 'react-redux';
import { changeConversation } from '../../store/actions/conversations';

import './ItemConversation.scss';

const ItemConversation = ({ conversation, user, changeConversation, index }) => {
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
    var users = conversation.users.filter(u => u._id != user._id);
    return (
        <li className={`item-conversation ${conversation.newMessage ? "has-message" : ''}`}
            onClick={(e) => {
                // if (e.currentTarget != e.target) return false;
                changeConversation(index)
                // e.stopPropagation();
            }}>
            <div className="avt active">
                <div className="avt-wrapper">
                    {users.map((u, i) => <img src={process.env.REACT_APP_API_URL + "uploads/" + u.avatar} key={i} />)}
                </div>
            </div>
            <div className="body-item-conversation new-mess ">
                <div>
                    <h4>{users.map(u => u.username).join(', ')}</h4>
                    <p>Tin nhắn gần nhất sẽ hiện ở đây sasasasasasasa</p>
                </div>
                <div className="item-actions">
                    <small>03:41 PM</small>
                    <div className="action-dropdown" onClick={toggleMenuAction}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        <div className="action-menu">
                            <button>Profile</button>
                            <button>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
const mapActionToProps = dispatch => {
    return {
        changeConversation: (index) => dispatch(changeConversation(index))
    };
}

export default connect(null, mapActionToProps)(ItemConversation);