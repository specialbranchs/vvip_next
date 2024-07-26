import { UploadAttendentType } from "../../api/request/types";


export const SAVE_ATTENDENT = 'SAVE_ATTENDENT';
export const UPDATE_ATTENDENT = 'UPDATE_ATTENDENT';

export interface SaveAttendentTypeAction {
  type: typeof SAVE_ATTENDENT;
  payload: UploadAttendentType[];
}

export interface UpdateAttendentTypeAction {
  type: typeof UPDATE_ATTENDENT;
  payload: UploadAttendentType;
}

export type AttendentTypeActionTypes = SaveAttendentTypeAction | UpdateAttendentTypeAction;
