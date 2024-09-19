import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethod";


export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res= await publicRequest.post("/auth/login",user);
        const token = res.data.accessToken;
        console.log(token)
        localStorage.setItem("accessToken", token);
        publicRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(loginSuccess(res.data));
        navigate("/"); // Navigate to home after successful login
    } catch (err) {
        dispatch(loginFailure());
    }
}
