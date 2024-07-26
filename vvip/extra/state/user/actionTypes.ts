import { User } from "@/extra/typings/structures";


export const SAVE_USER = 'user/SAVE_USER';
export const REMOVE_USER = 'user/REMOVE_USER';

export interface SaveUserAction {
  type: typeof SAVE_USER;
  payload: User;
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER;
}

export type UserActionTypes = SaveUserAction | RemoveUserAction;
