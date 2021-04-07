

import { createContext, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import Navigator from '../navigator/navigator'
import Conversation from '../conversation/conversation';
import FormPopUp from '../FormPopUp/FormPopUp';
import { addNewMessage, changeConversation, firstMessage } from '../../store/actions/conversations'

import popupWindow from '../../helpers/popupWindow';

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
    socket.on('HAVE_CALL', async ({ conversationID, peerID, isVideoCall }) => {
      // var a = window.confirm("có cuộc gọi nè");
      // if (a) {
      //   var stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      //   vL.current.srcObject = stream;
      //   var peer = new Peer({
      //     host: process.env.REACT_APP_PEER_SERVER_HOST,
      //     debug: 1,
      //     path: '/',
      //     port: 9000
      //   });
      //   peer.on('open', (id) => {
      //     var call = peer.call(peerID, stream);

      //     call.on('stream', (streamRemote) => {
      //       console.log("streamRemote");
      //       v.current.srcObject = streamRemote;
      //       // v.current.play();
      //       console.log(streamRemote);
      //       var playPromise = v.current.play();

      //       // if (playPromise !== undefined) {
      //       //   playPromise
      //       //     .then(_ => {
      //       //       // Automatic playback started!
      //       //       // Show playing UI.
      //       //       console.log("audio played auto");
      //       //     })
      //       //     .catch(error => {
      //       //       // Auto-play was prevented
      //       //       // Show paused UI.
      //       //       console.log("playback prevented");
      //       //     });
      //       // }
      //     })
      //   })
      // }
      var a = window.confirm("có cuộc gọi nè");
      if (a) {
        var newWindow = popupWindow('/call', "Video call", 600, 800);
        if (newWindow) {
          newWindow.addEventListener('load', () => {
            newWindow.answerCall(conversationID, isVideoCall)
          })
        }
      }
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