import './NotiCall.scss';
const NotiCall = ({ acceptCall, callInfor, refuseCall }) => {
  return (
    <div className="noti-call">
      <p>Có cuộc gọi đến</p>
      <div className="btns">
        <button className="refuse" onClick={() => refuseCall(callInfor)}>
          <i className="fas fa-phone-slash"></i>
        </button>
        <button className="accept" onClick={() => acceptCall(callInfor)}>
          <i className="fas fa-video"></i>
        </button>

      </div>
    </div>
  )
}

export default NotiCall;