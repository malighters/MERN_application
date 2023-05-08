import { IUser } from "../interfaces/user-interface";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOOGLE_SIDEBAR, LOGOUT_USER } from "./actions"

interface IState {
  user: IUser | null | undefined,
  token: string | null | undefined,
  isLoading: boolean,
  showAlert: boolean,
  alertText: string | null | undefined,
  alertType: string,
  showSidebar: boolean
}

type IAction = { type: string, payload?: null} | 
  {type: string, payload: { user: IUser, token: string, msg?: null}} |
  {type: string, payload: {msg: string, user?: null, token?: null}};

const reducer = (state: IState, action: IAction): IState => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
   }
  if (action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading:false,
      user: action.payload?.user,
      token: action.payload?.token,
      showAlert: true,
      alertType: 'success',
      alertText: 'User created! Redirecting...',
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload?.msg,
    };
    
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading:false,
      user: action.payload?.user,
      token: action.payload?.token,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...',
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload?.msg,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      user: null,
      token: null
    }
  }
  if (action.type === TOOGLE_SIDEBAR) {
    return {...state, showSidebar: !state.showSidebar}
  }
  throw new Error(`no such action: ${action.type}`);
}

export default reducer;