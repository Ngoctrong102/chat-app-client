import { useEffect, useMemo, useRef, useState } from 'react';
import getSocket from '../../configs/socket';
import getToken from '../../helpers/getToken';
import Peer from 'peerjs';

import './CallPopUp.scss';
import RemoteVideo from '../RemoteVideo/RemoteVideo';

const CallPopUp = () => {
  var peer;
  var socket;
  var localStream;
  let [remoteStreams, setRemoteStreams] = useState([]);
  var videoTag = useRef();
  var videoCurrentTag = useRef();


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
            setRemoteStreams(prev => {
              if (!prev.includes(remoteStream))
                return [...prev, remoteStream]
              return [...prev];
            })

            console.log('remote 1:', remoteStreams)
          })
        });
      })
      socket.on('REFUSE_CALL', (data) => {
        console.log("Từ chối cuộc gọi");
      })
      socket.on('JOIN_CALL', ({ peerID }) => {
        console.log("call 2:", peerID)
        var call = peer.call(peerID, localStream)
        call.on('stream', (remoteStream) => {
          console.log("đã bắt được", peerID)
          setRemoteStreams(prev => {
            if (!prev.includes(remoteStream))
              return [...prev, remoteStream]
            return [...prev]
          })
          console.log('remote 2:', remoteStreams)

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
  useEffect(() => {
    if (!videoCurrentTag.current.srcObject && remoteStreams[0]) {
      videoCurrentTag.current.srcObject = remoteStreams[0];
    }
  }, [remoteStreams])

  const changeCurrenStream = (stream) => {
    videoCurrentTag.current.srcObject = stream;
  }
  const renderRemoteVideo = remoteStreams.map((remoteStream, i) => <RemoteVideo stream={remoteStream} key={i} changeCurrenStream={changeCurrenStream} />)
  return (
    <div className="call-pop-up-focus">
      <div className="current-video">
        <video ref={videoCurrentTag} autoPlay={true} />
      </div>
      <div className="me">
        <video ref={videoTag} autoPlay={true} />
      </div>
      <div className="group-video">
        {renderRemoteVideo}
      </div>

    </div>
  )
}

export default CallPopUp;