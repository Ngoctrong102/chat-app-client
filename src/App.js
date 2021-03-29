import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
// component
import LoginPage from './containers/auth/LoginPage/LoginPage';
import SignUpPage from './containers/auth/SignUp/SignUpPage';
//actions
import { fetchUserInfor } from './store/actions/auth';
// helpers
import getToken from './helpers/getToken';
import getSocket from './configs/socket';
import ChatApp from './containers/chatApp/ChatApp';


function App({ user, fetchUserInfor }) {
  useEffect(() => {
    if (!user) {
      const token = getToken();
      if (token)
        fetchUserInfor(token);
    }
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ?
            <ChatApp socket={getSocket(getToken())} user={user} />
            :
            <Redirect to="/login" />
          }
        </Route>
        <Route path="/login">
          {user ?
            <Redirect to="/" />
            :
            <LoginPage />
          }
        </Route>
        <Route path="/signup">
          {user ?
            <Redirect to="/" />
            :
            <SignUpPage />
          }
        </Route>
      </Switch>
    </Router >
  );
}

function mapStateToProps(state) {
  return {
    user: state.userState.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchUserInfor: (token) => dispatch(fetchUserInfor(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
