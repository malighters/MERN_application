import React, { useState, useContext, useReducer } from "react";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";
import reducer from "./reducer";

type Props = {
  children: string | JSX.Element | JSX.Element[]
}

type alertFunction = (() => void) | null

interface IState {
  isLoading: boolean,
  showAlert: boolean,
  alertText: string,
  alertType: string, 
  displayAlert: alertFunction,
  clearAlert: alertFunction,

}

const initialState: IState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '', 
  displayAlert: null,
  clearAlert: null,
}

const AppContext = React.createContext(initialState);

const AppProvider = ({children} : Props) => {
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


  return (
    <AppContext.Provider value={{...state, displayAlert, clearAlert}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext);
}

export {AppProvider};