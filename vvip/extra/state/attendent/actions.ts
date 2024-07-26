
import { UploadAttendentType } from '../../api/request/types';
import * as Types from './actionTypes';


const saveAttendentType = (attendents: UploadAttendentType[]): Types.SaveAttendentTypeAction => ({
  type: Types.SAVE_ATTENDENT,
  payload: attendents
});

const updateAttendentType = (attendent: UploadAttendentType): Types.UpdateAttendentTypeAction => ({
  type: Types.UPDATE_ATTENDENT,
  payload: attendent
});

export default { saveAttendentType, updateAttendentType };
