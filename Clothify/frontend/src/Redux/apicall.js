import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {API} from '../API';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${API}/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
}