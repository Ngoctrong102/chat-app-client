import { useEffect, useRef, useState } from 'react';
import getSocket from '../../configs/socket';
import getToken from '../../helpers/getToken';
import Peer from 'peerjs';

import './CallPopUp.scss';
import RemoteVideo from '../RemoteVideo/RemoteVideo';

const CallPopUp = () => {
  var [noti, setNoti] = useState('');
  var peer;
  var socket;
  var localStream;
  let [remoteStreams, setRemoteStreams] = useState([]);
  var videoTag = useRef();

  useEffect(async () => {
    socket = getSocket(getToken());
    window.init = (ICEServer) => {
      peer = new Peer({
        host: "peer-server-ngoctrong102.herokuapp.com",
        debug: 1,
        path: '/',
        port: 443,
        secure: true,
        // config: {
        //   'iceServers': ICEServer
        // }
      });
      peer.on('open', async (id) => {
        console.log("open 1:", id)
        peer.on('call', function (call) {
          console.log("call 1:");
          call.answer(localStream);
          call.on('stream', (remoteStream) => {
            if (!remoteStreams.includes(remoteStream)) {
              // setRemoteStreams([...remoteStreams, remoteStream])
              setRemoteStreams(prev => { return [...prev, remoteStream] })
              console.log('remote 1:', remoteStreams)
            }
          })
        });
      })
      socket.on('REFUSE_CALL', (data) => {
        setNoti(data)
      })
      socket.on('JOIN_CALL', ({ peerID }) => {
        console.log("call 2:", peerID)
        var call = peer.call(peerID, localStream)
        call.on('stream', (remoteStream) => {
          console.log("đã bắt được", peerID)
          if (!remoteStreams.includes(remoteStream)) {
            setRemoteStreams(prev => { return [...prev, remoteStream] })
            console.log('remote 2:', remoteStreams)
          }
        })
      })
    }
    window.makeCall = async (conversationID, isVideoCall) => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: isVideoCall, audio: true });
      videoTag.current.srcObject = localStream;
      videoTag.current.volume = 0;
      console.log(localStream);
      socket.emit("MAKE_CALL", {
        conversationID,
        isVideoCall
      });
    }

    window.answerCall = async (conversationID, isVideoCall) => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: isVideoCall, audio: true });
      videoTag.current.srcObject = localStream;
      videoTag.current.volume = 0;
      if (peer.id) {
        console.log("answer call, my peer id: ", peer.id)
        socket.emit("JOIN_CALL", { conversationID, peerID: peer.id });
      } else {
        peer.on('open', async (id) => {
          console.log("open 2:", id)
          console.log("answer call, my peer id: ", id)
          socket.emit("JOIN_CALL", { conversationID, peerID: id });
        })
      }
    }



  }, [])

  const renderRemoteVideo = remoteStreams.map((remoteStream, i) => <RemoteVideo stream={remoteStream} key={i} />)
  return (
    <div className="call-pop-up">
      <video className="me" ref={videoTag} autoPlay={true} />
      {renderRemoteVideo}
      <div>
        {noti}
      </div>
    </div>
  )
}

export default CallPopUp;