import { useEffect } from "react";
import "./_channelScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { getVideosByChannel } from "../../redux/actions/videos.action";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Video from "../../components/Video/Video";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  checkSubscriptionStatus,
  getChannelDetails,
} from "../../redux/actions/channel.action";
import numeral from "numeral";

export const ChannelScreen = () => {
  const dispatch = useDispatch();
  const { channelId } = useParams();
  const { channelVideos, loading } = useSelector(
    (state) => state.channelVideos
  );
  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channel
  );
  const subscriptionStatus = useSelector(
    (state) => state.channelDetails.subscriptionStatus
  );
  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelDetails(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);
  return (
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <div className="channelHeader__left">
            <img src={snippet?.thumbnails?.default?.url} alt="channel icon" />
          </div>

          <div className="channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>
        <button className={`btn ${subscriptionStatus && "btn-gray"}`}>
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <Container>
        <Row className="mt-2">
          {!loading
            ? channelVideos?.map((video, index) => (
                <Col md={4} lg={3} key={index}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(15)].map((a, index) => (
                <Col md={4} lg={3} key={index}>
                  <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
                    <Skeleton width="100%" height="140px" />
                  </SkeletonTheme>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};
