import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../firebase"; // Make sure you provide the correct path to your Firebase config
import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOG_OUT,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../actionType";

export const login = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
      // payload:
    });
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
    const response = await signInWithPopup(auth, provider);

    const accessToken = response._tokenResponse.oauthAccessToken;

    const profile = {
      name: response.user.displayName,
      photoURL: response.user.photoURL,
    };

    localStorage.setItem("ytc-access-token", accessToken);
    localStorage.setItem("ytc-user", JSON.stringify(profile));
    console.log(accessToken);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: accessToken,
    });
    dispatch({
      type: LOAD_PROFILE,
      payload: profile,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};
// export const login = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: LOGIN_REQUEST,
//     });

//     const provider = new firebase.auth.GoogleAuthProvider();
//     provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

//     const res = await auth.signInWithPopup(provider);
//     const accessToken = res.credential.accessToken;

//     const profile = {
//       name: res.additionalUserInfo.profile.name,
//       photoURL: res.additionalUserInfo.profile.picture,
//     };

//     localStorage.setItem("ytc-access-token", accessToken);
//     localStorage.setItem("ytc-user", JSON.stringify(profile));

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: accessToken,
//     });
//     dispatch({
//       type: LOAD_PROFILE,
//       payload: profile,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAIL,
//       payload: error.message,
//     });
//   }
// };

export const logout = () => async (dispatch) => {
  await signOut(auth);
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("ytc-access-token");
  localStorage.removeItem("ytc-user");
};
