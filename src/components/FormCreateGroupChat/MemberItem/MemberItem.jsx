import './MemberItem.scss';

const MemberItem = ({ member, removeMembers }) => {
  return (
    <div className="member-item">
      <button onClick={() => removeMembers(member._id)}><span>x</span></button>
      <img className="avt" src={"http://localhost:8888/uploads/" + member.avatar} alt="" />
    </div>
  );
}


export default MemberItem;