import React, { useState } from "react";
import "./_categoriesBar.scss";
import { useDispatch } from "react-redux";
// import { HOME_VIDEOS_REQUEST } from "../../redux/actionType";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art",
  "Guitar",
  "Tamil Songs",
  "Coding",
  "Cricket",
  "Football",
  "Css",
  "Coder",
  "Motivation",
  "Quantum computing",
];
const CategoriesBar = () => {
  const dispatch = useDispatch();
  const [activeElement, setActiveElement] = useState("All");

  const handleClick = (value) => {
    setActiveElement(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(value));
    }
  };

  return (
    <div className="categoriesBar">
      {keywords.map((value, index) => (
        <span
          onClick={() => handleClick(value)}
          key={index}
          className={activeElement === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
