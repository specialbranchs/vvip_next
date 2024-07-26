import { AppState } from "@/extra/typings/formData";


export const SAVE_APPSTATE = 'SAVE_APPSTATE';
export const REMOVE_APPSTATE = 'REMOVE_APPSTATE';

export interface SaveAppStateAction {
  type: typeof SAVE_APPSTATE;
  payload: AppState;
}

export interface RemoveAppStateAction {
  type: typeof REMOVE_APPSTATE;
}

export type AppStateActionTypes = SaveAppStateAction | RemoveAppStateAction;
