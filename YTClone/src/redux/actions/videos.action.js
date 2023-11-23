import request from "../../api";
import {
  CHANNEL_VIDEOS_FAIL,
  CHANNEL_VIDEOS_REQUEST,
  CHANNEL_VIDEOS_SUCCESS,
  HOME_VIDEOS_FAIL,
  HOME_VIDEOS_REQUEST,
  HOME_VIDEOS_SUCCESS,
  LIKED_VIDEOS_FAIL,
  LIKED_VIDEOS_REQUEST,
  LIKED_VIDEOS_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIBED_CHANNELS_FAIL,
  SUBSCRIBED_CHANNELS_REQUEST,
  SUBSCRIBED_CHANNELS_SUCCESS,
} from "../actionType";

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.message);
    console.log(error);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error,
    });
  }
};

export const getVideosByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEOS_REQUEST,
    });
    const { data } = await request.get("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
        q: keyword,
        type: "video",
      },
    });

    dispatch({
      type: HOME_VIDEOS_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: HOME_VIDEOS_FAIL,
      payload: error.message,
    });
  }
};

export const getVideoByID = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });
    const { data } = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "IN",
        maxResults: 16,
        // pageToken: getState().homeVideos.nextPageToken,
      },
    });
    // Related video API depreciated on Aug-7-2023
    // const { data } = await request("/search", {
    //   params: {
    //     part: "snippet",
    //     relatedToVideoId: id,
    //     maxResults: 15,
    //     type: "video",
    //   },
    // });
    const relatedVideos = data.items?.filter((video) => video.id !== id);
    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: relatedVideos,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getVideosBySearch = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SEARCHED_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video,channel",
        pageToken: getState().searchedVideo.nextPageToken,
      },
    });

    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: {
        searchResults: data.items,
        nextPageToken: data.nextPageToken,
        searchQuery: keyword,
      },
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getSubscribedChannels = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIBED_CHANNELS_REQUEST,
    });
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet,contentDetails",
        mine: true,
        maxResults: 40,
        // TODO:Paginate
        // nextPageToken: getState().searchedVideo.nextPageToken,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: SUBSCRIBED_CHANNELS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response?.data);
    dispatch({
      type: SUBSCRIBED_CHANNELS_FAIL,
      payload: error.response.data,
    });
  }
};

export const getVideosByChannel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEOS_REQUEST,
    });
    // step1: get upload playlist id
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists?.uploads;
    // step2: get videos using the id above
    const { data } = await request("/playlistItems", {
      params: {
        part: "contentDetails,snippet",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    dispatch({
      type: CHANNEL_VIDEOS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CHANNEL_VIDEOS_FAIL,
      payload: error.response?.data,
    });
  }
};

export const getUserLikedVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKED_VIDEOS_REQUEST,
    });
    const {
      data: { items },
    } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        myRating: "like",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: LIKED_VIDEOS_SUCCESS,
      payload: items,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LIKED_VIDEOS_FAIL,
      payload: error.response?.data,
    });
  }
};
