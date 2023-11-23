import React, { useState } from "react";
import "./_header.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdMic } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { MdNotifications, MdApps } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import YTlogoSvg from "../../yt-ui/YTLogo/YT.svg";

const Header = ({ toggleSidebarHandler }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const user = useSelector((state) => state.auth?.user);

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword !== "") navigate(`/search/${keyword}`);
  };
  return (
    <div className="header">
      <section className="header__left">
        <RxHamburgerMenu
          className="header__left__menu"
          size={26}
          onClick={toggleSidebarHandler}
        />
        <img
          className="header__left__logo"
          alt="youtube_logo"
          src={YTlogoSvg}
          onClick={() => navigate("/")}
        />
        <span className="country-logo">IN</span>
      </section>
      <section className="header__searchBar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit">
            <AiOutlineSearch size={22} />
          </button>
        </form>
        <IoMdMic className="header__searchBar__mic" size={26} />
      </section>
      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user?.photoURL} alt="avatar" />
      </div>
    </div>
  );
};

export default Header;
