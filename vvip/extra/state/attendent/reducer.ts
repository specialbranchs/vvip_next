import {produce} from 'immer';

import * as Types from './actionTypes';
import { UploadAttendentType } from '../../api/request/types';



export type State = {
  attendent: UploadAttendentType[];
};

export const initialState: State = {
  attendent: []
};

export default (state: State = initialState, action: Types.AttendentTypeActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_ATTENDENT:
        draft.attendent = action.payload;
        break;
      case Types.UPDATE_ATTENDENT:
        draft.attendent = [{...action.payload}]
        break;
    }
  });
