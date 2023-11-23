import React, { useEffect } from "react";
import "./_subscriptionsScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
export const SubscriptionsScreen = () => {
  const dispatch = useDispatch();
  const { channels, loading, nextPageToken } = useSelector(
    (state) => state.subscribedChannels
  );
  useEffect(() => {
    dispatch(getSubscribedChannels());
  }, [dispatch]);

  return (
    <Container fluid>
      {!loading ? (
        channels?.map((video) => (
          <VideoHorizontal key={video.id} video={video} subscriptionsScreen />
        ))
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};
