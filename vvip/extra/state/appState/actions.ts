
import { AppState } from '@/extra/typings/formData';
import * as Types from './actionTypes';


const saveAppState = (appState: AppState): Types.SaveAppStateAction => ({
  type: Types.SAVE_APPSTATE,
  payload: appState
});

const removeAppState = (): Types.RemoveAppStateAction => ({
  type: Types.REMOVE_APPSTATE
});

export default { saveAppState, removeAppState };
