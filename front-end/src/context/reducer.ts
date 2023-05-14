import { IUser } from "../interfaces/user-interface";
import { IPig } from "../interfaces/pig-interface";
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, TOOGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_PIG_BEGIN, CREATE_PIG_SUCCESS, CREATE_PIG_ERROR, GET_PIGS_BEGIN, GET_PIGS_SUCCESS, SET_EDIT_PIG, DELETE_PIG_BEGIN, DELETE_PIG_ERROR, EDIT_PIG_BEGIN, EDIT_PIG_SUCCESS, EDIT_PIG_ERROR, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE } from "./actions"
import moment from "moment";

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
  page: number | null,
  stats: any | null,
  search: string,
  searchBreed: string;
  searchGender: string,
  searchSort: string,
  searchSortOptions: string[],
  isUpdated: boolean,
}

type IAction = { type: string, payload?: null} | 
  { type: string, payload: { 
    user?: IUser, 
    token?: string, 
    msg?: string, 
    name?: string, 
    value?: string, 
    pigs?: IPig[], 
    totalPigs?: number, 
    numOfPages?: number,
    id?: string,
    stats?: any,
    page?: number
  }};
 
  

const reducer = (state: IState, action: IAction): IState => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
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
  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading:false,
      user: action.payload?.user,
      token: action.payload?.token, 
      showAlert: true,
      alertType: 'success',
      alertText: 'Update successful!',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
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
      token: null,
      isLoading: false,
    }
  }
  if (action.type === TOOGLE_SIDEBAR) {
    return {...state, showSidebar: !state.showSidebar}
  }
  if (action.type === HANDLE_CHANGE) {
    const name: any = [action.payload?.name];
    return {
      ...state, 
      // eslint-disable-next-line no-use-before-define
      [name]: action.payload?.value,
      isUpdated: false,
      page: 1
    }
  }
  if (action.type === CLEAR_VALUES) {
    return {
      ...state,
      isEditing: false,
      editPigId: '',
      pigTag: '',
      pigBirthDate: new Date().toISOString().slice(0, 10),
      pigNote: '',
      pigGender: 'Male',
      pigBreed: 'Berkshire',
    }
  }
  if (action.type === CREATE_PIG_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === CREATE_PIG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New pig added!'
    }
  }
  if (action.type === CREATE_PIG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload?.msg
    }
  }
  if (action.type === GET_PIGS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
      isUpdated: true,
    }
  }
  if (action.type === GET_PIGS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      pigs: action.payload?.pigs,
      numOfPages: action.payload?.numOfPages,
      totalPigs: action.payload?.totalPigs,
    }
  }
  if (action.type === SET_EDIT_PIG) {
    const pig = state.pigs?.find((pig) => pig.id === action.payload?.id);
    if (pig === undefined) return {...state};
    const { id, tag, gender, breed, birth_date, note }: IPig = pig;
    const date = moment(birth_date);
    const pigBirthDate = date.format('YYYY-MM-DD');
    return {
      ...state,
      isEditing: true,
      editPigId: id,
      pigTag: tag,
      pigGender: gender,
      pigBreed: breed,
      pigBirthDate,
      pigNote: note || '',
    }
  }
  if (action.type === DELETE_PIG_BEGIN) {
    return {
      ...state,
      isLoading: true
    }
  }
  if (action.type === DELETE_PIG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload?.msg
    }
  }
  if (action.type === EDIT_PIG_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_PIG_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Pig data updated!'
    }
  }
  if (action.type === EDIT_PIG_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload?.msg
    }
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false
    }
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload?.stats,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchBreed: 'all',
      searchGender: 'all',
      searchSort: 'latest',
      isUpdated: false,
    }
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload?.page || 1,
      isUpdated: false,
    }
  }
  throw new Error(`no such action: ${action.type}`);
}

export default reducer;