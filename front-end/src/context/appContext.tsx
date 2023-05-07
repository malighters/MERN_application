import axios from "axios";
import React, {  useReducer } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./actions";
import reducer from "./reducer";
import { IUser } from "../interfaces/user-interface";

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

type alertFunc =  (() => void) | null
type regFunc = | ((arg: IUser) => void) | null


const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

interface IState {
  user: IUser | null | undefined,
  token: string | null | undefined,
  isLoading: boolean,
  showAlert: boolean,
  alertText: string | null | undefined,
  alertType: string, 
  displayAlert: alertFunc,
  clearAlert: alertFunc,
  registerUser: regFunc,
  loginUser: regFunc
}

const initialState: IState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '', 
  displayAlert: null,
  clearAlert: null,
  registerUser: null,
  loginUser: null
}

export const AppContext = React.createContext(initialState);

export const AppProvider = ({children} : Props) => {
  const [state, dispatch] = useReducer(reducer, initialState); 

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT});
    clearAlert();
  }
  
  initialState.displayAlert = displayAlert;

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT});
    }, 5000)
  }

  initialState.clearAlert = clearAlert;

  const addUserToLocalStorage = ({user, token}: {user: IUser, token: string}) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const registerUser = async (currentUser: IUser) => {
    dispatch({type: REGISTER_USER_BEGIN});
    try {
      console.log(currentUser)
      const responce = await axios.post('/auth/register', currentUser);
      const {user, token} = responce.data;
      dispatch({type: REGISTER_USER_SUCCESS, payload:{user, token}});
      addUserToLocalStorage({user, token});
    } catch (error: unknown) {
      if(error instanceof axios.AxiosError) {
         dispatch({type: REGISTER_USER_ERROR, payload: {msg: error.response?.data.Error}})
      }
    }
    clearAlert();
  }

  initialState.registerUser = registerUser;

  const loginUser = async (currentUser: IUser) => {
    dispatch({type: LOGIN_USER_BEGIN});
    try {
      console.log(currentUser)
      const responce = await axios.post('/auth/register', currentUser);
      const {user, token} = responce.data;
      dispatch({type: LOGIN_USER_SUCCESS, payload:{user, token}});
      addUserToLocalStorage({user, token});
    } catch (error: unknown) {
      if(error instanceof axios.AxiosError) {
         dispatch({type: LOGIN_USER_ERROR, payload: {msg: error.response?.data.Error}})
      }
    }
    clearAlert();
  }

  initialState.loginUser = loginUser;

  return (
    <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser, loginUser}}>
      {children}
    </AppContext.Provider>
  )
}