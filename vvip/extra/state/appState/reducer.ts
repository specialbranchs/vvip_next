import {produce} from 'immer';

import * as Types from './actionTypes';
import { AppState } from '@/extra/typings/formData';



export type State = {
  appState: AppState|null;
};

export const initialState: State = {
  appState: null
};

export default (state: State = initialState, action: Types.AppStateActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_APPSTATE:
        draft.appState = action.payload;
        break;
      case Types.REMOVE_APPSTATE:
        draft.appState = null
        break;
    }
  });
