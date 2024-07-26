

export const SAVE_PIMSTATE = 'SAVE_PIMSTATE';
export const REMOVE_PIMSTATE = 'REMOVE_PIMSTATE';

export interface SavePimStateAction {
  type: typeof SAVE_PIMSTATE;
  payload: string;
}

export interface RemovePimStateAction {
  type: typeof REMOVE_PIMSTATE;
}

export type PimStateActionTypes = SavePimStateAction | RemovePimStateAction;
