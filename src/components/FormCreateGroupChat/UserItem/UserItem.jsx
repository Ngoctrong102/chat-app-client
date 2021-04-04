import './UserItem.scss';

const UserItem = ({ user, onChange, checked }) => {
  return (
    <li className="user-item">
      <div className="avt">
        <img src={process.env.REACT_APP_API_URL + "uploads/" + user.avatar} alt="" />
      </div>
      <div className="body">
        <div>
          <h4>{user.username}</h4>
        </div>
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(user, e.target.checked)} />
    </li>
  );
}


export default UserItem;