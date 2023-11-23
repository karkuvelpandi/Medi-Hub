import React, { useEffect } from "react";
import "./_watchScreen.scss";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import VideoHorizontal from "../../components/VideoHorizontal/VideoHorizontal";
import Comments from "../../components/Comments/Comments";
import VideoMetaData from "../../components/VideoMetaData/VideoMetaData";
import {
  getRelatedVideos,
  getVideoByID,
} from "../../redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WatchScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, loading } = useSelector((state) => state.selectedVideo);
  const { videos: relatedVideos, loading: relatedVideoLoading } = useSelector(
    (state) => state.relatedVideo
  );
  useEffect(() => {
    dispatch(getVideoByID(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);
  return (
    <Row>
      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet?.title}
            frameBorder={0}
            allowFullScreen
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h6>Loading...</h6>
        )}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={4}>
        {!loading ? (
          relatedVideos
            ?.filter((video) => video.snippet)
            .map((video) => <VideoHorizontal key={video.id} video={video} />)
        ) : (
          <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
