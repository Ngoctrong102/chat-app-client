

import { createContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Navigator from '../navigator/navigator'
import Conversation from '../conversation/conversation';
import FormPopUp from '../FormPopUp/FormPopUp';
import { addNewMessage, changeConversation, firstMessage } from '../../store/actions/conversations'

let SocketContext = createContext();

const ChatApp = ({ popUp, socket, addNewMessage, firstMessage, currentConversation, changeConversation }) => {
  let [isMobile, setIsMobile] = useState(document.body.offsetWidth < 824);
  const changeIsMobile = e => {
    setIsMobile(document.body.offsetWidth < 824);
  }
  useEffect(() => {
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
      <div className="app">
        {popUp && <FormPopUp />}
        {renderBodyApp()}
      </div>
    </SocketContext.Provider>
  )
}

function mapStateToProps(state) {
  return {
    popUp: state.navState.popUp,
    currentConversation: state.userState.currentConversation
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
export { SocketContext };