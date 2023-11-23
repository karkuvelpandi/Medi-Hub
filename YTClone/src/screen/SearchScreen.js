import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideosBySearch } from "../redux/actions/videos.action";
import InfiniteScroll from "react-infinite-scroll-component";
import { Container } from "react-bootstrap";
import VideoHorizontal from "../components/VideoHorizontal/VideoHorizontal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SearchScreen = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { searchResults, nextPageToken, searchQuery, loading } = useSelector(
    (state) => state.searchedVideo
  );

  useEffect(() => {
    dispatch(getVideosBySearch(query));
  }, [dispatch, query]);

  const fetchMoreData = () => {
    dispatch(getVideosBySearch(searchQuery));
  };

  return (
    <Container>
      <InfiniteScroll
        dataLength={searchResults.length}
        next={fetchMoreData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        // className="row"
      >
        {!loading ? (
          searchResults?.map((video, index) => (
            <VideoHorizontal key={index} video={video} searchScreen />
          ))
        ) : (
          <SkeletonTheme baseColor="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="160px" count={20} />
          </SkeletonTheme>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default SearchScreen;
