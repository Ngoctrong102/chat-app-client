import './MemberItem.scss';

const MemberItem = ({ member, removeMembers }) => {
  return (
    <div className="member-item">
      <button type="button" onClick={() => removeMembers(member._id)}><span>x</span></button>
      <img className="avt" src={process.env.REACT_APP_API_URL + "uploads/" + member.avatar} alt="" />
    </div>
  );
}


export default MemberItem;