import {produce} from 'immer';

import * as Types from './actionTypes';



export type State = {
  pimState: string|null;
};

export const initialState: State = {
  pimState: null
};

export default (state: State = initialState, action: Types.PimStateActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_PIMSTATE:
        draft.pimState = action.payload;
        break;
      case Types.REMOVE_PIMSTATE:
        draft.pimState = null
        break;
    }
  });
