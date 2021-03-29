import React from 'react';

import './ChatSidebar.scss';
import ListConversation from '../../containers/ListConversation/ListConversation';

const ChatSidebar = ({ }) => {
    return (
        <div className="sidebar">
            <header>
                <span>Chats</span>
                <ul>
                    <li>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        </button>
                    </li>
                    <li>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                        </button>
                    </li>
                </ul>
            </header>
            <form action="">
                <input type="text" placeholder="Search chats" />
            </form>
            <ListConversation />
        </div>
    );
}

export default ChatSidebar;