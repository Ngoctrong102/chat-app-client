

import { createContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import Navigator from '../navigator/navigator'
import Conversation from '../conversation/conversation';
import FormPopUp from '../FormPopUp/FormPopUp';
import NotiCall from '../../components/NotiCall/NotiCall';
import { addNewMessage, changeConversation, firstMessage } from '../../store/actions/conversations'

import popupWindow from '../../helpers/popupWindow';

let SocketContext = createContext();

const ChatApp = ({ popUp, socket, addNewMessage, firstMessage, currentConversation, changeConversation }) => {
  let [isMobile, setIsMobile] = useState(document.body.offsetWidth < 824);

  let [commingCall, setCommingCall] = useState(false);
  let [callInfor, setCallInfor] = useState(null);

  const changeIsMobile = e => {
    setIsMobile(document.body.offsetWidth < 824);
  }

  const acceptCall = ({ conversationID, isVideoCall }) => {
    setCommingCall(false);
    var newWindow = popupWindow('/call', "Video call", 600, 800);
    if (newWindow) {
      newWindow.addEventListener('load', async () => {
        var ICEServer = await fetch(process.env.REACT_APP_API_URL + "getICEServer").then(res => res.json());
        newWindow.init(ICEServer);
        newWindow.answerCall(conversationID, isVideoCall)
      })
    }
  }
  const refuseCall = ({ conversationID, isVideoCall }) => {
    console.log("từ chối nghe máy")
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

    socket.on('HAVE_CALL', async ({ conversationID, isVideoCall }) => {
      setCommingCall(true);
      setCallInfor({ conversationID, isVideoCall })
      // var a = window.confirm("có cuộc gọi nè");
      // if (a) {
      //   var newWindow = popupWindow('/call', "Video call", 600, 800);
      //   if (newWindow) {
      //     newWindow.addEventListener('load', async () => {
      //       var ICEServer = await fetch(process.env.REACT_APP_API_URL + "getICEServer").then(res => res.json());
      //       newWindow.init(ICEServer);
      //       newWindow.answerCall(conversationID, isVideoCall)
      //     })
      //   }
      // }
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
        {commingCall && <NotiCall acceptCall={acceptCall} callInfor={callInfor} refuseCall={refuseCall} />}
        {popUp && <FormPopUp />}
        {renderBodyApp()}
      </div>
    </SocketContext.Provider >
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
export { SocketContext };