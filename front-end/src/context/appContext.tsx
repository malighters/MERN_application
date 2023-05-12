import axios from "axios";
import React, {  MouseEventHandler, useReducer } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOOGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, CLEAR_VALUES, CREATE_PIG_BEGIN, CREATE_PIG_SUCCESS, GET_PIGS_BEGIN, GET_PIGS_SUCCESS, SET_EDIT_PIG, DELETE_PIG_BEGIN, EDIT_PIG_BEGIN, EDIT_PIG_SUCCESS, EDIT_PIG_ERROR } from "./actions";
import reducer from "./reducer";
import { IUser } from "../interfaces/user-interface";
import { IPig } from "../interfaces/pig-interface";

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

type alertFunc =  (() => void) | null
type regFunc = ((arg: IUser) => void) | null
type updateFunc = ((arg: {name: string, email: string}) => void) | null
type buttonFunc = MouseEventHandler | undefined
type handleFunc = ((arg: {name: string, value: string}) => void) | null
type clearFunc = (() => void) | null
type pigFunc = (() => void) | null
type deleteFunc = ((id: string) => void) | null


const user = localStorage.getItem('user');
const token = localStorage.getItem('token');

interface IState {
  user: IUser | null | undefined,
  token: string | null | undefined,
  isLoading: boolean,
  showAlert: boolean,
  alertText: string | null | undefined,
  alertType: string, 
  showSidebar: boolean,
  isEditing: boolean,
  editPigId: string,
  pigTag: string,
  pigBirthDate: string,
  pigNote: string,
  pigGender: string,
  pigGenderTypes: string[],
  pigBreed: string,
  pigBreedTypes: string[],
  pigs: IPig[] | null | undefined,
  totalPigs: number | null | undefined,
  numOfPages: number | null | undefined,
  page: number | null | undefined,
  displayAlert: alertFunc,
  clearAlert: alertFunc,
  registerUser: regFunc,
  loginUser: regFunc,
  logoutUser: buttonFunc,
  updateUser: updateFunc,
  toogleSidebar: buttonFunc,
  handleChange: handleFunc,
  clearValues: clearFunc,
  createPig: pigFunc,
  getPigs: pigFunc,
  setEditId: deleteFunc,
  deletePig: deleteFunc,
  editPig: pigFunc
}

const initialState: IState = {
  user: user ? JSON.parse(user) : null,
  token: token,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '', 
  showSidebar: true,
  isEditing: false,
  editPigId: '',
  pigTag: '',
  pigBirthDate: new Date().toISOString().slice(0, 10),
  pigNote: '',
  pigGender: 'Male',
  pigGenderTypes: ['Male', 'Female'],
  pigBreed: 'Berkshire',
  pigBreedTypes: ['Berkshire', 'Chester White', 'Duroc', 'Hampshire', 'Landrace', 'Poland China', 'Spotted', 'Yorkshire'],
  pigs: [],
  totalPigs: 0,
  numOfPages: 1,
  page: 1,
  displayAlert: null,
  clearAlert: null,
  registerUser: null,
  loginUser: null,
  logoutUser: undefined,
  updateUser: null,
  toogleSidebar: undefined,
  handleChange: null,
  clearValues: null,
  createPig: null,
  getPigs: null,
  setEditId: null,
  deletePig: null,
  editPig: null,
}

export const AppContext = React.createContext(initialState);

