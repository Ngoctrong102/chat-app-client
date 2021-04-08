import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSocket from '../../configs/socket';
import getToken from '../../helpers/getToken';
import Peer from 'peerjs';

const CallPopUp = () => {
  var [noti, setNoti] = useState('');
  var peer;
  var socket;
  var localStream;
  var remoteStreams = [];
  var videoTag = useRef();
  var videoTagRemote = useRef();

  useEffect(async () => {
    window.init = (ICEServer) => {
      peer = new Peer({
        host: "peer-server-ngoctrong102.herokuapp.com",
        debug: 1,
        path: '/',
        port: 443,
        secure: true,
        config: {
          'iceServers': ICEServer
        }
      });
      peer.on('open', async (id) => {
        console.log("open 1:", id)
        peer.on('call', function (call) {
          call.answer(localStream);
          call.on('stream', (remoteStream) => {
            console.log('remote:', remoteStream)
            videoTagRemote.current.srcObject = remoteStream;
            remoteStreams.push(remoteStream);
          })
        });
      })
      socket = getSocket(getToken());
      socket.on('REFUSE_CALL', (data) => {
        setNoti(data)
      })
      socket.on('JOIN_CALL', ({ peerID }) => {
        console.log("đã bắt được", peerID)
        var call = peer.call(peerID, localStream)
        call.on('stream', (remoteStream) => {
          videoTagRemote.current.srcObject = remoteStream;
          console.log('remote:', remoteStream)
          remoteStreams.push(remoteStream);
        })
      })
    }
    window.makeCall = async (conversationID, isVideoCall) => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: isVideoCall, audio: false });
      videoTag.current.srcObject = localStream;
      console.log(localStream);
      socket.emit("MAKE_CALL", {
        conversationID,
        isVideoCall
      });
    }

    window.answerCall = async (conversationID, isVideoCall) => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: isVideoCall, audio: false });
      videoTag.current.srcObject = localStream;
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
  return (
    <div>
      <video ref={videoTag} autoPlay={true} />
      <video ref={videoTagRemote} autoPlay={true} />
      <div>
        {noti}
      </div>
    </div>
  )
}

export default CallPopUp;