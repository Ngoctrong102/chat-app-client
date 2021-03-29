import { useRef } from 'react';
import { connect } from 'react-redux';

import FormProfile from '../../components/FormProfile/FormProfile';
import FormAddFriends from '../../components/FormAddFriends/FormAddFriends';
import FormCreateGroupChat from '../../components/FormCreateGroupChat/FormCreateGroupChat';

import { togglePopUp } from '../../store/actions/nav';

import './FormPopUp.scss';

const FormPopUp = ({ togglePopUp, popUp }) => {
  var formWrapper = useRef();

  const handleClick = (e) => {
    if (e.target === formWrapper.current) {
      togglePopUp();
    }
  }

  const renderForm = () => {
    switch (popUp) {
      case 'PROFILE': {
        return (
          <FormProfile />
        )
      }
      case 'ADD_FRIENDS': {
        return (
          <FormAddFriends />
        )
      }
      case 'CREATE_GROUP_CHAT': {
        return <FormCreateGroupChat />
      }
    }
  }

  return (
    <div className="form-wrapper" onClick={handleClick} ref={formWrapper}>
      {
        renderForm()
      }

    </div >
  )
}

function mapStateToProps(state) {
  return {
    popUp: state.navState.popUp
  }
}


function mapActionToProps(dispatch) {
  return {
    togglePopUp: (formName = '') => dispatch(togglePopUp(formName))
  }
}

export default connect(mapStateToProps, mapActionToProps)(FormPopUp);