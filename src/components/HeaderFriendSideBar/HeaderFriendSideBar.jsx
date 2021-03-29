import React from 'react';
import { connect } from 'react-redux';

import { togglePopUp } from '../../store/actions/nav';

import './HeaderFriendSideBar.scss';

const HeaderFriendSideBar = ({ togglePopUp }) => {
  return (
    <>
      <header>
        <span>Friends</span>
        <ul>
          <li>
            <button onClick={() => togglePopUp('ADD_FRIENDS')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            </button>
          </li>
        </ul>
      </header>
      <form action="">
        <input type="text" placeholder="Search friends" />
      </form>
    </>
  );
}

function mapActionToProps(dispatch) {
  return {
    togglePopUp: (formName = '') => dispatch(togglePopUp(formName))
  }
}

export default connect(null, mapActionToProps)(HeaderFriendSideBar);