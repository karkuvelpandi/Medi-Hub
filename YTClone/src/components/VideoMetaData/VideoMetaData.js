import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import "./_videoMetaData.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import HelmetCustom from "../HelmetCustom";

const VIdeoMetaData = ({ video, videoId }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const { channelId, channelTitle, description, title, publishedAt } =
    video?.snippet;
  const { viewCount, likeCount, dislikeCount } = video?.statistics;
  const channel = useSelector((state) => state.channelDetails.channel);
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );
  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="videoMetaData py-2">
      <HelmetCustom title={title} description={description} />
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            &nbsp;
            {numeral(viewCount).format("0.a")}&nbsp;views •&nbsp;
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className="mx-2">
              <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
            </span>
            <span className="mx-2">
              <MdThumbDown size={26} />
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-start align-items-center my-2 py-3">
        <div className="d-flex">
          <img
            src={channel?.snippet?.thumbnails?.default?.url}
            alt=""
            className="rounded-circle"
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {numeral(channel?.statistics?.subscriberCount).format("0.a")}
              &nbsp;Subscribers
            </span>
          </div>
        </div>
        <button
          className={`btn border-0 m-2 ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        {description.length > 300 && !showMore
          ? description.slice(0, 300) + "..."
          : description}
        {description.length > 300 && (
          <span
            className="showMoreText"
            onClick={() => setShowMore((prevValue) => !prevValue)}
          >
            {!showMore ? "SHOW MORE" : "SHOW LESS"}
          </span>
        )}
      </div>
    </div>
  );
};

export default VIdeoMetaData;
