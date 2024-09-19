import "./sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import CategoryIcon from "@mui/icons-material/Category";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function Sidebar({ onChatClick }) {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <Link to="/profile" className="sidebarLink">
            <li className="sidebarListItem">
              <PersonIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </li>
          </Link>
          <Link to="/productList" className="sidebarLink">
            <li className="sidebarListItem">
              <CategoryIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Category</span>
            </li>
          </Link>
          <li className="sidebarListItem" onClick={onChatClick}>
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <Link to="/detail" className="sidebarLink">
            <li className="sidebarListItem">
              <CloudUploadIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Upload Product</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
