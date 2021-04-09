import { useEffect, useRef } from "react"

const RemoteVideo = ({ stream }) => {
  var videoTag = useRef();
  useEffect(() => { videoTag.current.srcObject = stream })

  return (
    <video className="current-user" ref={videoTag} autoPlay={true}></video>
  )
}

export default RemoteVideo;