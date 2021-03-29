import React, { useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './NavFeature.scss';

import { changeFeature, togglePopUp } from '../../store/actions/nav';
import { logout } from '../../store/actions/auth';
const NavFeature = ({ feature, changeFeature, logout, togglePopUp, user, reqFriends }) => {

    const menuUser = useRef();

    let toggleMenuUser = () => {
        menuUser.current.classList.toggle('show');
    }
    return (
        <div className="navFeature">
            <div className="logo"><svg x="0px" y="0px" width="612px" height="612px" viewBox="0 0 612 612"><g><g id="_x32__26_"><g><path d="M401.625,325.125h-191.25c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h191.25                                     c10.557,0,19.125-8.568,19.125-19.125S412.182,325.125,401.625,325.125z M439.875,210.375h-267.75                                     c-10.557,0-19.125,8.568-19.125,19.125s8.568,19.125,19.125,19.125h267.75c10.557,0,19.125-8.568,19.125-19.125                                     S450.432,210.375,439.875,210.375z M306,0C137.012,0,0,119.875,0,267.75c0,84.514,44.848,159.751,114.75,208.826V612                                     l134.047-81.339c18.552,3.061,37.638,4.839,57.203,4.839c169.008,0,306-119.875,306-267.75C612,119.875,475.008,0,306,0z                                     M306,497.25c-22.338,0-43.911-2.601-64.643-7.019l-90.041,54.123l1.205-88.701C83.5,414.133,38.25,345.513,38.25,267.75                                     c0-126.741,119.875-229.5,267.75-229.5c147.875,0,267.75,102.759,267.75,229.5S453.875,497.25,306,497.25z"></path></g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
            <ul className="list-feature">
                <li>
                    {/* feature === "Chat" ? "feature active" : "feature" */}
                    <a
                        href="Chat"
                        className={`feature ${feature === "Chat" ? "active" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            changeFeature("Chat")
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </a >
                </li>
                <li>
                    <a
                        href="Friend"
                        className={`feature ${feature === "Friend" ? "active" : ""} ${reqFriends.length ? "notify" : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            changeFeature("Friend")
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </a >
                </li>
                <li>
                    <a
                        href="Favorite"
                        className={feature === "Favorite" ? "feature active" : "feature"}
                        onClick={(e) => {
                            e.preventDefault();
                            changeFeature("Favorite")
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </a >
                </li>
                <li>
                    <a
                        href="Attach"
                        className={feature === "Attach" ? "feature active" : "feature"}
                        onClick={(e) => {
                            e.preventDefault();
                            changeFeature("Attach")
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                    </a >
                </li>
            </ul>
            <div className="user-menu">
                <ul>
                    <li>
                        <a href="Dark-Mode" className="feature">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </a >
                    </li>
                    <li>
                        <div className="dropdown" ref={menuUser}>
                            <div className="avt" onClick={toggleMenuUser}>
                                <img src={process.env.REACT_APP_API_URL + "uploads/" + user.avatar} alt="" />
                            </div>
                            <div className="dropmenu">
                                <button onClick={(e) => {
                                    toggleMenuUser();
                                    togglePopUp('PROFILE');
                                }}>Edit profile</button>
                                <button>Profile</button>
                                <button>Settings</button>
                                <hr />
                                <button onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        feature: state.navState.feature,
        user: state.userState.user,
        reqFriends: state.userState.reqFriends
    };
}

const mapDispatchToProps = dispatch => {
    return {
        changeFeature: (feature) => dispatch(changeFeature(feature)),
        logout: () => dispatch(logout()),
        togglePopUp: (formName) => dispatch(togglePopUp(formName)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavFeature);