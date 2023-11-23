import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedVideos } from "../../redux/actions/videos.action";
import { Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LikedVideosScreen = () => {
  const dispatch = useDispatch();

  const { likedVideos, loading } = useSelector((state) => state.likedVideos);

  useEffect(() => {
    dispatch(getUserLikedVideos());
  }, [dispatch]);

  return (
    <Container>
      {!loading ? (
        likedVideos?.map((video, index) => (
          <VideoHorizontal key={index} video={video} LikedVideosScreen />
        ))
      ) : (
        <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default LikedVideosScreen;
