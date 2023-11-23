import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "react-loading-skeleton/dist/skeleton.css";
import CategoriesBar from "../../components/CategoriesBar/CategoriesBar";
import Video from "../../components/Video/Video";
import {
  getPopularVideos,
  getVideosByCategory,
} from "../../redux/actions/videos.action";
import SkeletonVideo from "../../yt-ui/skeletons/SkeletonVideo";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );
  useEffect(() => {
    dispatch(getPopularVideos());
  }, [dispatch]);

  const fetchMoreData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };
  return (
    <Container style={{ position: "relative" }}>
      <CategoriesBar />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row"
      >
        {!loading
          ? videos.map((video) => (
              <Col key={video.id?.videoId || video.id} lg={3} md={4}>
                <Video video={video} />
              </Col>
            ))
          : [...Array(20)].map((_i, index) => (
              <Col lg={3} md={4} key={index}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
