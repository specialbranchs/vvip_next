import {produce} from 'immer';

import * as Types from './actionTypes';
import { User } from '@/extra/typings/structures';


export type State = {
  user: User | null;
};

export const initialState: State = {
  user: null
};

export default (state: State = initialState, action: Types.UserActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_USER:
        draft.user = action.payload;
        break;
      case Types.REMOVE_USER:
        draft.user = null;
        break;
    }
  });
