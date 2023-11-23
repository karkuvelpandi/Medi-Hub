import React, { useState } from "react";
import "./_sidebar.scss";

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from "react-icons/md";
import { logout } from "../../redux/actions/auth.action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = ({ toggleSidebar, toggleSidebarHandler }) => {
  const [activeNav, setActiveNav] = useState("/");
  const dispatch = useDispatch();
  //
  const logoutHandler = () => {
    dispatch(logout());
  };
  //
  return (
    <nav
      className={toggleSidebar ? "sidebar open" : "sidebar"}
      onClick={() => toggleSidebarHandler(false)}
    >
      <ul>
        <Link to="/">
          <li
            className={activeNav === "/" && "active"}
            onClick={() => setActiveNav("/")}
          >
            <MdHome size={23} />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/feed/subscriptions">
          <li
            className={activeNav === "/feed/subscriptions" && "active"}
            onClick={() => setActiveNav("/feed/subscriptions")}
          >
            <MdSubscriptions size={23} />
            <span>Subscriptions</span>
          </li>
        </Link>
        <Link to="/feed/likedVideos">
          <li
            className={activeNav === "/feed/likedVideos" && "active"}
            onClick={() => setActiveNav("/feed/likedVideos")}
          >
            <MdThumbUp size={23} />
            <span>Liked Videos</span>
          </li>
        </Link>
        <Link to="/">
          <li onClick={() => setActiveNav("/")}>
            <MdHistory size={23} />
            <span>History</span>
          </li>
        </Link>
        <Link to="/">
          <li onClick={() => setActiveNav("/")}>
            <MdLibraryBooks size={23} />
            <span>Library</span>
          </li>
        </Link>
        <li onClick={() => setActiveNav("/")}>
          <MdSentimentDissatisfied size={23} />
          <span>I don't Know</span>
        </li>
        <hr />
        <li onClick={logoutHandler}>
          <MdExitToApp size={23} />
          <span>Log Out</span>
        </li>
        <hr />
      </ul>
    </nav>
  );
};

export default Sidebar;
