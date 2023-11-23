import React, { useEffect, useState } from "react";
import "./_comments.scss";
import CommentCard from "./components/CommentCard";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";

const Comments = ({ videoId, totalComments }) => {
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentList.comments);
  const user = useSelector((state) => state.auth?.user);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text));
    setText("");
  };

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId]);
  return (
    <div className="comments">
      <p>{totalComments} comments</p>
      <div className="comments__form d-flex w-100 my-2">
        <img src={user.photoURL} alt="avatar" />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            value={text}
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="border-0 p-2">
            Comment
          </button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, index) => (
          <CommentCard comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
