import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import { togglePopUp } from '../../store/actions/nav';

import User from '../../service/User';

import './FormCreateGroupChat.scss';
import AddFriendItem from '../AddFriendItem/AddFriendItem';

const FormCreateGroupChat = ({ togglePopUp }) => {
  var formRef = useRef();
  var checkBtnRef = useRef();

  var [users, setUsers] = useState([]);
  var [groupName, setGroupName] = useState('');

  let timeout = null;
  const handleSearch = (e) => {
    e.preventDefault();
    clearTimeout(timeout);
    if (e.target.value) {
      timeout = setTimeout(() => {
        User.searchFriends(e.target.value).then(
          res => {
            setUsers(res.listUser)
          })
      }, 300)
    }
    else {
      setUsers([]);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.validateAll();
    if (checkBtnRef.current.context._errors.length == 0) {
      console.log('submit add friends')
    }
  }

  var listUsers = users.length ? (
    users.map((u, i) => <AddFriendItem friend={u} key={i} />)
  ) : (
    <div style={{
      textAlign: "center",
      color: 'gray'
    }}>
      Tìm bạn bè
    </div>
  );

  return (
    <div className="form-popup">
      <div className="form-title">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          <span>Add Group</span>
        </h4>
        <button className="close-form" onClick={(e) => togglePopUp()}><span>x</span></button>
      </div>
      <div className="form-body">
        <Form ref={formRef} onSubmit={handleSubmit} >
          <div className="form-group">
            Group name
            <Input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => { setGroupName(e.target.value) }}
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              placeholder="Search by name or email"
              onChange={handleSearch}
            />
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtnRef} />
        </Form>
        <ul className="list-user">
          {listUsers}
        </ul>
      </div>
    </div >
  )
}

function mapStateToProps(state) {
  return {}
}

function mapActionToProps(dispatch) {
  return {
    togglePopUp: (formName = '') => dispatch(togglePopUp(formName))
  }
}

export default connect(mapStateToProps, mapActionToProps)(FormCreateGroupChat);