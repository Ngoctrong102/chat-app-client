import React from 'react';
import { connect } from 'react-redux';
import popupWindow from '../../../helpers/popupWindow';
import { changeConversation } from '../../../store/actions/conversations';
import './HeaderConversation.scss'
const HeaderConversation = ({ conversation, user, isMobile, changeConversation }) => {
    var users = conversation.users.filter(u => u._id !== user._id);
    const makeAudioCall = () => {
        console.log('gọi k video')

    }
    const makeVideoCall = async () => {
        // window.hadCall = true;
        var newWindow = popupWindow(`/call`, "Video call", 600, 800);
        // if (newWindow) newWindow.makeCall(user, conversation, true);
        if (newWindow) {
            newWindow.addEventListener('load', async () => {
                var ICEServer = await fetch(process.env.REACT_APP_API_URL + "getICEServer").then(res => res.json());
                newWindow.init(ICEServer);
                newWindow.makeCall(conversation._id, true);
            })
        }
    }
    return (
        <header className="header-conversation">
            <div className="header-user">
                {isMobile && <button className="icon back" onClick={() => changeConversation(null)}><i className="fas fa-chevron-left"></i></button>}
                <div className="avt active">
                    <div className="avt-wrapper">
                        {users.map((u, i) => <img src={process.env.REACT_APP_API_URL + "uploads/" + u.avatar} alt="" key={i} />)}
                    </div>
                </div>
                <div>
                    <h4>{users.map(u => u.username).join(', ')}</h4>
                    <small>Đang hoạt động</small>
                </div>
            </div>
            <div className="header-chat-action">
                <ul>
                    <li>
                        <button onClick={makeVideoCall}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffb822" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                        </button>
                    </li>
                    <li>
                        <button onClick={makeAudioCall}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0abb87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </button>
                    </li>
                    <li>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}
function mapDispatchToProps(dispatch) {
    return {
        changeConversation: (index) => dispatch(changeConversation(index))
    }
}
export default connect(null, mapDispatchToProps)(HeaderConversation);