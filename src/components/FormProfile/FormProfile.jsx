import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import './FormProfile.scss';


import { submitProfile } from '../../store/actions/user';
import { togglePopUp } from '../../store/actions/nav';

const FormProfile = ({ submitProfile, togglePopUp, user }) => {
  var formRef = useRef();
  var checkBtnRef = useRef();

  var [fullname, setFullname] = useState(user.username);
  var [avatar, setAvatar] = useState(null);


  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.validateAll();
    if (checkBtnRef.current.context._errors.length == 0) {
      var formData = new FormData();
      formData.append('username', fullname);
      if (avatar)
        formData.append('avatar', avatar, avatar.name);
      submitProfile(formData);
    }
  }

  return (
    <div className="form-popup">
      <div className="form-title">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
          <span>Edit Profile</span>
        </h4>
        <button className="close-form" onClick={(e) => togglePopUp()}><span>x</span></button>
      </div>
      <div className="form-body">
        <Form ref={formRef} onSubmit={handleSubmit} >
          <div className="form-group">
            <Input
              type="text"
              placeholder="Fullname"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
            />
          </div>
          <div className="form-group group-avatar">
            <Input
              type="file"
              id="avatar"
              name="avatar"
              onChange={e => setAvatar(e.target.files[0])}
            />
            <div className="avatar">
              <img src={process.env.REACT_APP_API_URL + "/uploads/" + user.avatar} alt="avatar" />
            </div>
            <label htmlFor="avatar">
              <span>
                {avatar ? avatar.name : "Select avatar"}
              </span>
            </label>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtnRef} />
          <div className="form-group">
            <input type="submit" value="Save" />
          </div>
        </Form>
      </div>
    </div >
  )
}

function mapStateToProps(state) {
  return {
    user: state.userState.user
  }
}


function mapActionToProps(dispatch) {
  return {
    submitProfile: (formData) => dispatch(submitProfile(formData)),
    togglePopUp: (formName = '') => dispatch(togglePopUp(formName))
  }
}

export default connect(mapStateToProps, mapActionToProps)(FormProfile);