export const AppProvider = ({children} : Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //axios.defaults.headers['Authorization'] = 'Bearer ' + state.token;

  const authFetch = axios.create();

  authFetch.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      config.baseURL = 'http://localhost:5000';
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT});
    clearAlert();
  }
  
  initialState.displayAlert = displayAlert;

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT});
    }, 3000)
  }

  initialState.clearAlert = clearAlert;

  const addUserToLocalStorage = ({user, token}: {user: IUser, token: string}) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  const registerUser = async (currentUser: IUser) => {
    dispatch({type: REGISTER_USER_BEGIN});
    try {
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
      const responce = await axios.post('/auth/login', currentUser);
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

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } 

  const logoutUser = () => {
    dispatch({type: LOGOUT_USER});
    removeUserFromLocalStorage();
  }

  initialState.logoutUser = logoutUser;

  const updateUser = async (updatedUser: {email: string, name: string}) => {
    dispatch({type: UPDATE_USER_BEGIN})
    try {      
      const { data } = await authFetch.patch('auth/update', updatedUser);
      const { user, token } = data;
      dispatch({type: UPDATE_USER_SUCCESS, payload:{user, token}});
      addUserToLocalStorage({user, token});
    }
    catch (error) {
      if(error instanceof axios.AxiosError) {
        if (error.response?.status !== 401) {
          dispatch({type: UPDATE_USER_ERROR, payload: {msg: error.response?.data.Error}})
        }
     }
    }
    clearAlert();
  }

  initialState.updateUser = updateUser;

  const toogleSidebar = () => {
    dispatch({type: TOOGLE_SIDEBAR});
  }

  initialState.toogleSidebar = toogleSidebar;

  const handleChange = ({name, value}: {name: string, value: string}) => {
    dispatch({type: HANDLE_CHANGE, payload: { name, value }})
  }

  initialState.handleChange = handleChange;

  const clearValues = () => {
    dispatch({type: CLEAR_VALUES})
  }

  initialState.clearValues = clearValues;

  const createPig = async () => {
    dispatch({type: CREATE_PIG_BEGIN});
    try {
      const { pigTag, pigBirthDate, pigBreed, pigGender, pigNote } = state;

      await authFetch.post('/pigs', {
        tag: pigTag,
        birth_date: pigBirthDate,
        breed: pigBreed,
        gender: pigGender,
        note: pigNote
      });
      dispatch({type: CREATE_PIG_SUCCESS});
      dispatch({type: CLEAR_VALUES});
    }
    catch (error) {
      if(error instanceof axios.AxiosError) {
        if (error.response?.status !== 401) {
          dispatch({type: UPDATE_USER_ERROR, payload: {msg: error.response?.data.Error}})
        }
     }
    }
    clearAlert();
  }

  initialState.createPig = createPig;

  const getPigs = async () => {
    dispatch({type: GET_PIGS_BEGIN});
    try {
      const { data } = await authFetch.get('/pigs');
      const { pigs, totalPigs, numOfPages} = data;
      dispatch({
        type: GET_PIGS_SUCCESS, 
        payload: {
          pigs, totalPigs, numOfPages
        }
      })
    }
    catch (error: unknown) {
      logoutUser();
    }
    clearAlert();
  }

  initialState.getPigs = getPigs; 
  
  const setEditId = (id: string) => {
    dispatch({type: SET_EDIT_PIG, payload: { id }})    
  }

  initialState.setEditId = setEditId;

  const editPig = async () => {
    dispatch({type: EDIT_PIG_BEGIN});
    try {
      const { pigTag, pigBirthDate, pigBreed, pigGender, pigNote } = state;

      await authFetch.patch(`/pigs/${state.editPigId}`, {
        tag: pigTag,
        birth_date: pigBirthDate,
        breed: pigBreed,
        gender: pigGender,
        note: pigNote
      });
      dispatch({type: EDIT_PIG_SUCCESS});
      dispatch({type: CLEAR_VALUES});
    }
    catch (error) {
      if(error instanceof axios.AxiosError) {
        if (error.response?.status !== 401) {
          dispatch({type: EDIT_PIG_ERROR, payload: {msg: error.response?.data.Error}})
        }
     }
    }
    clearAlert();
  }

  initialState.editPig = editPig;

  const deletePig = async (id: string) => {
    dispatch({type: DELETE_PIG_BEGIN});
    try {
      await authFetch.delete(`/pigs/${id}`);
      getPigs();
    }
    catch(error) {
      logoutUser(); 
    }
  }

  initialState.deletePig = deletePig;

  return (
    <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser, logoutUser, toogleSidebar, updateUser, handleChange, clearValues, createPig, getPigs, setEditId, deletePig, editPig }}>
      {children}
    </AppContext.Provider>
  )
}