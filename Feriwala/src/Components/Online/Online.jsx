
import "./online.css";


export default function Online({user}) {
  return (
    
    <li className="rightBarFriend">
    <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={user.profilePicture}/>
        <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUsername">{user.username}</span>
    
    

    

  </li>
    
  )
}
