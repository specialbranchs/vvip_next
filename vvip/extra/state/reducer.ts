
import { AnyAction, combineReducers } from "redux";
import currentUser, {
  State as UserState,
  initialState as currentUserInitialState,
} from "./user/reducer";
import currentappState, {
  State as appState,
  initialState as InitialappState,
} from "./appState/reducer";



import currentattendentState, {
  State as attendentState,
  initialState as InitialattendentState,
} from "./attendent/reducer";

import currentpimState, {
  State as pimState,
  initialState as InitialpimState,
} from "./pims/reducer";

import { LOG_OUT } from "./actions";

export interface RootState {
  currentUser: UserState;
  currentappState: appState;
  currentattendentState: attendentState;
  currentpimState: pimState;
}

const appReducer = combineReducers({
  currentUser,
  currentappState,
  currentattendentState,
  currentpimState,
});

const rootReducer: any = (state: RootState, action: AnyAction) => {
  if (action.type === LOG_OUT) {
    console.log("Logging Out");
    return appReducer(
      {
        ...state,
        currentUser: currentUserInitialState,
        currentappState: InitialappState,
        currentattendentState: InitialattendentState,
        currentpimState: InitialpimState,
      },
      action
    );
  }

  return appReducer(state, action);
};

export default rootReducer;
