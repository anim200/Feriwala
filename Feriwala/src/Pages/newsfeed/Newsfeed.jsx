import React, { useState } from "react";
import Feed from "../../Components/feed/feed";
import Sidebar from "../../Components/sidebarfeed/sidebar";
import Navbar from "../../Components/Navbar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import ChatList from "../ChatList/ChatList";
import "./newsfeed.css";

const Newsfeed = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className={`homecontainer ${isChatOpen ? "blurry" : ""}`}>
        <Sidebar onChatClick={handleChatClick} />
        <Feed />
        <Rightbar />
      </div>
      {isChatOpen && <ChatList onClose={handleCloseChat} />}
    </>
  );
};

export default Newsfeed;
