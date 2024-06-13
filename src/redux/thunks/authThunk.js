import {
  removeRefreshTokenCookie,
  removeTokenCookie,
  removeUserDataCookie,
  setRefreshTokenCookie,
  setTokenCookie,
  setUserDataCookie,
} from "../../helpers/authCookies";
import { loginService } from "../../services/authService";
import { setUser, setIsError, setLoading, setToken } from "../slices/authSlice";
import {
  setInitState,
} from "../slices/postsSlice";

export const login = (data, navigate) => async (dispatch, getState) => {
  dispatch(setLoading(true));

  const response = await loginService(data);
  if (response.code === 200) {
    const { extra: refreshToken, ...data } = response.data;
    console.log({ data });
    const { token, ...restUer } = data;
    console.log({ token, restUer });
    dispatch(setUser(restUer));
    dispatch(setToken(token));
    dispatch(setIsError(false));

    setTokenCookie(token);
    setUserDataCookie(restUer);
    setRefreshTokenCookie(refreshToken);

    dispatch(setLoading(false));
    navigate("/home");
  } else {
    dispatch(setUser({}));
    dispatch(setToken({}));
    dispatch(setIsError(true));
    dispatch(setLoading(false));
  }
};

export const logout = () => (dispatch, _getState) => {
  removeTokenCookie();
  removeUserDataCookie();
  removeRefreshTokenCookie();
  dispatch(setUser({}));
  dispatch(setToken({}));
  dispatch(setIsError(false));
  dispatch(setInitState());
};
