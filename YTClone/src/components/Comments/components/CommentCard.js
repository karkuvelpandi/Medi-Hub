import moment from "moment";
import React from "react";
import "./_commentCard.scss";
const CommentCard = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="comment p-3 d-flex ">
      <img src={authorProfileImageUrl} alt="avatar" />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default CommentCard;
