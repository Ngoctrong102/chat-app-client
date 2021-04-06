

import { createContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Navigator from '../navigator/navigator'
import Conversation from '../conversation/conversation';
import FormPopUp from '../FormPopUp/FormPopUp';
import { addNewMessage, changeConversation, firstMessage } from '../../store/actions/conversations'
import Peer from 'peerjs';

let SocketContext = createContext();
let PeerContext = createContext();

const ChatApp = ({ user, popUp, socket, addNewMessage, firstMessage, currentConversation, changeConversation }) => {
  let [isMobile, setIsMobile] = useState(document.body.offsetWidth < 824);
  const changeIsMobile = e => {
    setIsMobile(document.body.offsetWidth < 824);
  }

  let peer = new Peer(user._id);

  useEffect(() => {
    peer.on('call', (call) => {
      console.log(call);
    })
    socket.on('NEW_MESSAGE', ({ conversationID, message }) => {
      // console.log(data)
      addNewMessage(conversationID, message);
    })
    socket.on('FIRST_MESSAGE', ({ oldID, conversation }) => {
      // console.log(data)
      firstMessage(oldID, conversation);
    })

    window.addEventListener('resize', changeIsMobile)

    return () => {
      socket.disconnect();
      window.removeEventListener('resize', changeIsMobile)
    }
  }, [])
  useEffect(() => {
    if (!isMobile && currentConversation == null) {
      changeConversation(0);
    }
    console.log(isMobile, 12345)
  }, [isMobile])

  const renderBodyApp = () => {
    if (isMobile) {
      if (currentConversation !== null) {
        return <Conversation isMobile={isMobile} />
      } else return <Navigator isMobile={isMobile} />
    } else {
      return (
        <>
          <Navigator isMobile={isMobile} />
          <Conversation isMobile={isMobile} />
        </>
      )
    }
  }

  return (
    <SocketContext.Provider value={socket}>
      <PeerContext.Provider value={peer}>
        <div className="app">
          {popUp && <FormPopUp />}
          {renderBodyApp()}
        </div>
      </PeerContext.Provider>
    </SocketContext.Provider>
  )
}

function mapStateToProps(state) {
  return {
    popUp: state.navState.popUp,
    currentConversation: state.userState.currentConversation,
    user: state.userState.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addNewMessage: (conversationID, message) => dispatch(addNewMessage(conversationID, message)),
    firstMessage: (oldID, conversation) => dispatch(firstMessage(oldID, conversation)),
    changeConversation: (index) => dispatch(changeConversation(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
export { SocketContext, PeerContext };