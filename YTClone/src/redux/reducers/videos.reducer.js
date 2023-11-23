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

const initialState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
};

export const homeVideosReducer = (prevState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEOS_SUCCESS:
      return {
        ...prevState,
        videos:
          prevState.activeCategory === payload.category
            ? [...prevState.videos, ...payload.videos]
            : payload.videos,

        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case HOME_VIDEOS_FAIL:
      return {
        ...prevState,
        loading: false,
        error: payload.message,
        errorCode: payload.response.status,
      };
    case HOME_VIDEOS_REQUEST:
      return {
        ...prevState,
        loading: true,
      };
    default:
      return prevState;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        video: payload,
        loading: false,
      };
    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        video: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = {
    loading: true,
    videos: [],
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const searchedVideoReducer = (
  state = {
    loading: true,
    searchResults: [],
    nextPageToken: null,
    searchQuery: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SEARCHED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCHED_VIDEO_SUCCESS:
      return {
        ...state,
        // searchResults: payload.searchResults,
        searchResults:
          state.searchQuery === payload.searchQuery
            ? [...state.searchResults, ...payload.searchResults]
            : payload.searchResults,
        nextPageToken: payload.nextPageToken,
        searchQuery: payload.searchQuery,
        loading: false,
      };
    case SEARCHED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const subscribedChannelsReducer = (
  state = {
    loading: true,
    channels: [],
    nextPageToken: null,
    // TODO:Complete the pagination
    // context: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case SUBSCRIBED_CHANNELS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIBED_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: payload,
        // searchResults:
        //   state.searchQuery === payload.searchQuery
        //     ? [...state.searchResults, ...payload.searchResults]
        //     : payload.searchResults,
        // nextPageToken: payload.nextPageToken,
        loading: false,
      };
    case SUBSCRIBED_CHANNELS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const channelVideosReducer = (
  state = {
    loading: true,
    channelVideos: [],
    // nextPageToken: null,
    // can //TODO:Complete the pagination
    // context: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case CHANNEL_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        channelVideos: payload,
        // can //TODO:Pagination
        // searchResults:
        //   state.searchQuery === payload.searchQuery
        //     ? [...state.searchResults, ...payload.searchResults]
        //     : payload.searchResults,
        // nextPageToken: payload.nextPageToken,
        loading: false,
      };
    case CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const likedVideosReducer = (
  state = {
    loading: true,
    likedVideos: [],
    // nextPageToken: null,
    // can //TODO:Complete the pagination
    // context: null,
  },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case LIKED_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKED_VIDEOS_SUCCESS:
      return {
        ...state,
        likedVideos: payload,
        // can //TODO:Pagination
        // searchResults:
        //   state.searchQuery === payload.searchQuery
        //     ? [...state.searchResults, ...payload.searchResults]
        //     : payload.searchResults,
        // nextPageToken: payload.nextPageToken,
        loading: false,
      };
    case LIKED_VIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
