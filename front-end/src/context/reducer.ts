import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions"

interface IState {
  isLoading: boolean,
  showAlert: boolean,
  alertText: string,
  alertType: string
}

interface IAction {
  type: string
}


const reducer = (state: IState, action: IAction) => {
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
  throw new Error(`no such action: ${action.type}`);
}

export default reducer;